import React from 'react';
import Ingridients from './components/Ingridients';
import Results from './components/Results';
import Details from './components/Details';

const API_KEY = '80e6c65cb3854d7c97e9282baefecf55';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.detail_ref = React.createRef();
	}

	state = {
		items: [],
		result_img: [],
		result_text: [],
		detail_reciepes: [],
		detail_num: 0,
		error: undefined
	}

	addIngridient = async (e) => {
		e.preventDefault();

		const preIngridient = e.target.elements.ingridient.value;

		if(preIngridient !== '') {
			this.setState({ 
				items: this.state.items.concat([preIngridient]),
			})
		}

		e.target.elements.ingridient.value = '';
	}

	delIngridient = (key) => {
		const index = this.state.items.indexOf(key);

		this.setState({
			items: this.state.items.filter((_, i) => i !== index),
		});
	}

	checkToCook = async (e) => {
		e.preventDefault();

		if(!this.state.items.toString() == '') {
			const url = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ this.state.items.toString() }&number=21&apiKey=${ API_KEY }`);
			const data = await url.json();
			console.log(data);

			const data_img = [];
			const data_text = [];
			const data_ids = [];
			const data_recipes = [];

			try {
				for(var i=0; i<3; i++) {
					var num = Math.floor(Math.random()*Math.floor(20));

					data_ids.push(data[num].id)
					data_text.push(data[num].title);
					data_img.push(data[num].image);
				}

				for(var i=0; i<3; i++) {
					const url = await fetch(`https://api.spoonacular.com/recipes/${ data_ids[i] }/analyzedInstructions?apiKey=${ API_KEY }`);
					const data = await url.json();
					const reciep = [];

					console.log(data);

					try {
						for(var j=0; j<data[0].steps.length; j++) {
							reciep.push(data[0].steps[j].step);
						}
					} catch {
						reciep.push('We do not have a recipe for this dish, but you can find it on the internet.');
					}
					data_recipes.push(reciep);
				}

				console.log(data_recipes);

				this.setState({
					result_img: data_img,
					result_text: data_text,
					detail_reciepes: data_recipes,
					error: undefined
				});
			} catch {
				this.setState({ 
					result_img: [],
					result_text: [],
					detail_reciepes: [],
					error: 'The ingredients were not introduced or introduced incorrectly. Try again.'
				});
			}
		} else {
			this.setState({ 
				result_img: [],
				result_text: [],
				detail_reciepes: [],
				error: 'The ingredients were not introduced or introduced incorrectly. Try again.'
			});
		}
	}

	showDetails = (num) => {
		this.setState({
			detail_num: num
		});

		this.detail_ref.current.style.display = 'block';
	}

	closeDetails = () => {
		this.detail_ref.current.style.display = 'none';
	}

	render() {
		return (
			<div className='app'>
				<Details closeMethod={ this.closeDetails } detailRef={ this.detail_ref } detailNumber={ this.state.detail_num } resultImg={ this.state.result_img } resultText={ this.state.result_text } detailReciepes={ this.state.detail_reciepes } />
				<h2 style={{textAlign: 'center'}}>What to Cook <span role="img" aria-label="pie">🥧</span></h2>
				<Ingridients addMethod={ this.addIngridient } delMethod={ this.delIngridient } ingridientList={ this.state.items } />
				<Results cookMethod={ this.checkToCook } resultImg={ this.state.result_img } resultText={ this.state.result_text } resultError={ this.state.error } showMethod={ this.showDetails } />
				<a href='https://www.donationalerts.com/r/victorbachok' target='_blank' rel='noopener noreferrer'><img src={ require('./images/donate.png') } className='donate' alt='donate' /></a>
				<p style={{textAlign: 'center', color: 'white'}}>Copyright (C) Victor Bachok 2020</p>
			</div>
		);
	}
}

export default App;
