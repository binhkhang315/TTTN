var SequelizeDatatypes = require('sequelize');

module.exports=
{
     firstName: {
          type: SequelizeDatatypes.STRING,
          allowNull: false
     },
     lastName: {
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
     }
}
