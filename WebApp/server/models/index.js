var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require("../config/config")[env];
var sequelize = module.exports = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
.readdirSync(__dirname)
.filter(function(file)
{
    return ((file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "DataObjects"));
})
.forEach(function(file)
{
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName)
{
    if ("associate" in db[modelName])
    {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// define table associations

// association of table user and user_record
db.UserRecord.belongsTo(db.User,{foreignKey: 'userId'});
db.User.hasMany(db.UserRecord,{foreignKey: 'userId'});


module.exports = db;
