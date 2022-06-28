module.exports = function(sequelize, dataTypes){
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        provincia: {
            type: dataTypes.STRING(45)
        }
    }

    const config = {
        tableName: 'provincia',
        timestamps: false
    }

    const Provincia = sequelize.define('Provincia', columns, config)

    Provincia.associate = function(models){
        Provincia.hasMany(models.Direccion, {
            as: 'direccion',
            foreignKey: 'provincia_id'
        })
    }
    

    return Provincia
}