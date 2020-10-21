import React from 'react';

class Details extends React.Component {
	render() {
		return (
			<div className='details' ref={ this.props.detailRef }>
				<div className='details_letter'>
					<button onClick={ this.props.closeMethod }>X</button>

					<h3>{ this.props.resultText[this.props.detailNumber] }</h3>

					<p>
						<img src={ this.props.resultImg[this.props.detailNumber] } alt='dish' />

						<b>Reciepe:</b><br />

						
						{ this.props.detailReciepes[this.props.detailNumber] }
					</p>
				</div>
			</div>
		);
	}
}

export default Details;