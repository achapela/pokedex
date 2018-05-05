import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from './ui/layout.jsx'
import Home from './ui/home.jsx'

const AppRoutes = (
	<Router>
		<Layout>
			<Route exact path="/" component={Home} />
		</Layout>
	</Router>
)

export default AppRoutes