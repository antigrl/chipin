function RegisterCtl($scope, $http, $rootScope) {
	$scope.register = function(){
		$http({
			method: HOST + "POST",
			url: "/users",
			data: {email: $scope.email, password: $scope.password}
		}).success(function(data){
			$rootScope.user = data;
		}).error(function(data){
			alert("Failed to register: " + data.error);
		})
	}
}
