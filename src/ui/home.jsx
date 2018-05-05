import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, RaisedButton, Dialog } from 'material-ui'
import { getPokemonsAction, openSelectedPokemonAction, closePokemonAction, nextPage, prevPage } from '../redux/pokemonActions'
class Home extends Component {
	constructor() {
		super()
		this.onOpenPokemon = this.onOpenPokemon.bind(this)
	}

	componentDidMount() {
		this.props.onGetPokemons()
	}

	onOpenPokemon(url) {
		this.props.onOpenSelectedPokemon(url)
	}

	renderRow(item, idx) {
		return (
			<TableRow key={idx}>
				<TableRowColumn>{item.name}</TableRowColumn>
				<TableRowColumn><RaisedButton onClick={this.onOpenPokemon.bind(this, item.url)}>Open</RaisedButton></TableRowColumn>
			</TableRow>
		)
	}

	render() {
		return (
			<div>
				<Table>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>
								Name
						</TableHeaderColumn>
							<TableHeaderColumn>
								Open
						</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.list.map(this.renderRow, this)}
					</TableBody>
				</Table>
				<RaisedButton onClick={this.props.onPrevPage}>Previous</RaisedButton>
				<RaisedButton onClick={this.props.onNextPage}>Next</RaisedButton>
				<Dialog open={this.props.show} onRequestClose={this.props.onClosePokemon}>
					<h3>{this.props.selected && this.props.selected.forms[0].name}</h3>
					<img src={this.props.selected && this.props.selected.sprites.front_shiny} alt={this.props.selected && this.props.selected.forms[0].name} />
					<br />
					<RaisedButton onClick={this.props.onClosePokemon}>Close</RaisedButton>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = (({ pokemons }) => {
	const pokemonsFetched = pokemons.fetched.toJS()
	return {
		list: pokemonsFetched.list || [],
		show: !!pokemonsFetched.selected,
		selected: pokemonsFetched.selected
	}
})
const mapDispatchToProps = (dispatch) => ({
	onGetPokemons: () => dispatch(getPokemonsAction()),
	onOpenSelectedPokemon: (url) => dispatch(openSelectedPokemonAction(url)),
	onClosePokemon: () => dispatch(closePokemonAction()),
	onNextPage: () => dispatch(nextPage()),
	onPrevPage: () => dispatch(prevPage())
})

export default connect(
	mapStateToProps, mapDispatchToProps
)(Home)