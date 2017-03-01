var router = require('express').Router();
var models = require('../../models');

// Upload file setting
var multer	=	require('multer');
var storage	=	multer.diskStorage({
     destination: function (req, file, callback) {
          callback(null, './client/img');
     },
     filename: function (req, file, callback) {
          callback(null, file.fieldname + '-' + Date.now() + file.originalname);
     }
});
var upload = multer({ storage : storage}).single('upload');

// generate table to mysql
router.post('/photo', function(req, res){
     upload(req, res, function() {
          if (typeof req.file !== "undefined")
          {
               models.Image.create(
                    {
                         imgLink: '/img/' + req.file.filename
                    }
               );
               // .then(function(){
               //     res.redirect('/#/upload_image');
               // })
          };
          res.redirect('/#/upload_image');
     });
});

router.get('/getImgLink', function(req,res){
     models.Image.findAll().then(function(imgLink){
          var dataSend = {
               success: true,
               msg: 'Get Image Link Success',
               imgLink: imgLink
          };
          res.send(dataSend);
     });
});

module.exports = router;
