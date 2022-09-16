const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genre', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey:true,
    //   unique:true,
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
    // createdInDb:{
    //   type: DataTypes.BOOLEAN,
    //   allowNull:false,
    //   defaultValue:true,
    // },
  });
};
