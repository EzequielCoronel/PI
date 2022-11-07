import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage (){
	return (
		<div className='img'>
			<h1 className='pdm'>Países del mundo</h1>
			<Link to ='/home'>
				<button className='ing'>Ingresar</button>
			</Link>
		</div>
		)
}