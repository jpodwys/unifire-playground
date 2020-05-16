import { h } from 'preact';
import { useUnifireState } from '../../js/unifire/preact';
import { store } from '../../js/store';
import style from './style';

const UseUnifireState = () => {
	const [ count, setCount ] = useUnifireState(store, 'count');
	return (
		<div class={style.home}>
			<div class={style.content}>
				<button onClick={() => setCount(count - 1)}>-</button>
				<span>{count}</span>
				<button onClick={() => setCount(count + 1)}>+</button>
			</div>
		</div>
	);
}

export default UseUnifireState;
