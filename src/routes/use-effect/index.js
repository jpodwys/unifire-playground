import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { store } from '../../js/store';
import style from './style';

const UseEffect = () => {
	const forceUpdate = useState();
	useEffect(() => store.subscribe([ 'count' ], () => forceUpdate[1]({})), [ forceUpdate ]);
	return (
		<div class={style.home}>
			<div class={style.content}>
				<button onClick={() => store.state.count--}>-</button>
				<span>{store.state.count}</span>
				<button onClick={() => store.state.count++}>+</button>
			</div>
		</div>
	);
}

export default UseEffect;
