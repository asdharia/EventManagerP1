var express=require('express');
var bodyParser = require('body-parser');

//mongoose ....
var mongoose = require('mongoose');
var uristring ='mongodb://localhost:27017/eventsDB';


mongoose.connect(uristring,function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var nextCounterSchema = new mongoose.Schema({
    _id: String,
    seq: {type: Number, default: 1}
  });
var counterRec = mongoose.model('counters', nextCounterSchema);

function doDML(dmlEvent) {
          console.log("In DoDML"+dmlEvent.eventName);
  if(dmlEvent.id){
     counterRec.findOneAndUpdate({_id:'eventId'}, {'$inc':{seq:1}}, {new:true} , function(err, result) {
                                if (err){  console.log ('ERROR during upate and fetch - ' + err); }
                                   else{ 
                                          console.log('result is:'+result.seq);
                                          dmlEvent.id = parseInt(result.seq,10); 
                                          dmlEvent.save(function (err) {if (err) console.log ('Error on save!')});
                                       }   
                             });
   }
   else {
          dmlEvent.save(function (err) {if (err) console.log ('Error on save!')});
     }
};

var eventSchema = new mongoose.Schema({
  id          : { type : Number, min : 0 },
  eventName   : { type : String, min : 0 },
  eventDate   : { type : String, trime:true},
  gender      : { type : String, trime:true},
  budget      : { type : Number, min:0},
  neighborhood: { type : String, trime:true}
});

var PEvent = mongoose.model('events', eventSchema);
//mongoose ....

//router ....
var router = express.Router();
router
     .use(bodyParser.json())
     .use(function(req,res,next){
//        req.db = db;
        next();
      })
     .route('/CreateEventAPI')
      .post(function(req,res)
      {
          var evRec = req.body;
          console.log("In create Event API");
          var newEvent = new PEvent ({
//               id          : '100',  
               eventName   : evRec.eventName,
                eventDate   : evRec.eventDate, 
               gender      : evRec.gender,
               budget      : evRec.budget,
               neighborhood: evRec.neighborhood
             });
          console.log("Before doDML"+newEvent.eventName);
               doDML(newEvent);
      });
//router ....
module.exports = router;
