module.exports = function (sequelize, dataTypes) {
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        img: {
            type: dataTypes.STRING(100)
        }
    }

    const config = {
        tableName: 'productos_imagenes',
        timestamps: false
    }

    const ProductosImagenes = sequelize.define('ProductosImagenes', columns, config) 

    ProductosImagenes.associate = function (models) {
        ProductosImagenes.belongsTo(models.Productos, {
            as: 'producto',
            foreignKey: 'producto_id'
        })
    }

    return ProductosImagenes;    
}