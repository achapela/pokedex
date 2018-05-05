const request = require('request')
console.log('here')
const getAllPokemons = (url, cbFn) => request.get(url, {
	headers: {
		'Content-Type': 'application/json',
	},
	json: true
}, (err, res) => {
	if (err) return cbFn(err)
	const { body } = res
	cbFn(null, body)
})

const getPokemon = (url, cbFn) => request.get(url, {
	headers: {
		'Content-Type': 'application/json',
	},
	json: true
}, (err, res) => {
	if (err) return cbFn(err)
	const { body } = res
	cbFn(null, body)
})


export { getAllPokemons, getPokemon }