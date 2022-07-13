module.exports = function(sequelize, dataTypes) {

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        cantidad: {
            type: dataTypes.INTEGER
        },
        fecha: {
            type: dataTypes.DATE
        },
    };

    const config = {
        tableName: 'detalles_orden',
        timestamps: false
    };

    const DetalleOrden = sequelize.define('DetalleOrden', columns, config);

    // DetalleOrden.associate = function (models) {
    //     DetalleOrden.belongsTo(models.Users, {
    //         as: 'usuarios',
    //         foreignKey: 'usuarios_id'
    //     })
    //     DetalleOrden.hasMany(models.Productos, {
    //         as: 'productos',
    //         foreignKey: 'productos_id'
    //     })
    //     DetalleOrden.hasMany(models.Factura, {
    //         as: 'facturas',
    //         foreignKey: 'detalle_orden_id'
    //     })
    // }

    return DetalleOrden;
}