angular.module('app.controllers', ['wakanda'])

.controller('companiesCtrl', function($scope, $wakanda, $state, $ionicPopup) {
	var ds = $wakanda.$ds;
	$scope.companies = ds.Company.$query();

	$scope.logout = function() {
		$ionicPopup.confirm({
			title: 'Confirmation',
			template: 'Would you like to logout?'
		}).then(function(res) {
			if (res) {
				$wakanda.$logout().then(function() {
					$state.go('login');
				});
			}
		});
	};

	$scope.refresh = function() {
		($scope.companies = ds.Company.$query()).$promise.then(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
})

.controller('employeesCtrl', function($scope, $wakanda, $stateParams) {
	var ds = $wakanda.$ds;
	
	($scope.refresh = function() {
		$scope.employees = ds.Employee.$query({
			filter: 'company.ID == :1',
			params: [$stateParams.id]
		});

		$scope.employees.$promise.then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	})();
})

.controller('groupsCtrl', function($scope, $wakanda, $stateParams) {
	var ds = $wakanda.$ds;
	
	($scope.refresh = function() {
		$scope.groups = ds.Group.$query({
			filter: 'company.ID == :1',
			params: [$stateParams.id]
		});

		$scope.groups.$promise.then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	})();
})

.controller('loginCtrl', function($scope, $wakanda, $ionicPopup, $state) {
	$scope.username = "";
	$scope.password = "";
	$scope.disabled = false;

	$scope.login = function(username, password) {
		$scope.disabled = true;
		$wakanda.$login(username, password).$promise.then(function(event) {
			$scope.disabled = false;

			if (!event.result) {
				return $ionicPopup.alert({
					title: 'Authentication error',
					template: 'Wrong login or password'
				});
			}

			$state.go('companies');
		});
	};
})

.controller('employeeDetailsCtrl', function($scope, $wakanda, $stateParams) {
	var ds = $wakanda.$ds;
	
	ds.Employee.$find($stateParams.id).$promise.then(function (ev) {
		$scope.employee = ev.result;
		$scope.employee.company.$fetch();
	})
})

.controller('employeeGroupsCtrl', function($scope, $wakanda, $stateParams) {
	var ds = $wakanda.$ds;
	
	($scope.refresh = function () {
		ds.Employee.$find($stateParams.id).$promise.then(function (ev) {
			$scope.employee = ev.result;
			$scope.employee.groups.$fetch();

			$scope.$broadcast('scroll.refreshComplete');
		});
	})();
})