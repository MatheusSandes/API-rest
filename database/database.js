const Sequelize= require('sequelize');

const connection = new Sequelize('api', 'root', '810401',{
    host:'localhost',
    dialect:'mysql'
});

module.exports= connection;