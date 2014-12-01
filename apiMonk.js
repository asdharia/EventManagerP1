var express=require('express');
var bodyParser = require('body-parser');

//mongoose ....
var monk = require('monk');
var uristring ='localhost:27017/MongoData';
var db = monk(uristring);

//router ....
var router = express.Router();
router
     .use(bodyParser.json())
     .use(function(req,res,next){
        req.db = db;
        next();
      })
     .route('/CreateEventAPI')
      .post(function(req,res)
      {
          var evRec = req.body;
          var eventTab = db.get('events');
          eventTab.insert(evRec);   // ?????? This would be a blocking call. Convert to non blocking
      });


//router ....
module.exports = router;
