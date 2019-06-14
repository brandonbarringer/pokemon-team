// Notes

/*

PokemonStat block must use data which has calculated stats
test sql db https://github.com/cmmartti/pokemon-database
convert data to firebase

Move "moves" to own collection
get moves where users = pokemon-name
moves: {
	move: {
		users: ['pokemon1', 'pokemon2']
	}
}

***PokemonList.vue***
	data: pokemonList.json
	components:
		PokemonBaseStatList:
			Card:
				✓ Image
				✓ Name
				✓ Types
				✓ ID
				✓ BaseStats
			Search:
				✓ Name
				✓ Type
			Sort:
				✓ Stat
				✓ ID
				✓ Name

***PokemonDetail.vue***
	data: pokemonDetail.json
	components:
		Navigation:
			Add to Team / Remove from Team
			Go Back
		Abilities:
			name
			short description
		StatBlock:
			name
			CalcStats + total
			ev + iv inputs
			graph
		Moves:
			Search:
				Name
			Filter:
				Damage Class
				Type
			Sort:
				Power
				Accuracy
				Effect Chance
				Category
			MoveListHolder:
				(4) slots for moves

			MoveList:
				Name
				Description
				Power
				PP
				Accuracy
				Priority
				Effect Chance
				Damage Class
				Category
				Type
				Add Move
		Types
			Strength
			Weakness
			Even

***PokemonTeamList.vue***
	data: user.teams
	components:
		TeamCard:
			TeamName
			TeamMembers
				Name
				Types
				CalcStats
			Route: /PokemonDetail.vue
		AddToTeam:
			route: /PokemonList.vue