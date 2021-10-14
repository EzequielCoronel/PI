import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../actions/index";
import {useEffect} from "react";
import Card from './Card';

export default function Detail(props) {
	const dispatch = useDispatch();

	const detail = useSelector ((state) => state.detail)

	useEffect(() => {
		dispatch(getDetail(props.match.params.id));
	},[dispatch])


	return (
		<div>
			{
				detail ? 
				<div className='det'>
					<Card name={detail.name} image={detail.img} continent={detail.continent} key={detail.id} />
					<h3>Codigo de pais:{detail.id}</h3>
					<h3>Capital:{detail.capital}</h3>
					<h3>Subregion:{detail.subregion}</h3>
					<h3>Área:{detail.area}</h3>
					<h3>Poblacion:{detail.population}</h3>
					<h1>Actividades:</h1>
					{detail.activities?.map((e) => {
						return (
							<div className='dt'>
								<h2>{e.name}</h2>
								<h2>Dificultad: {e.difficulty}</h2>
								<h2>Duracion: {e.duration}</h2>
								<h2>Temporada: {e.season}</h2>
							</div>
						);
					})}
				</div> : <p>Loading...</p>
			}
			<Link to='/home'>
				<button>Volver</button>
			</Link>
		</div>
		)
}

{/*<h1>{myActivity[0].name}</h1>
<h2>Dificultad: {myActivity[0].difficulty}</h2>
<h3>Duracion: {myActivity[0].duration}</h3>
<h4>Temporada: {myActivity[0].season}</h4> */}