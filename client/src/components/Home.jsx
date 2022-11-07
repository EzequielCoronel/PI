import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, filterCountriesByContinent, orderByName, orderByPopulation} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from "./SearchBar";

export default function Home () {

	const dispatch = useDispatch();
	const allCountries = useSelector ((state) => state.countries);
	
	const [orden, setOrden] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage, setCountriesPerPage] = useState(9);
	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	}

	useEffect (() => {
		dispatch(getCountries()); 
	},[dispatch])

	function handleClick (e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	function handleFilterContinent (e) {
		dispatch(filterCountriesByContinent(e.target.value))
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
			<Link to= '/activity' className='ca'>CREAR ACTIVIDAD</Link>
			<h1 className='p'>Países del mundo</h1>
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
				{currentCountries?.map((e) => {
						return (
							<div key={e.id}>
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