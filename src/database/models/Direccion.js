module.exports = function(sequelize, dataTypes){
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        municipio: {
            type: dataTypes.STRING(100)
        },
        ciudad: {
            type: dataTypes.STRING(100)
        },
        calle: {
            type: dataTypes.STRING(100)
        },
        numeroVivienda: {
            type: dataTypes.INTEGER
        },
        codigoPostal:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: 'direccion',
        timestamps: false
    }

    const Direccion = sequelize.define('Direccion', columns, config)

    Direccion.associate = function(models){
        Direccion.belongsTo(models.Provincia, {
            as: 'provincia',
            foreignKey: 'provincia_id'
        })
        Direccion.hasMany(models.Users, {
            as: 'usuarios',
            foreignKey: 'direccion_id'
        })
    }

    return Direccion
}