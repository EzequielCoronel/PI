const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

	sequelize.define('activity', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING
		},
		difficulty: {
			type: DataTypes.INTEGER,
			validate: {
				min: 1,
				max: 5
			}
		},
		duration: {
			type: DataTypes.STRING

		},
		season: {
			type: DataTypes.STRING,
			validate: {
				isIn: [['Verano', 'Invierno', 'Otoño', 'Primavera']]
			}

		}
	});
}