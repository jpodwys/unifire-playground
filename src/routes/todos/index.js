import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Observer } from '../../js/unifire/preact';
import style from './style';

const Todos = ({ todos, fire }) => {
	const [ name, setName ] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		fire('addTodo', name);
		setName('');
	}

	return (
		<div class={style.todos}>
			<div class={style.content}>
				<form onSubmit={(e) => onSubmit(e)}>
					<input value={name} onInput={(e) => setName(e.target.value)} />
				</form>

				<ul>
					{ todos.map((item) => (
						<li>
							<button onClick={() => fire('toggleTodo', item.id)}>Toggle</button>
							<span class={item.done ? style.done : ''}>{item.name}</span>
							<button onClick={() => fire('removeTodo', item.id)}>X</button>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

export default Observer(Todos);
