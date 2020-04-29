import { h } from 'preact';
import style from './style';
import { Observer } from '../../js/unifire/preact';

const Home = ({ list }) => {
	console.log('HOME');
	return (
		<div class={style.home}>
			<h1>Home</h1>
			<p>This is the Home component.</p>
			{ list.map((item) => <div>{item}</div>) }
		</div>
	);
}

export default Observer(Home);
