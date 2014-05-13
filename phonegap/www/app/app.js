var app = angular.module("chipin", ['ngRoute']);

HOST = "http://chipinapp.herokuapp.com";
// HOST = "";

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginCtl'
	}).when('/menu', {
		templateUrl: 'templates/menu.html',
		controller: 'MenuCtl'
	}).when('/ping', {
		templateUrl: 'templates/ping.html',
		controller: 'PingCtl'
	}).when('/add', {
		templateUrl: 'templates/add-card.html',
		controller: 'AddCardCtl'
	}).when('/split', {
		templateUrl: 'templates/split.html',
		controller: 'SplitCtl'
	}).when('/register', {
		templateUrl: 'templates/new.html',
		controller: 'RegisterCtl'
	}).when('/bill-amt', {
		templateUrl: 'templates/bill-amt.html',
		controller: 'BillAmtCtl'
	}).when('/new', {
		templateUrl: 'templates/new.html',
		controller: 'NewCtl'
	}).when('/total', {
		templateUrl: 'templates/total.html',
		controller: 'TotalCtl'
	}).when('/graph', {
		templateUrl: 'templates/graph.html',
		controller: 'GraphCtl'
	}).when('/done', {
		templateUrl: 'templates/done.html',
		controller: 'DoneCtl'
	}).otherwise({
		redirectTo: '/'
	})
});





