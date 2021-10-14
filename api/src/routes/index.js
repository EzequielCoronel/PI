const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Country, Activity } = require ('../db.js');
const sequelize = require ('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/countries', async (req, res) => {
	const {name} = req.query;

	if(name) {

		const countriesName = await Country.findAll();
		let countryFilter = countriesName.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
		if (countryFilter.length > 0) {
			res.send(countryFilter);
		return;
		}
		res.status(404).send('No se encontro ningun pais')
		return; 
	}
	const allCountriesDb = await Country.findAll();
	if (allCountriesDb && allCountriesDb.length >= 250) {
		res.send(allCountriesDb)
		return;
	}

	const countriesApi = await axios.get('https://restcountries.com/v2/all');
	const countries = countriesApi.data.map(e => {
		return {
			name: e.name,
			id: e.alpha3Code,
			img: e.flag,
			continent: e.region,
			capital: e.capital || e.name,
			subregion: e.subregion,
			area: e.area,
			population: e.population
		}
	})


	countries.forEach(e => {
		const country = Country.build(e);
		country.save().catch(error => {

		});
	})

	res.json(countries);
})




router.get('/countries/:id', async (req, res) => {
	const {id} = req.params;

	const detailCountry = await Country.findOne({
		where: {
			id: id.toUpperCase()
		}, include: Activity
	});
	if (detailCountry) {
		res.send(detailCountry);
		return;
	}
	res.status(404).send(`No se encontro el pais ${id}`);
})


router.post('/activity', async (req, res) => {
	const activity = {
		name: req.body.name,
		difficulty: req.body.difficulty,
		duration: req.body.duration,
		season: req.body.season
	}
	const countries = req.body.country

	const activityBuild = Activity.build (activity);
	const activityCreated = await activityBuild.save();

	for (let i=0; i<countries.length; i++) {
		const detailCountry = await Country.findOne({
		where: {
			id: countries[i]
		},
	})
	const activity2 = await activityCreated.addCountry(detailCountry)
	}
	res.send(activityCreated)
})

	


module.exports = router;
