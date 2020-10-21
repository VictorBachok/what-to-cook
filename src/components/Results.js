import React from 'react';

class Results extends React.Component {
	render() {
		return (
			<div className='results'>
				<h3 style={{textAlign: 'center'}}>Results<br/><sup>Recepts took from <a href="https://spoonacular.com/" target="_blank" rel="noopener noreferrer">spoonacular.com</a></sup></h3>

				{ this.props.resultText.map((item, i) => (
					<li key={i} onClick={ () => this.props.showMethod(i) }><img src={this.props.resultImg[i]} alt='dish' />{item}</li>
				)) }
				
				<p className='error_text'>{ this.props.resultError }</p>

				<form style={{textAlign: 'center'}} onSubmit={ this.props.cookMethod }>
					<button>What to Cook</button>
				</form>
			</div>
		);
	}
}

export default Results;
