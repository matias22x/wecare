'use strict';
angular.module('wecareApp')
    .controller('listadoAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config) {
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
                                    "tipo": "alumno"
                              },
                              {
                                    "username": "juan",
                                    "password": "8765",
                                    "email": "luan@wecare.com",
                                    "tipo": "alumno"
                              }
			];
			sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

		}else{
			console.log('cargo los usuarios por sesion');
			console.log($scope.usuarios);
		}

		$scope.alumnosDatos = JSON.parse(sessionStorage.getItem('alumnosDatos'));
		if(!$scope.alumnosDatos){
			$scope.alumnosDatos=[
					{
						"dni": "40234098",
                                    "curso": "8vo",
						"nombre": "martin prieto",
						"direccion": "ramon lista 345",
						"fechaNacimiento": "2003-03-25",
						"username": "martin"
					},
					{
						"dni": "41687524",
                                    "curso": "7mo",
						"nombre": "juana pereira",
						"direccion": "morder 367",
						"fechaNacimiento": "2004-07-12",
						"username": "juanita"
					}
			];
			sessionStorage.setItem('alumnosDatos', JSON.stringify($scope.alumnosDatos));

		}else{
			console.log('cargo los datos de los alumnos por sesion');
			console.log($scope.alumnosDatos);
		}

		$scope.alumnos = JSON.parse(sessionStorage.getItem('alumnos'));

		if(!$scope.alumnos){
			$scope.alumnos=[];
		angular.forEach($scope.usuarios, function(value, key) {
		  if(value.tipo=="alumno"){
		  	angular.forEach($scope.alumnosDatos, function(value2, key2) {
			  if(value.username==value2.username){
			  	
			  	var alumnosTemporal = {
				  	dni: value2.dni,
					nombre: value2.nombre,
                              curso: value2.curso,
					direccion: value2.direccion,
					fechaNacimiento: value2.fechaNacimiento,
					username: value2.username,
					usuarioKey: key,
					alumnoDatosKey: key2,
					password: value.password
			  	};
			  	$scope.alumnos.push(alumnosTemporal);

			  	alumnosTemporal = "";
			  }
			});
		  }
		});

		sessionStorage.setItem('alumnos', JSON.stringify($scope.alumnos));
	}else{
			console.log('cargo los alumnos por sesion');
			console.log($scope.alumnos);
		}
      
    })
    .controller('agregarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$location, config) {
      console.log('agregar');
      $scope.alumnoNuevo =  {};
      $scope.usuario =  {};
      $scope.alumnoDatos =  {};
      $scope.alumno =  {};

      $scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
      $scope.alumnosDatos = JSON.parse(sessionStorage.getItem('alumnosDatos'));
	  $scope.alumnos = JSON.parse(sessionStorage.getItem('alumnos'));
	  console.log($scope.alumnos);

        $scope.crearAlumno = function(){
      	var esp = $scope.alumnoNuevo;
      	if(esp.username && esp.email && esp.curso && esp.dni && esp.nombre && esp.direccion && esp.fechaNacimiento && esp.password){
      		$scope.usuario.username = esp.username;
      		$scope.usuario.password = esp.password;
      		$scope.usuario.email = esp.email;
      		$scope.usuario.tipo = 'alumno'

      		var indexUsuario = $scope.usuarios.push($scope.usuario) - 1;
      		console.log(indexUsuario);
      		sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

      		$scope.alumnosDatos.dni = esp.dni;
      		$scope.alumnosDatos.nombre = esp.nombre;
                  $scope.alumnosDatos.curso = esp.curso;
      		$scope.alumnosDatos.direccion = esp.direccion;
      		$scope.alumnosDatos.fechaNacimiento = esp.fechaNacimiento;
      		$scope.alumnosDatos.username = esp.username;

      		var indexAlumnosDatos = $scope.alumnosDatos.push($scope.alumnoDatos) - 1;
      		console.log(indexAlumnosDatos);
      		sessionStorage.setItem('alumnosDatos', JSON.stringify($scope.alumnosDatos));

      		$scope.alumno.dni = esp.dni;
      		$scope.alumno.nombre = esp.nombre;
                  $scope.alumno.curso = esp.curso;
      		$scope.alumno.direccion = esp.direccion;
      		$scope.alumno.fechaNacimiento = esp.fechaNacimiento;
      		$scope.alumno.username = esp.username;
      		$scope.alumno.usuarioKey = indexUsuario;
      		$scope.alumno.alumnoDatosKey = indexAlumnosDatos;
      		$scope.alumno.password = esp.password;

      		$scope.alumnos.push($scope.alumno);
      		sessionStorage.setItem('alumnos', JSON.stringify($scope.alumnos));
      		console.log($scope.alumnos);
      		
      		$location.path("/listado_alumnos");
      	}else{
      		$scope.mensajeErrorIncompleto = true;
      	}
      }

      $scope.esconderError = function(){
      	$scope.mensajeErrorIncompleto = false;
      }

    })
    .controller('editarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$stateParams,$location, config) {
      console.log('editar');
      $scope.id = $stateParams.ID;
      
      $scope.alumnos = JSON.parse(sessionStorage.getItem('alumnos'));
      
      $scope.alumnos[$scope.id].fechaNacimiento = new Date($scope.alumnos[$scope.id].fechaNacimiento);
      
      $scope.alumnoElegido =  $scope.alumnos[$scope.id];

      $scope.modificarUsuario = function(){
      	var esp = $scope.alumnoElegido;
      	if(esp.dni && esp.nombre && esp.direccion && esp.fechaNacimiento && esp.password){
      		$scope.alumnos[$scope.id].dni = esp.dni;
      		$scope.alumnos[$scope.id].nombre = esp.nombre;
      		$scope.alumnos[$scope.id].direccion = esp.direccion;
      		$scope.alumnos[$scope.id].fechaNacimiento = esp.fechaNacimiento;
      		$scope.alumnos[$scope.id].password = esp.password;

      		sessionStorage.setItem('alumnos', JSON.stringify($scope.alumnos));

      		$location.path("/listado_alumnos");
      	}else{
      		$scope.mensajeErrorIncompleto = true;
      	}
      }

      $scope.esconderError = function(){
      	$scope.mensajeErrorIncompleto = false;
      }

    })
    .controller('eliminarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate,$stateParams,$location, config) {
      console.log('eliminar');
      $scope.id = $stateParams.ID;
      console.log($scope.id);
      
      $scope.alumnos = JSON.parse(sessionStorage.getItem('alumnos'));
      
      //$scope.alumnos[$scope.id].fechaNacimiento = new Date($scope.alumnos[$scope.id].fechaNacimiento);
      
      $scope.alumnoElegido =  $scope.alumnos[$scope.id];
      console.log($scope.alumnoElegido);

      $scope.eliminarUsuario = function(){
            var esp = $scope.alumnoElegido;
            var indexUsuario = esp.indexUsuario;
            var indexalumnoDatos = esp.indexalumnoDatos;


            $scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
            $scope.alumnosDatos = JSON.parse(sessionStorage.getItem('alumnosDatos'));
            $scope.alumnos = JSON.parse(sessionStorage.getItem('alumnos'));

            $scope.alumnos.splice($scope.id, 1);
            sessionStorage.setItem('alumnos', JSON.stringify($scope.alumnos));

            $scope.alumnosDatos.splice(indexalumnoDatos, 1);
            sessionStorage.setItem('alumnosDatos', JSON.stringify($scope.alumnosDatos));

            $scope.usuarios.splice(indexUsuario, 1);
            sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));

            $location.path("/listado_alumnos");

           
      }

      $scope.volver = function(){
           
            $location.path("/listado_alumnos");

      }



    });
     
