const initialState = {
	countries : [],
	allCountries : [],
	activities : []
}


function rootReducer (state = initialState, action) {
	switch(action.type) {
		case 'GET_COUNTRIES': 
			return {
			...state,
			countries: action.payload, // en el estado vacio mando todo lo que venga de get countries
			allCountries: action.payload,
		}
		case 'GET_NAME_COUNTRIES' :
		return {
			...state,
			countries: action.payload
		}
		case 'POST_ACTIVITY':
		return {
			...state,
		}
		case 'FILTER_BY_CONTINENT':
			const allCountries = state.allCountries;
			const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(e => e.continent === action.payload)
			return {
				...state,
				countries: continentFiltered
		}
		case 'FILTER_BY_TYPEACTIVITY':
			return {

		}
		case 'ORDER_BY_NAME':
			let sortedArr = action.payload === 'asc' ?
			state.countries.sort(function (a, b) {
				if (a.name > b.name) {
					return 1;
				}
				if (b.name > a.name) {
					return -1;
				}
				return 0;
			}) :
			state.countries.sort(function (a, b) {
				if (a.name > b.name) {
					return -1;
				}
				if (b.name > a.name) {
					return 1;
				}
				return 0;
			})
				return {
					...state,
					countries: sortedArr
				}
			case 'ORDER_BY_POPULATION':
				let sortedA = action.payload === 'asc' ?
			state.countries.sort(function (a, b) {
				if (a.population > b.population) {
					return 1;
				}
				if (b.population > a.population) {
					return -1;
				}
				return 0;
			}) :
			state.countries.sort(function (a, b) {
				if (a.population > b.population) {
					return -1;
				}
				if (b.population > a.population) {
					return 1;
				}
				return 0;
			})
				return {
					...state,
					countries: sortedA
				}
				case "GET_DETAILS":
					return {
						...state,
						detail: action.payload
					}
		default:
			return state;
	}

}

export default rootReducer;