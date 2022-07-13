module.exports = function(sequelize, dataTypes) {

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        fechaPartida: {
            type: dataTypes.STRING(45)
        },
        fechaLlegada: {
            type: dataTypes.STRING(45)
        },
        precioTotal: {
            type: dataTypes.INTEGER
        },
        cantidadDeDias: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'carrito',
        timestamps: false
    };

    const Carrito = sequelize.define('Carrito', columns, config);

    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Users, {
            as: 'usuario',
            foreignKey: 'usuarios_id'
        })
        Carrito.belongsTo(models.Productos, {
            as: 'producto',
            foreignKey: 'productos_id'
        })
    }
    

    return Carrito;
}