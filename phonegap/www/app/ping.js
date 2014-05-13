function PingCtl($scope, $http) {
	$http({
		method: "GET",
		url: HOST + "/ping"
	}).success(function(data){
		$scope.alive = data.alive;
	}).error(function(data){
		alert(data);
	})
}
