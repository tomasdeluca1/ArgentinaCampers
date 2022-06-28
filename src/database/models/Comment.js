module.exports = function (sequelize, dataTypes){
    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        destino:{
            type: dataTypes.STRING(45)
        },
        rating: {
            type: dataTypes.STRING(5)
        },
        experiencia: {
            type: dataTypes.STRING(45)
        },
        titulo: {
            type: dataTypes.STRING(45)
        },
        descripcion: {
            type: dataTypes.TEXT
        },
    }

    const config = {
        tableName: 'comentarios',
        timestamps: false
    }

    const Comentarios = sequelize.define('Comentarios', columns, config)

    Comentarios.associate = function (models) {
        Comentarios.belongsTo(models.Users, {
            as: 'usuarios',
            foreignKey: 'id_usuario'
        })
    }

    return Comentarios
}