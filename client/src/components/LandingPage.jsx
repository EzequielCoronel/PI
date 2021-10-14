import React from 'react';
import {Link} from 'react-router-dom';
import img from '../index.css';

export default function LandingPage (){
	return (
		<div className='img'>
			<h1 className='pdm'>Paises del mundo</h1>
			<Link to ='/home'>
				<button className='ing'>Ingresar</button>
			</Link>
		</div>
		)
}