const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,             //UUID genera un codigo random único con letras y numeros. DataType de Sequelize
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdInDb: {                  //prop que me va a permitir acceder solo a los pokemons creados en la db
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  });
};
