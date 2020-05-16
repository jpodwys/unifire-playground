import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Unifire Playground</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Counter</Link>
			<Link activeClassName={style.active} href="/todos">Todos</Link>
			<Link activeClassName={style.active} href="/use-unifire">Use Unifire</Link>
			<Link activeClassName={style.active} href="/use-unifire-state">Use Unifire State</Link>
			<Link activeClassName={style.active} href="/use-effect">Use Effect</Link>
		</nav>
	</header>
);

export default Header;
