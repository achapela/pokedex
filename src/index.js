import ReactDOM from 'react-dom'
import './index.css'
import ReduxProvider from './reduxProvider'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(ReduxProvider, document.getElementById('root'))
registerServiceWorker()
