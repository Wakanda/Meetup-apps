angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('companies', {
      url: '/companies',
      templateUrl: 'templates/companies.html',
      controller: 'companiesCtrl',
      resolve: {
        manager: function ($wakanda) {
          return $wakanda.init();
        }
      }
    })
        
      
    
      
        
    .state('companyTabsController.employees', {
      url: '/employees',
      views: {
        'tab1': {
          templateUrl: 'templates/employees.html',
          controller: 'employeesCtrl'
        }
      }
    })
        
      
    
      
        
    .state('companyTabsController.groups', {
      url: '/groups',
      views: {
        'tab3': {
          templateUrl: 'templates/groups.html',
          controller: 'groupsCtrl'
        }
      }
    })
        
      
    
      
    .state('companyTabsController', {
      url: '/company/:id',
      abstract:true,
      templateUrl: 'templates/companyTabsController.html',
      resolve: {
        manager: function ($wakanda) {
          return $wakanda.init();
        }
      }
    })
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('employeeTabsController.employeeDetails', {
      url: '/details',
      views: {
        'tab5': {
          templateUrl: 'templates/employeeDetails.html',
          controller: 'employeeDetailsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('employeeTabsController.employeeGroups', {
      url: '/groups',
      views: {
        'tab6': {
          templateUrl: 'templates/employeeGroups.html',
          controller: 'employeeGroupsCtrl'
        }
      }
    })
        
      
    
      
    .state('employeeTabsController', {
      url: '/employee/:id',
      abstract:true,
      templateUrl: 'templates/employeeTabsController.html',
      resolve: {
        manager: function ($wakanda) {
          return $wakanda.init();
        }
      }
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});