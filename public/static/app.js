'use strict';
angular.module('SpApp', [] )
	.controller('LoginModalController',function($sce, $scope, $element, $http, $compile) {

		$scope.url = $element.find('#LoginForm').attr('action');
		$scope.isError = false;
		$scope.loginFormData = {
			Login: 'Вход',
		};

		

		$scope.loginWork = function (e, action) {
			console.log(e)
			if ( e ) {
				e.preventDefault();
			}

			if ( action == 'login' ) {
				$scope.loginFormData.service = 'login';
			}
			

			$.ajax({
            	type: 'POST',
	            dataType: 'html',
	            url: $scope.url,
	            data: $scope.loginFormData,
	            success: function(data) {
	                console.log(data)
	                var $html = $.parseHTML( data );

	                if( action == 'login') {
	                	var errorText = $($html).find('#LoginFormError').text();

						if ( errorText != '' ) {
							$scope.isError = true;
							
						}
						else window.location.href = window.location.pathname;
	                }
	                
	                $element.find('#LoginFormWrapper').html($compile(data)($scope));
	       		
	        	}
	    	});
		};

		$scope.loginWork(false, 'load');

	});