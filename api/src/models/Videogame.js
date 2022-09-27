const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      unique:true,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate:{
      type:DataTypes.DATEONLY,
      defaultValue:DataTypes.NOW
    },
    rating:{
      type:DataTypes.FLOAT,
    },
    backgroundImage:{
      type:DataTypes.STRING
    },
    platforms:{
      // type:DataTypes.ARRAY(DataTypes.STRING),
      type:Sequelize.JSON,
      // type:DataTypes.STRING,
      allowNull:false
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
