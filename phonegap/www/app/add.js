function AddCardCtl($scope, $http) {

	Stripe.setPublishableKey('pk_sn59DGqlQFYVredKVSztb2YPwEtWN')

	$scope.card

	$scope.addCard = function(){
		console.log($scope.card)
		Stripe.card.createToken({
		    number: $scope.card.number,
		    cvc: $scope.card.cvc,
		    exp_month: $scope.card.month,
		    exp_year: $scope.card.year
		}, function(data){
			console.log(JSON.stringify(data))
			$http.post(HOST + '/', {
				type: 'Stripe CC',
				card: JSON.stringify(data)
			}).success(function(resp){
				console.log(resp)
			})
		});
	}
}
