module.exports = function(sequelize, dataTypes) {

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        precioFinal: {
            type: dataTypes.INTEGER
        },
        tipo: {
            type: dataTypes.STRING(1)
        }
    };

    const config = {
        tableName: 'factura',
        timestamps: false
    };

    const Factura = sequelize.define('Factura', columns, config);

    // Factura.associate = function (models) {
    //     Factura.belongsTo(models.DetalleOrden, {
    //         as: 'detalleOrden',
    //         foreignKey: 'detalle_orden_id'
    //     })
    // }

    return Factura;
}