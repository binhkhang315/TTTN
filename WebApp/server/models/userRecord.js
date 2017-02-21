var _userRecordModel=require('./DataObjects/userRecord');
module.exports = function(sequelize) {
    var UserRecord = sequelize.define('UserRecord', _userRecordModel, {
        classMethods: {
            getUserByEmail: function(userEmail, cb){
                var query = {
                    where: {
                        email: userEmail
                    }
                };
                User.findOne(query).then(cb);
            }
        },

        tableName: 'user_record',
        timestamps: false
    });
    return UserRecord;
};
