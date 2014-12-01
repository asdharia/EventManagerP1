var express= require('express'),
    api    = require('./api');
    app    = express();

 app
    .use(express.static('./public'))
    .use('/api',api)
    .get('*',function(req, res){
    	res.sendfile(__dirname +'/public/main.html');	// ?????? Replace this with a cleaner way to do it
    })   
    .listen(3000);