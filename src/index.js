import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Keycloak from 'keycloak-js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);


const keycloak = new Keycloak({
	url: `http://localhost:18080/`,
	realm: 'myrealm',
	clientId: 'myclient',
});

try {
	const authenticated = await keycloak.init({
		onLoad: 'login-required',
		flow: 'standard',
		pkceMethod: 'S256',
	});
	console.log(`keycloak user is ${authenticated ? 'authenticated' : 'not authenticated'}`);
	console.log(`keycloak token: ${keycloak.token}`)
} catch (err) {
	console.error('error keycloak.init:', err);
}
