import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { store } from '../js/store';
window.store = store;
import { Provider } from '../js/unifire/preact';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Todos from '../routes/todos';
import UseUnifire from '../routes/use-unifire';
import UseUnifireState from '../routes/use-unifire-state';
import UseEffect from '../routes/use-effect';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<Provider value={store}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Todos path="/todos" />
						<UseUnifire path="/use-unifire" />
						<UseUnifireState path="/use-unifire-state" />
						<UseEffect path="/use-effect" />
					</Router>
				</div>
			</Provider>
		);
	}
}
