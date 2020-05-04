import { h } from 'preact';
import style from './style';
import { Observer } from '../../js/unifire/preact';

const Home = ({ count, fire }) => (
	<div class={style.home}>
		<div class={style.content}>
			<button onClick={() => fire('decrement')}>-</button>
			<span>{count}</span>
			<button onClick={() => fire('increment')}>+</button>
		</div>
	</div>
);

export default Observer(Home);
