import { h } from 'preact';
import { useUnifire } from '@unifire/preact';
import { store } from '../../js/store';
import style from './style';

const UseUnifire = () => {
	const [ { count }, fire ] = useUnifire(store, [ 'count' ]);
	return (
		<div class={style.home}>
			<div class={style.content}>
				<button onClick={() => fire('decrement')}>-</button>
				<span>{count}</span>
				<button onClick={() => fire('increment')}>+</button>
			</div>
		</div>
	);
}

export default UseUnifire;
