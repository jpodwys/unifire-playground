import { h } from 'preact';
import style from './style';
import { Observer } from '../../js/unifire/preact';

const getInputText = () => {
	const input = document.getElementById('todosInput');
	const val = input.value;
	input.value = '';
	return val;
}

const onSubmit = (e, fire) => {
	e.preventDefault();
	fire('addTodo', getInputText());
}

const Todos = ({ todos, fire }) => (
	<div class={style.todos}>
		<div class={style.content}>
			<form onSubmit={(e) => onSubmit(e, fire)}>
				<input id="todosInput" />
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

export default Observer(Todos);
