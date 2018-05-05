import React from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import theme from 'material-ui/styles/baseThemes/lightBaseTheme'

const App = ({ children }) => (
	<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
		<div>
			{children}
		</div>
	</MuiThemeProvider>
)

export default App