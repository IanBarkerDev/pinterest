import React from 'react';
import { Route } from 'react-router';
import { GenerateRoute } from './utils';

export default (
	<Route component={ require('./pages/root') }>
		{ GenerateRoute({
			paths: ['/', '/home'],
			component: require('./pages/home')
		}) }
		{ GenerateRoute({
			paths: ['/account'],
			component: require('./pages/account')
		}) }
	</Route>
);