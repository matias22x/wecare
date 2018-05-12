var app = angular.module("primerApp",[]);


app.controller('abmControlador', function($scope,$window){

		$scope.usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
		if(!$scope.usuarios){
			$scope.usuarios=[];
		}

		console.log($scope.usuarios);

		$scope.index = 0;

		$scope.nuevoUsuario = {};

		$scope.usuarioModificado = {};

		$scope.agregarUsuario = function(){

				var nuevo = {
						usuario: $scope.nuevoUsuario.usuario,
						clave: $scope.nuevoUsuario.clave
				};
				var usuarioNuevo = $scope.nuevoUsuario;


				if(usuarioNuevo.usuario  && usuarioNuevo.clave){
						$scope.usuarios.push(nuevo);
						sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));
						$scope.nuevoUsuario.usuario = "";
						$scope.nuevoUsuario.clave = "";
				}else{
					 	$window.alert('faltan datos');
				}
			
		}

		$scope.eliminarUsuario = function(codigo){
				 $scope.usuarios.splice(codigo, 1);
				 sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));
		}

		$scope.mostrarModificar = function(codigo){
				$scope.index = codigo;
				var temporal = {
						usuario: $scope.usuarios[codigo].usuario,
						clave: $scope.usuarios[codigo].clave
				};
				$scope.usuarioModificado = temporal;
				$scope.divModificar = true;
		}


		$scope.modificarUsuario = function(){
				$scope.usuarios[$scope.index].usuario = $scope.usuarioModificado.usuario;
				$scope.usuarios[$scope.index].clave = $scope.usuarioModificado.clave;
				$scope.index = 0;
				$scope.divModificar = false;
				$scope.usuarioModificado = {};
				sessionStorage.setItem('usuarios', JSON.stringify($scope.usuarios));
		}



	
});