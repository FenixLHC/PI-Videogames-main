const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{ 
    sequelize.define('Platform',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
    })
}