'use strict';
angular.module('wecareApp')
    .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('listado');

      	$scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
		if(!$scope.usuarios){
			$scope.usuarios=[
					{
						"username": "lorena",
						"password": "5678",
						"email": "lorena@wecare.com",
						"tipo": "especialista"
					},
					{
						"username": "juan",
						"password": "8765",
						"email": "luan@wecare.com",
						"tipo": "especialista"
					}
			];
			sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

		}else{
			console.log('cargo los usuarios por sesion');
		}

		$scope.especialistasDatos = JSON.parse(sessionStorage.getItem('especialistasDatos'));
		if(!$scope.especialistasDatos){
			$scope.especialistasDatos=[
					{
						"dni": "19234098",
						"nombre": "lorena marconi",
						"direccion": "espeleta 785",
						"fechaNaciminto": "1968-03-25",
						"username": "lorena"
					},
					{
						"dni": "27687524",
						"nombre": "juan alvear",
						"direccion": "wakanda 367",
						"fechaNaciminto": "1985-07-12",
						"username": "juan"
					}
			];
			sessionStorage.setItem('especialistasDatos', JSON.stringify($scope.especialistasDatos));

		}else{
			console.log('cargo los datos de los especialistas por sesion');
		}

		$scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));

		if(!$scope.especialistas){
			$scope.especialistas=[];
		angular.forEach($scope.usuarios, function(value, key) {
		  if(value.tipo=="especialista"){
		  	angular.forEach($scope.especialistasDatos, function(value2, key2) {
			  if(value.username==value2.username){
			  	
			  	var especialistasTemporal = {
				  	dni: value2.dni,
					nombre: value2.nombre,
					direccion: value2.direccion,
					fechaNacimiento: value2.fechaNaciminto,
					username: value2.username,
					indexKey: key,
					password: value.password
			  	};
			  	$scope.especialistas.push(especialistasTemporal);

			  	especialistasTemporal = "";
			  }
			});
		  }
		});

		sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));
	}else{
			console.log('cargo los especialistas por sesion');
		}
      
    })
    .controller('agregarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('agregar');
    })
    .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('editar');
    });
