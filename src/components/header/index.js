import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import { Observer } from '../../js/unifire/preact';

const Header = ({ one, two, count, fire }) => {
	console.log("HEADER");
	return (
		<header class={style.header}>
			<h1>Preact App Count: {count}</h1>
			<nav>
				<button onClick={() => fire('decrement')}>Decrement</button>
				<button onClick={() => fire('incrementTwice')}>Increment</button>
				<Link activeClassName={style.active} href="/">Home</Link>
				<Link activeClassName={style.active} href="/profile">Me</Link>
				<Link activeClassName={style.active} href="/profile/john">John</Link>
			</nav>
		</header>
	);
};

export default Observer(Header);
