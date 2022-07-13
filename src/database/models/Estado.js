module.exports = function(sequelize, dataTypes) {

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        estado: {
            type: dataTypes.STRING(100)
        }
    };

    const config = {
        tableName: 'estado',
        timestamps: false
    };

    const Estado = sequelize.define('Estado', columns, config);

    Estado.associate = function (models) {
        Estado.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'estado_id'
        })
    }

    return Estado;
}