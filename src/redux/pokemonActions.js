import { getAllPokemons, getPokemon } from '../api/pokedex'

const getPokemonsAction = () => dispatch => {
	getAllPokemons('https://pokeapi.co/api/v2/pokemon/', (err, res) => {
		if (err) return
		dispatch({ type: 'LOAD_POKEMON_LIST', count: res.count, list: res.results, previous: res.previous, next: res.next })
	})
}

const openSelectedPokemonAction = url => dispatch => {
	dispatch({ type: 'SELECT_POKEMON', url })
	getPokemon(url, (err, res) => {
		if (err) return
		dispatch({ type: 'LOAD_POKEMON', pokemon: res })
	})
}

const nextPage = () => (dispatch, getState) => {
	const state = getState()
	const fetched = state.pokemons.fetched.toJS()
	const { next } = fetched
	if (!next) return
	getAllPokemons(next, (err, res) => {
		if (err) return
		dispatch({ type: 'LOAD_POKEMON_LIST', count: res.count, list: res.results, previous: res.previous, next: res.next })
	})
}

const prevPage = () => (dispatch, getState) => {
	const state = getState()
	const fetched = state.pokemons.fetched.toJS()
	const { previous } = fetched
	if (!previous) return
	getAllPokemons(previous, (err, res) => {
		if (err) return
		dispatch({ type: 'LOAD_POKEMON_LIST', count: res.count, list: res.results, previous: res.previous, next: res.next })
	})
}

const closePokemonAction = () => dispatch => dispatch({ type: 'CLOSE_POKEMON' })

export { getPokemonsAction, openSelectedPokemonAction, closePokemonAction, nextPage, prevPage }