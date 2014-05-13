function MenuCtl($scope, $http) {
	$http({
		method: "GET",
		url: HOST + "/login"
	})
	.success(function(){
		$scope.loggedin = true;
	})
	.error(function(){
		$scope.loggedin = false;
	});
}
