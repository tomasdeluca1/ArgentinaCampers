
module.exports = function(sequelize, dataTypes){

    const columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        firstName: {
            type: dataTypes.STRING(100)
        },
        lastName: {
            type: dataTypes.STRING(100)
        },
        userName: {
            type: dataTypes.STRING(15)
        },
        email: {
            type: dataTypes.STRING(100)
        },
        emailRespaldo: {
            type: dataTypes.STRING(100)
        },
        password: {
            type: dataTypes.STRING(200)
        },
        phoneNumber: {
            type: dataTypes.BIGINT
        },
        phoneNumberRespaldo: {
            type: dataTypes.BIGINT
        },
        avatar: {
            type: dataTypes.STRING(100)
        },
        typeOfUser: {
            type: dataTypes.TINYINT
        },
        birthday: {
            type: dataTypes.STRING(45)
        },
        dni: {
            type: dataTypes.INTEGER
        },
        estadoCuenta: {
            type: dataTypes.TINYINT
        },
        
    }
    const config = {
        tableName: 'usuarios',
        timestamps: false
    }
    const Users = sequelize.define('Users', columns, config);

    Users.associate = function (models){
        Users.belongsTo(models.Genero, {
            as: 'genero',
            foreignKey: 'genero_id'
        })
        Users.belongsTo(models.Direccion, {
            as: 'direccion',
            foreignKey: 'direccion_id'
        })
        Users.hasMany(models.Comentarios, {
            as: 'comentarios',
            foreignKey: 'id_usuario'
        })
        // Users.hasOne(models.Carrito, {
        //     as: 'carrito',
        //     foreignKey: 'usuarios_id'
        // })
        // Users.hasMany(models.DetalleOrden, {
        //     as: 'detalleOrden',
        //     foreignKey: 'usuarios_id'
        // })
        
    }

    return Users;
}

