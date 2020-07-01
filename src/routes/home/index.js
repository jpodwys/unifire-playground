import { h } from 'preact';
import { Observer } from '@unifire/preact';
import style from './style';

const Home = ({ state, fire }) => {
	console.log('RENDERING');
	return <div class={style.home}>
		<div class={style.content}>
			<button onClick={() => fire('decrement')}>-</button>
			<span>{state.count}</span>
			<button onClick={() => fire('increment')}>+</button>
		</div>
	</div>
};

export default Observer(Home);