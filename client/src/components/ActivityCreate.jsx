import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {postCountrie, getActivity, postActivity, getCountries} from '../actions/index';

function validate (input) {
	let errors = {};
	if(!input.name) {
		errors.name = 'Se necesita un nombre';
	}
	return errors;
}


export default function ActivityCreate (){
	const dispatch = useDispatch();
	const history = useHistory();
	const countries = useSelector((state) => state.countries);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState ({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
		country: []
	})

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name] : e.target.value
		}))
	}

	function handleCheck (e) {
		if (e.target.checked) {
			console.log(e.target.value)
			setInput ({
				...input,
				season: e.target.value
			})
		}
	}

	function handleSelect (e) {
		setInput ({
			...input,
			country: [...input.country, e.target.value]
		})
	}

	function handleSubmit (e) {
		e.preventDefault();
		dispatch(postActivity(input))
		alert("Actividad creada con exito")
		setInput ({
			name: "",
			difficulty: "",
			duration: "",
			season: "",
			country: []
		})
		history.push('/home')
	}

	function handleDelete(e){
		setInput({
			...input,
			country: input.country.filter(count => count !== e)
		})
	}

	useEffect (() => {
		dispatch(getCountries());
	}, []);

	return (
		<div>
			<Link to= '/home'>
				<button>Volver</button>
			</Link>
			<h1>Creá tu actividad</h1>
			<form onSubmit= {(e) => handleSubmit(e)}>
				<div>
					<label>Nombre:</label>
					<input
						type= "text"
						value= {input.name}
						name= "name"
						onChange= {(e) => handleChange(e)}
					/>
					{errors.name && (
						<p className= 'error'>{errors.name}</p>
						)}
				</div>
				<div>
					<label>Dificultad:</label>
					<input
						type= "number"
						value= {input.difficulty}
						name= "difficulty"
						onChange= {(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Duración:</label>
					<input
						type= "number"
						value= {input.duration}
						name= "duration"
						onChange= {(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Temporada:</label>
						<label><input
							type= "checkbox"
							value= "Verano"
							name= "Verano"
							onChange= {(e) => handleCheck(e)}
						/>Verano</label>
						<label><input 
							type= "checkbox"
							value= "Invierno"
							name= "Invierno"
							onChange= {(e) => handleCheck(e)}
						/>Invierno</label>
						<label><input
							type= "checkbox"
							value= "Primavera"
							name= "Primavera"
							onChange= {(e) => handleCheck(e)}
						/>Primavera</label>
						<label><input
							type= "checkbox"
							value= "Otoño"
							name= "Otoño"
							onChange= {(e) => handleCheck(e)}
						/>Otoño</label>
				</div>
				<select onChange= {(e) => handleSelect(e)}>
					{countries.map((coun) => (
						<option value= {coun.id}>{coun.name}</option>
						))}
				</select>
				<ul><li>{input.country.map(e => e + " , ")}</li></ul>
				<button type='submit'>Crear Actividad</button>
			</form>
				{input.country.map(e =>
					<div className='divCount'>
					<p>{e}</p>
					<button className="botonX" onClick={() => handleDelete(e)}>x</button>
					</div>
					)}
		</div>
		)
}
// CONSULTAR ESTO !!