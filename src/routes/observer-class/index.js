import { h, Component } from 'preact';
import { Observer } from '@unifire/preact';
import style from './style';

class ObserverClass extends Component {
	render ({ count, fire }) {
		console.log('RENDERING CLASS');
		if (!Number.isInteger(count)) return; // This line to to satisfy react/prefer-stateless-function
		return (
			<div class={style.home}>
				<div class={style.content}>
					<button onClick={() => fire('decrement')}>-</button>
					<span>{count}</span>
					<button onClick={() => fire('increment')}>+</button>
				</div>
			</div>
		)
	}
}

export default Observer(ObserverClass);
