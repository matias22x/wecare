'use strict';
angular.module('wecareApp')
    .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
      console.log('listado');

      	$scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
		if(!$scope.usuarios){
			$scope.usuarios=[
					{
                                    "username": "martin",
                                    "password": "5678",
                                    "email": "martin@wecare.com",
                                    "tipo": "alumno"
                              },
                              {
                                    "username": "juanita",
                                    "password": "8765",
                                    "email": "juanita@wecare.com",
                                    "tipo": "alumno"
                              },
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
			console.log($scope.usuarios);
		}

		$scope.especialistasDatos = JSON.parse(sessionStorage.getItem('especialistasDatos'));
		if(!$scope.especialistasDatos){
			$scope.especialistasDatos=[
					{
						"dni": "19234098",
						"nombre": "lorena marconi",
						"direccion": "espeleta 785",
						"fechaNacimiento": "1968-03-25",
						"username": "lorena"
					},
					{
						"dni": "27687524",
						"nombre": "juan alvear",
						"direccion": "wakanda 367",
						"fechaNacimiento": "1985-07-12",
						"username": "juan"
					}
			];
			sessionStorage.setItem('especialistasDatos', JSON.stringify($scope.especialistasDatos));

		}else{
			console.log('cargo los datos de los especialistas por sesion');
			console.log($scope.especialistasDatos);
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
					fechaNacimiento: value2.fechaNacimiento,
					username: value2.username,
					usuarioKey: key,
					especialistaDatosKey: key2,
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
			console.log($scope.especialistas);
		}
      
    })
    .controller('agregarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$location, config) {
      console.log('agregar');
      $scope.especialistaNuevo =  {};
      $scope.usuario =  {};
      $scope.especialistaDatos =  {};
      $scope.especialista =  {};

      $scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
      $scope.especialistasDatos = JSON.parse(sessionStorage.getItem('especialistasDatos'));
	  $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));
	  console.log($scope.especialistas);

        $scope.crearEspecialista = function(){
      	var esp = $scope.especialistaNuevo;
      	if(esp.username && esp.email && esp.dni && esp.nombre && esp.direccion && esp.fechaNacimiento && esp.password){
      		$scope.usuario.username = esp.username;
      		$scope.usuario.password = esp.password;
      		$scope.usuario.email = esp.email;
      		$scope.usuario.tipo = 'especialista'

      		var indexUsuario = $scope.usuarios.push($scope.usuario) - 1;
      		console.log(indexUsuario);
      		sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

      		$scope.especialistaDatos.dni = esp.dni;
      		$scope.especialistaDatos.nombre = esp.nombre;
      		$scope.especialistaDatos.direccion = esp.direccion;
      		$scope.especialistaDatos.fechaNacimiento = esp.fechaNacimiento;
      		$scope.especialistaDatos.username = esp.username;

      		var indexEspecialistaDatos = $scope.especialistasDatos.push($scope.especialistaDatos) - 1;
      		console.log(indexEspecialistaDatos);
      		sessionStorage.setItem('especialistasDatos', JSON.stringify($scope.especialistasDatos));

      		$scope.especialista.dni = esp.dni;
      		$scope.especialista.nombre = esp.nombre;
      		$scope.especialista.direccion = esp.direccion;
      		$scope.especialista.fechaNacimiento = esp.fechaNacimiento;
      		$scope.especialista.username = esp.username;
      		$scope.especialista.usuarioKey = indexUsuario;
      		$scope.especialista.especialistaDatosKey = indexEspecialistaDatos;
      		$scope.especialista.password = esp.password;

      		$scope.especialistas.push($scope.especialista);
      		sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));
      		console.log($scope.especialistas);
      		
      		$location.path("/listado_especialistas");
      	}else{
      		$scope.mensajeErrorIncompleto = true;
      	}
      }

      $scope.esconderError = function(){
      	$scope.mensajeErrorIncompleto = false;
      }

    })
    .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$stateParams,$location, config) {
      console.log('editar');
      $scope.id = $stateParams.ID;
      
      $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));
      
      $scope.especialistas[$scope.id].fechaNacimiento = new Date($scope.especialistas[$scope.id].fechaNacimiento);
      
      $scope.especialistaElegido =  $scope.especialistas[$scope.id];

      $scope.modificarUsuario = function(){
      	var esp = $scope.especialistaElegido;
      	if(esp.dni && esp.nombre && esp.direccion && esp.fechaNacimiento && esp.password){
      		$scope.especialistas[$scope.id].dni = esp.dni;
      		$scope.especialistas[$scope.id].nombre = esp.nombre;
      		$scope.especialistas[$scope.id].direccion = esp.direccion;
      		$scope.especialistas[$scope.id].fechaNacimiento = esp.fechaNacimiento;
      		$scope.especialistas[$scope.id].password = esp.password;

      		sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));

      		$location.path("/listado_especialistas");
      	}else{
      		$scope.mensajeErrorIncompleto = true;
      	}
      }

      $scope.esconderError = function(){
      	$scope.mensajeErrorIncompleto = false;
      }

    })
    .controller('eliminarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$stateParams,$location, config) {
      console.log('eliminar');
      $scope.id = $stateParams.ID;
      console.log($scope.id);
      
      $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));
      
      //$scope.especialistas[$scope.id].fechaNacimiento = new Date($scope.especialistas[$scope.id].fechaNacimiento);
      
      $scope.especialistaElegido =  $scope.especialistas[$scope.id];
      console.log($scope.especialistaElegido);

      $scope.eliminarUsuario = function(){
            var esp = $scope.especialistaElegido;
            var indexUsuario = esp.indexUsuario;
            var indexEspecialistaDatos = esp.indexEspecialistaDatos;


            $scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
            $scope.especialistasDatos = JSON.parse(sessionStorage.getItem('especialistasDatos'));
            $scope.especialistas = JSON.parse(sessionStorage.getItem('especialistas'));

            $scope.especialistas.splice($scope.id, 1);
            sessionStorage.setItem('especialistas', JSON.stringify($scope.especialistas));

            $scope.especialistasDatos.splice(indexEspecialistaDatos, 1);
            sessionStorage.setItem('especialistasDatos', JSON.stringify($scope.especialistasDatos));

            $scope.usuarios.splice(indexUsuario, 1);
            sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

            $location.path("/listado_especialistas");

           
      }

      $scope.volver = function(){
           
            $location.path("/listado_especialistas");

      }



    });
     
