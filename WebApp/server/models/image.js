var _imageModel=require('./DataObjects/image');
module.exports = function(sequelize) {
    var Image = sequelize.define('Image', _imageModel, {
        classMethods: {
        },

        tableName: 'Image',
        timestamps: false
    });
    return Image;
};
