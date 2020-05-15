import { h } from 'preact';
import { useStore } from '../../js/unifire/preact';
import { store } from '../../js/store';
import style from './style';

const UseStore = () => {
	const [ { count }, fire ] = useStore(store, [ 'count' ]);
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

export default UseStore;
