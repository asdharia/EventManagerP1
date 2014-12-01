angular.module('EventMgrApp')
.controller('EventController', function($scope, EventFactory, $location, $http)
{
  console.log('EventController//Start.......');
  $scope.NewEvent = function()
  {
    console.log('NewEvent Called');

    $scope.eventrec = new Event(  // ?????? Replace this with a call to Factory
    {
      eventName: [''],
      eventDate: [''],
      gender: [''],
      budget: [''],
      neighborhood: ['']
    });
  }

  $scope.InsertEvent = function()    
  {
    console.log('CreateEvent Called');
    console.log($scope.eventrec);


    // var data1 = JSON.stringify({
    //               username: $scope.name,
    //               email: $scope.email
    //           });
    

    $http.post('http://localhost:3000/api/CreateEventAPI', $scope.eventrec)
      .success(function(data, status, headers, config) 
      {
         $scope.events = data; 
      })
      .error(function(data, status, headers, config) 
      {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // Should never come here - Fail gracefully
      });
  }
})
.controller('ShellController', function($scope, Event, $location)
{
  console.log('ShellController//Start.......');
  // Redirect the user to ViewEvents
 });
   