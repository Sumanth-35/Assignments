angular.module('flightApp')
  .controller('FlightController', function($scope, FlightService) {

    $scope.flights = [];
    $scope.sortField = '';

    // READ (GET)
    function loadFlights() {
      FlightService.getFlights().then(function(response) {
        $scope.flights = response.data;
        $scope.flights.forEach(function(flight) {
        flight.departureTime = new Date(flight.departureTime);
  });
      });
    }
    loadFlights();

    // CREATE (POST)
    $scope.addFlight = function() {
        $scope.newFlight.departureTime = new Date($scope.newFlight.departureTime);
      FlightService.addFlight($scope.newFlight).then(function() {
        loadFlights();
        $scope.newFlight = {};
      });
    };

    // UPDATE (PUT)
    $scope.updateStatus = function(flight) {
      flight.status = prompt(
        "Enter Status (On Time / Delayed / Cancelled)", 
        flight.status
      );

      FlightService.updateFlight(flight).then(loadFlights);
    };

    // DELETE
    $scope.deleteFlight = function(id) {
      FlightService.deleteFlight(id).then(loadFlights);
    };

    // SORT
    $scope.sortBy = function(field) {
      $scope.sortField = field;
    };

  });
