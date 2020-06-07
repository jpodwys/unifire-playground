import { h } from 'preact';
import { Router } from 'preact-router';
import { store } from '../js/store';
window.store = store;
import { Provider } from '@unifire/preact';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import ObserverClass from '../routes/observer-class';
import Todos from '../routes/todos';
import UseUnifire from '../routes/use-unifire';
import UseUnifireState from '../routes/use-unifire-state';
import UseEffect from '../routes/use-effect';

const App  = () => (
	<Provider value={store}>
		<div id="app">
			<Header />
			<Router onChange={this.handleRoute}>
				<Home path="/" />
				<ObserverClass path="observer-class" />
				<Todos path="/todos" />
				<UseUnifire path="/use-unifire" />
				<UseUnifireState path="/use-unifire-state" />
				<UseEffect path="/use-effect" />
			</Router>
		</div>
	</Provider>
);

export default App;
