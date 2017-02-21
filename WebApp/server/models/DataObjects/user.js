var SequelizeDatatypes = require('sequelize');

module.exports=
{
    username: {
        type: SequelizeDatatypes.STRING,
        allowNull: false
    },
    email: {
        type: SequelizeDatatypes.STRING,
        allowNull: false
    },
    password: {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    phone: {
        type: SequelizeDatatypes.STRING,
        allowNull: true
    },
    avatar: {
        type: SequelizeDatatypes.STRING,
        allowNull: false
    }
}
