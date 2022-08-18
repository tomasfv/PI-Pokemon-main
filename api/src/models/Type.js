const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //ID lo genera sequelize de manera automatica.
  sequelize.define('type', {
    name:{
        type: DataTypes.STRING
    }
  })}