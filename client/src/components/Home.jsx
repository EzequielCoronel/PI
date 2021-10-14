import React from 'react';
// importo los hooks que voy a usar de react
import {useState, useEffect} from 'react';
// importo los hooks de react-redux
import {useDispatch, useSelector} from 'react-redux';
// importo las actions
import {getCountries, filterCountriesByContinent, filterTypeActivity, orderByName, orderByPopulation} from '../actions';
import {Link} from 'react-router-dom';
// importo los componentes
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from "./SearchBar";

export default function Home () {
	const dispatch = useDispatch();
	const allCountries = useSelector ((state) => state.countries) // usando hooks
	const allActivities = useSelector ((state) => state.activities)
	const [orden, setOrden] = useState('')
	const [currentPage, setCurrentPage] = useState(1) // setearme la pagina actual en 1
	const [countriesPerPage, setCountriesPerPage] = useState(10) // paises por pagina
	const indexOfLastCountryI = currentPage * countriesPerPage // 10
	const indexOfFirstCountryI = indexOfLastCountryI - countriesPerPage // 0
	const currentCountriesI = allCountries.slice(indexOfFirstCountryI, indexOfLastCountryI) // slice > agarra un arreglo y lo divide
	

	const [indexOfLastCountry, setIndexOfLastCountry] = useState(9)
	const [indexOfFirstCountry, setIndexOfFirstCountry] = useState(0)
	const [currentCountries, setCurrentCountries] = useState(currentCountriesI)


	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber)
		const indexOfLast = pageNumber * countriesPerPage
		setIndexOfLastCountry(indexOfLast)
		const indexOfFirst = indexOfLast - countriesPerPage
		setIndexOfFirstCountry(indexOfFirst)
		const sliceCountry = allCountries.slice(indexOfFirst, indexOfLast)
		setCurrentCountries(sliceCountry)
	}


	useEffect (() => {
		dispatch(getCountries()); // despacho la fn que trae los personajes
	},[])

	function handleClick (e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	function handleFilterContinent (e) {
		dispatch(filterCountriesByContinent(e.target.value))
	}

	function handleFilterActivity (e) {
		dispatch(filterTypeActivity(e.target.value))
	}

	function handleSort (e, type) {
		e.preventDefault();
		if (type === 'name') {
			dispatch(orderByName(e.target.value))
		}
		else {
			dispatch(orderByPopulation(e.target.value))
		}
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`)
	}


	return (
		<div>
			<Link to= '/activity' className='ca'>Crear actividad</Link>
			<h1 className='p'>Paises del mundo</h1>
			<button onClick={e => {handleClick(e)}} className='vcp'>
				Volver a cargar todos los paises
			</button>
				<div className='asd'>
					Nombre:<select onChange={e => handleSort(e, 'name')}>
						<option value= 'asc'>Ascendente</option>
						<option value= 'desc'>Descendente</option>
					</select>
					Población:<select onChange={e => handleSort(e, 'population')}>
						<option value= 'asc'>Menor</option>
						<option value= 'desc'>Mayor</option>
					</select>
					Continente:<select onChange={e => handleFilterContinent(e)}>
						<option value="All">Todos</option>
						<option value="Americas">America</option>
						<option value="Europe">Europa</option>
						<option value="Africa">Africa</option>
						<option value="Oceania">Oceania</option>
						<option value="Asia">Asia</option>
						<option value="Polar">Antartica</option>
					</select>
					<SearchBar/>
					<Paginado className='pag'
					countriesPerPage= {countriesPerPage}
					allCountries= {allCountries.length}
					paginado= {paginado}
					/>
				{currentCountriesI?.map((e) => {
						return (
							<div>
								<Link to={"/home/" + e.id}>
									<Card name={e.name} image={e.img} continent={e.continent} key={e.id} />
								</Link>
							</div>
						);
					})}
				</div>
		</div>
		)
}