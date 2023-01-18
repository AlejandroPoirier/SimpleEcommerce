const Sequelize = require("sequelize");

//Database info
const dbName = "node-complete"
const userName = "root"
const dbPass = "BDcontra2022"


 const sequelize = new Sequelize(dbName, userName, dbPass, {
	dialect: 'mysql',
	host: 'localhost'
});


sequelize
	.authenticate()
	.then( () => {
		console.log("Base de datos conectada correctamente")
	})
	.catch( err => {
		console.log('Error al conectar a la base de datos:', err)
	});
	
module.exports = sequelize;
