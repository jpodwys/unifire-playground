import { h, Component } from 'preact';
import { Observer } from '../../js/unifire/preact';
import style from './style';

class ObserverClass extends Component {
	render ({ count, fire }) {
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
