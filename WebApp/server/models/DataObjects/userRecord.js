var SequelizeDatatypes = require('sequelize');

module.exports=
{
    healthStatus1: {
        type: SequelizeDatatypes.STRING,
        allowNull: false
    },
    healthStatus2: {
        type: SequelizeDatatypes.STRING,
        allowNull: false
    },
    userId: {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    }
}
