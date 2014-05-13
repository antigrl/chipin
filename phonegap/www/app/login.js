function LoginCtl($scope, $http) {
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

	$scope.login = function(){
		$http({
			method: "POST",
			url: HOST + "/login",
			data: {email: $scope.email, password: $scope.password}
		})
		.success(function(){
			window.location = "#/menu";
		})
		.error(function(data){
			console.log(data);
			alert("ERROR: " + data);
		});
	};

	$scope.logout = function() {
		$http({
			method: "DELETE",
			url: HOST + "/login"
		})
		.success(function(data){
			alert("Success: " + data);
			console.log(data);
		})
		.error(function(data){
			alert("Failure: " + data);
			console.log(data);
		})
	};

	$scope.register = function() {
		window.location = "/#/register";
	}
}
