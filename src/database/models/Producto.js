module.exports = function(sequelize, dataTypes) {
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        marca: {
            type: dataTypes.STRING(45)
        },
        modelo: {
            type: dataTypes.STRING(45)
        },
        img: {
            type: dataTypes.STRING(100)
        },
        color: {
            type: dataTypes.STRING(100)
        }, 
        descripcion: {
            type: dataTypes.TEXT
        },
        capacidad: {
            type: dataTypes.INTEGER
        }, 
        precioDia: {
            type: dataTypes.DECIMAL
        },
        ultimoService: {
            type: dataTypes.DATE
        },
        antiguedad: {
            type: dataTypes.INTEGER
        },       
        stock: {
            type: dataTypes.INTEGER
        },
        estadoProducto: {
            type: dataTypes.TINYINT
        }
    };

    const config = {
        tableName: 'productos',
        timestamps: false,
    };

    const Productos = sequelize.define('Productos', columns, config);

    Productos.associate = function (models) {
        Productos.belongsTo(models.Estado, {
            as: 'estado',
            foreignKey: 'estado_id'
        })
        // Productos.belongsTo(models.Carrito, {
        //     as: 'carrito',
        //     foreignKey: 'carrito_id'
        // })
        // Productos.belongsTo(models.DetalleOrden, {
        //     as: 'detalleOrden',
        //     foreignKey: 'detalles_orden_id'
        // })
    }

    return Productos;
}