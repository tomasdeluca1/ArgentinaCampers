module.exports = function(sequelize, dataTypes){
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        genero: {
            type: dataTypes.STRING(45)
        }
    }
    const config = {
        tableName: 'genero',
        timestamps: false
    }

    const Genero = sequelize.define('Genero', columns, config);

    Genero.associate = function (models){
        Genero.hasMany(models.Users, {
            as: "usuarios",
            foreignKey: "genero_id"
        })
    }

    return Genero;
}