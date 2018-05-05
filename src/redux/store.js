import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import immutable from 'immutable'

const fetchReducer = (state = immutable.Map({ url: null, next: null, list: null, previous: null, count: 0, selected: false }), action) => {
	switch (action.type) {
		case 'SELECT_POKEMON':
			return state.set('url', action.url)
		case 'LOAD_POKEMON_LIST':
			return state.set('count', action.count).
				set('previous', action.previous).
				set('next', action.next).
				set('list', action.list)
		case 'LOAD_POKEMON':
			return state.set('selected', action.pokemon)
		case 'CLOSE_POKEMON':
			return state.set('selected', false)
		default: return state
	}
}

const pokemonReducer = (state = immutable.Map({ fetched: null }), action) => ({
	fetched: fetchReducer(state.fetched, action)
})

const rootReducer = combineReducers({
	pokemons: pokemonReducer
})

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middleware = [thunkMiddleware]

const store = createStore(
	rootReducer,
	{},
	reduxDevTools ? compose(applyMiddleware(...middleware), reduxDevTools) : applyMiddleware(...middleware)
)

export default store