angular.module('EventMgrApp')
       .factory('EventFactory',function($resource){
       		console.log('EventFactory Called');
       	  	return $resource('/api/event/:id',
       	  	                { 'id' : '@id'}, 
       	  	                {'update': {  method :'PUT' }}
       	  	           );
       });
