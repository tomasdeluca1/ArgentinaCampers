module.exports = function(sequelize, dataTypes) {

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
    };

    const config = {
        tableName: 'carrito',
        timestamps: false
    };

    const Carrito = sequelize.define('Carrito', columns, config);

    // Carrito.associate = function (models) {
    //     Carrito.belongsTo(models.Users, {
    //         as: 'usuario',
    //         foreignKey: 'usuarios_id'
    //     })
    //     Carrito.hasMany(models.Productos, {
    //         as: 'productos',
    //         foreignKey: 'carrito_id'
    //     })
    // }

    return Carrito;
}