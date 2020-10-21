import React from 'react';

class Ingridients extends React.Component {
	render() {
		return (
			<div className='ingridients'>
				<h3 style={{textAlign: 'center'}}>Ingridients<br /><sup>Type like 'potatoes'</sup></h3>

				{ this.props.ingridientList.map(item => (
					<li key={item}>{item}<button onClick={() => this.props.delMethod(item)}>X</button></li>
				)) }

				<form style={{textAlign: 'center'}} onSubmit={ this.props.addMethod }>
					<input type="text" name="ingridient" autoComplete="off" />
					<button>Add</button>
				</form>
			</div>
		);
	}
}

export default Ingridients;
