'use strict';
angular.module('wecareApp')
    .controller('homeAdminController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {
      userService.estadisticas()
      .then(function(resp) {
        $scope.datos = resp.data.data;
        $scope.datos.gravedadPromedio = $scope.datos.gravedadPromedio.toFixed(2);
      }).catch($log.error);

    })
  .controller('userAdminController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {
    console.log('user');
    $scope.usuario = userData.get('user');
    $scope.usuario.createdAt = $filter('date')($scope.usuario.createdAt, "dd-MM-yyyy");
    $scope.usuario.updatedAt = $filter('date')($scope.usuario.updatedAt, "dd-MM-yyyy");
    $scope.contraseniaNueva= "";
    $scope.contraseniaNuevaBis= "";
    $scope.passwordError = false;
    $scope.emailErrorMensaje = "";
    console.log($scope.usuario);
    $scope.cambiarClave = function(){
      if($scope.contraseniaNueva==$scope.contraseniaNuevaBis && $scope.contraseniaNueva && $scope.contraseniaNueva.length>8){
        $scope.usuario.password=$scope.contraseniaNuevaBis;
        $scope.usuario.updatedAt = new Date();
        $scope.usuario.createdAt = new Date($scope.usuario.createdAt);
        userService.putUserById($scope.usuario._id, $scope.usuario)
          .then(function(resp) {
            console.log('LISTO', resp);
            $scope.passwordCorrecto = true;
            $scope.contraseniaCorrectoMensaje = "La contraseña cambio satisfactoriamente";
          }).catch($log.error);
      }else{
        $scope.passwordError = true;
         if (!$scope.contraseniaNueva){
          $scope.contraseniaErrorMensaje = "la contraseña no puede estar vacia y debe ser mayor a 8 caracteres";
        }else if($scope.contraseniaNueva.length<8){
          $scope.contraseniaErrorMensaje = "La contraseña es demasiado corta, debe ser mayor a 8 caracteres";
        }else{
          $scope.contraseniaErrorMensaje = "Las contraseñas no coinciden";
        }

      }

    }
  })
  .controller('listadoAlumnosController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, alumnoService, userService) {

    $scope.paginInit = function(lista) {

      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }

      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);

      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }

      $scope.page = [];

      for (var i = 0; i < $scope.cantRegistros; i++) {
        if (lista[i] != null) {
          $scope.page.push(lista[i]);
        }
      }
    }


    $scope.filtrar = function(palabra) {
      $scope.listadoAlumnos = [];
      angular.forEach($scope.listaCompleta, function(value, key) {
        if (value.dni.toLowerCase().includes(palabra.toLowerCase()) || value.nombre.toLowerCase().includes(palabra.toLowerCase())
             || (value.curso && value.curso.toLowerCase().includes(palabra.toLowerCase()))) {
          $scope.listadoAlumnos.push(value);
        }

        $scope.paginInit($scope.listadoAlumnos);
      })
    }


    alumnoService.getAllAlumnos()
      .then(function(alumnos) {
        $scope.listaCompleta = [];
        angular.forEach(alumnos.data, function(value, key) {
          userService.getUser(value.user)
            .then(function(usuario) {
              value.habilitado = usuario.data.habilitado;
            }).catch($log.error);
            $scope.listaCompleta.push(value);
        })
        $scope.listadoAlumnos = $scope.listaCompleta;
        $scope.paginInit($scope.listadoAlumnos);
      }).catch($log.error);

    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];

      for (var i = desde; i < hasta; i++) {
        if (lista[i] != null) {
          $scope.page.push(lista[i]);
        }

      }
    }

    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.antPag = function(lista) {
      if ($scope.pagActual - 1 > 0) {
        $scope.pagActual = $scope.pagActual - 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.selectToDisable = function(objeto) {
      $scope.datosADeshabilitar = objeto;
    }

    $scope.deshabilitar = function() {
      var cambio;
      userService.getUser($scope.datosADeshabilitar.user)
      .then(function(userADeshabilitar) {
        $scope.userADeshabilitar = userADeshabilitar.data;
        if ($scope.userADeshabilitar.habilitado === true) {
          $scope.userADeshabilitar.habilitado = false;
          cambio = false;
        } else {
          $scope.userADeshabilitar.habilitado = true;
          cambio = true;
        }
        return userService.putUserById($scope.userADeshabilitar._id, $scope.userADeshabilitar);
      })
      .then(function(userDeshabilitado) {
          $state.reload();
      })
      .catch($log.error);
    }

  })
  .controller('agregarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $filter, $log, $http, $translate, $location, config, alumnoService, userService, moment) {
    $scope.alumnoNuevo = {};
    $scope.usuario = {};
    $scope.alumnoDatos = {};
    $scope.alumno = {};
    $scope.hoy = new Date();

    $scope.validadInput = function(input, mensaje, show, min = null, max = null, valido = null){
      var keys = Object.keys(input.$error);
      var len = keys.length;
      if(len != 0){
        for (var first in input.$error) break;
        var error = first;
        switch (error) {
          case 'required':
            $scope[mensaje] = "Este campo es requerido";
            break;
          case 'minlength':
            $scope[mensaje] = "Este campo debe ser mayor a "+ min +" caracteres";
            break;
          case 'email':
            $scope[mensaje]  = "Debe ingresar un email valido";
            break;
          case 'pattern':
            $scope[mensaje]  = "Los datos ingresados no son validos, solo se permiten "+ valido;
            break;
          case 'min':
            $scope[mensaje]  = "El valor ingresado no puede ser menor a "+ min;
            break;
          case 'max':
            $scope[mensaje]  = "El valor ingresado no puede ser mayor a "+max;
            break;
          default:
        }
        $scope[show] =true;
      }
    }


    $scope.submit = function() {
      if(!$scope.form.$valid){

        $scope.validadInput($scope.form.username, 'usernameErrorMensaje', 'usernameError', 4, null, 'letras y espacios');
        $scope.validadInput($scope.form.email, 'emailErrorMensaje', 'emailError', null, null, null);
        $scope.validadInput($scope.form.dni, 'dniErrorMensaje', 'dniError', 1000000, 100000000);
        $scope.validadInput($scope.form.nombre, 'nombreErrorMensaje', 'nombreError', 4, null, 'letras y espacios');
        $scope.validadInput($scope.form.curso, 'cursoErrorMensaje', 'cursoError', 2, null, 'letras, numeros, espacios, guiones, indicadores ordinales y puntos');
        $scope.validadInput($scope.form.direccion, 'direccionErrorMensaje', 'direccionError', 4, null, 'letras, espacios y numeros');
        $scope.validadInput($scope.form.telefono, 'telefonoErrorMensaje', 'telefonoError', 10000000, 10000000000000, 'numeros');
        $scope.validadInput($scope.form.fechaNacimiento, 'fechaNacimientoErrorMensaje', 'fechaNacimientoError', "01-01-1900", $filter('date')($scope.hoy, "dd-MM-yyyy"));
        $scope.validadInput($scope.form.password, 'passwordErrorMensaje', 'passwordError', 4, null, 'letras, nuemros, espacios, guion bajo, guion alto y puntos');

      }else{
        var esp = $scope.alumnoNuevo;

        $scope.usuario.username = esp.username;
        $scope.usuario.password = esp.password;
        $scope.usuario.email = esp.email;
        $scope.usuario.telefono = esp.telefono;
        $scope.usuario.tipo = 'alumno'

        $scope.alumnoDatos.dni = esp.dni;
        $scope.alumnoDatos.nombre = esp.nombre;
        $scope.alumnoDatos.direccion = esp.direccion;
        $scope.alumnoDatos.curso = esp.curso;
        $scope.alumnoDatos.fecha_nacimiento = esp.fecha_nacimiento;

        userService.postUser($scope.usuario)
          .then(function(user) {
            $scope.alumnoDatos.user = user.data;
            $scope.alumnoDatos.user = user.data._id;
            return alumnoService.postAlumno($scope.alumnoDatos);
          }).then(function(alumno) {
            $location.path("/admin_listado_alumnos");
          }).catch($log.error);

      }

    }


  })
  .controller('editarAlumnosController', function($auth, $scope, $rootScope, $state, userData,$filter, $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {

    var id = $stateParams.id;

    alumnoService.getAlumno(id)
      .then(function(alumnoAModificar) {
        $scope.alumno = alumnoAModificar.data;
        $scope.alumno.dni= parseInt($scope.alumno.dni);
        $scope.alumno.fecha_nacimiento = new Date($scope.alumno.fecha_nacimiento);
        userService.getUser($scope.alumno.user)
          .then(function(usuarioAModificar) {
            $scope.usuario = usuarioAModificar.data;
            $scope.usuario.telefono= parseInt($scope.usuario.telefono);
            $scope.usuario.createdAt = new Date($scope.usuario.createdAt);
            $scope.usuario.updatedAt = new Date();
          }).catch($log.error);
      }).catch($log.error);


      $scope.validadInput = function(input, mensaje, show, min = null, max = null, valido = null){
        var keys = Object.keys(input.$error);
        var len = keys.length;
        if(len != 0){
          for (var first in input.$error) break;
          var error = first;
          switch (error) {
            case 'required':
              $scope[mensaje] = "Este campo es requerido";
              break;
            case 'minlength':
              $scope[mensaje] = "Este campo debe ser mayor a "+ min +" caracteres";
              break;
            case 'email':
              $scope[mensaje]  = "Debe ingresar un email valido";
              break;
            case 'pattern':
              $scope[mensaje]  = "Los datos ingresados no son validos, solo se permiten "+ valido;
              break;
            case 'min':
              $scope[mensaje]  = "El valor ingresado no puede ser menor a "+ min;
              break;
            case 'max':
              $scope[mensaje]  = "El valor ingresado no puede ser mayor a "+max;
              break;
            default:
          }
          $scope[show] =true;
        }
      }

      $scope.submit = function() {
        if(!$scope.form.$valid){
          $scope.validadInput($scope.form.dni, 'dniErrorMensaje', 'dniError', 1000000, 100000000);
          $scope.validadInput($scope.form.nombre, 'nombreErrorMensaje', 'nombreError', 4, null, 'letras y espacios');
          $scope.validadInput($scope.form.curso, 'cursoErrorMensaje', 'cursoError', 2, null, 'letras, numeros, espacios, guiones, indicadores ordinales y puntos');
          $scope.validadInput($scope.form.direccion, 'direccionErrorMensaje', 'direccionError', 4, null, 'letras, espacios y numeros');
          $scope.validadInput($scope.form.telefono, 'telefonoErrorMensaje', 'telefonoError', 10000000, 10000000000000, 'numeros');
          $scope.validadInput($scope.form.fechaNacimiento, 'fechaNacimientoErrorMensaje', 'fechaNacimientoError', "01-01-1900", $filter('date')($scope.hoy, "dd-MM-yyyy"));
        }else{
          alumnoService.putAlumnoById($scope.alumno._id, $scope.alumno)
            .then(function(resp) {
                  console.log('LISTO', resp);
                  userService.putUserById($scope.usuario._id, $scope.usuario)
                    .then(function(usuarioModificado) {
                      console.log('LISTO',usuarioModificado);
                      $location.path("/admin_listado_alumnos");
                    }).catch($log.error);
            }).catch($log.error);
        }
}

  })
  .controller('verAlumnosController', function($auth, $scope, $rootScope, $state, userData, $filter, $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {
    var id = $stateParams.id;

    alumnoService.getAlumno(id)
      .then(function(alumno) {
        $scope.alumno = alumno.data;
        $scope.alumno.fecha_nacimiento = $filter('date')(new Date($scope.alumno.fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy");;

        userService.getUser($scope.alumno.user)
          .then(function(user) {
            console.log(user);
            $scope.user = user.data;
            $scope.user.createdAt = $filter('date')(new Date($scope.user.createdAt), "EEEE d 'de' LLLL 'de' yyyy");
            $scope.user.updatedAt = $filter('date')(new Date($scope.user.updatedAt), "EEEE d 'de' LLLL 'de' yyyy");
          }).catch($log.error);
      }).catch($log.error);

  })
  .controller('borrarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $filter,  $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {

    var id = $stateParams.id;

    alumnoService.getAlumno(id)
      .then(function(alumnoABorrar) {
        $scope.alumno = alumnoABorrar.data;
        $scope.alumno.fecha_nacimiento = $filter('date')(new Date($scope.alumno.fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy");
        userService.getUser($scope.alumno.user)
          .then(function(user) {
            $scope.user = user.data;
          }).catch($log.error);
      }).catch($log.error);

    $scope.borrarAlumno = function() {
      $scope.user.habilitado = false;
      userService.putUserById($scope.user._id, $scope.user)
        .then(function(usuarioModificado) {
          console.log('LISTO',usuarioModificado);
          $location.path("/admin_listado_alumnos");
        }).catch($log.error);
    };
  })
  .controller('habilitarAlumnosController', function($auth, $scope, $rootScope, $state, userData, $filter,  $log, $http, $translate, $stateParams, $location, config, alumnoService, userService) {

    var id = $stateParams.id;

    alumnoService.getAlumno(id)
      .then(function(alumnoABorrar) {
        $scope.alumno = alumnoABorrar.data;
        $scope.alumno.fecha_nacimiento = $filter('date')(new Date($scope.alumno.fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy");
        userService.getUser($scope.alumno.user)
          .then(function(user) {
            $scope.user = user.data;
          }).catch($log.error);
      }).catch($log.error);

    $scope.habilitarAlumno = function() {
      $scope.user.habilitado = true;
      userService.putUserById($scope.user._id, $scope.user)
        .then(function(usuarioModificado) {
          console.log('LISTO',usuarioModificado);
          $location.path("/admin_listado_alumnos");
        }).catch($log.error);
    };
  })
  .controller('listadoEspecialistasController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, config, especialistaService, userService) {
    $scope.paginInit = function(lista) {

      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }

      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);

      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }

      $scope.page = [];

      for (var i = 0; i < $scope.cantRegistros; i++) {
        if (lista[i] != null) {
          //lista[i].fecha_nacimiento = $filter('date')(new Date(lista[i].fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy")
          $scope.page.push(lista[i]);
        }
      }
    }


    $scope.filtrar = function(palabra) {
      $scope.listadoEspecialistas = [];
      angular.forEach($scope.listaCompleta, function(value, key) {
        if (value.dni.toLowerCase().includes(palabra.toLowerCase()) || value.nombre.toLowerCase().includes(palabra.toLowerCase())) {
          $scope.listadoEspecialistas.push(value);
        }

        $scope.paginInit($scope.listadoEspecialistas);
      })
    }

      especialistaService.getAllEspecialistas()
        .then(function(especialistas) {
          $scope.listaCompleta = [];
          angular.forEach(especialistas.data, function(value, key) {
            userService.getUser(value.user)
              .then(function(usuario) {
                value.habilitado = usuario.data.habilitado;
              }).catch($log.error);
              $scope.listaCompleta.push(value);
          })
          $scope.listadoEspecialistas = $scope.listaCompleta;
          console.log($scope.listadoEspecialistas);
          $scope.paginInit($scope.listadoEspecialistas);
        }).catch($log.error);

    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];

      for (var i = desde; i < hasta; i++) {
        if (lista[i] != null) {
          $scope.page.push(lista[i]);
        }

      }
    }

    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.antPag = function(lista) {
      if ($scope.pagActual - 1 > 0) {
        $scope.pagActual = $scope.pagActual - 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.selectToDisable = function(objeto) {
      $scope.datosADeshabilitar = objeto;
    }

    $scope.deshabilitar = function() {
      var cambio;
      userService.getUser($scope.datosADeshabilitar.user)
      .then(function(userADeshabilitar) {
        $scope.userADeshabilitar = userADeshabilitar.data;
        if ($scope.userADeshabilitar.habilitado === true) {
          $scope.userADeshabilitar.habilitado = false;
          cambio = false;
        } else {
          $scope.userADeshabilitar.habilitado = true;
          cambio = true;
        }
        return userService.putUserById($scope.userADeshabilitar._id, $scope.userADeshabilitar);
      })
      .then(function(userDeshabilitado) {
          $state.reload();
      })
      .catch($log.error);
    }

  })
  .controller('agregarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $filter, $log, $http, $translate, $location, config, especialistaService, userService, moment) {
    $scope.especialistaNuevo = {};
    $scope.usuario = {};
    $scope.especialistaDatos = {};
    $scope.especialista = {};
    $scope.hoy = new Date();

    $scope.validadInput = function(input, mensaje, show, min = null, max = null, valido = null){
      var keys = Object.keys(input.$error);
      var len = keys.length;
      if(len != 0){
        for (var first in input.$error) break;
        var error = first;
        switch (error) {
          case 'required':
            $scope[mensaje] = "Este campo es requerido";
            break;
          case 'minlength':
            $scope[mensaje] = "Este campo debe ser mayor a "+ min +" caracteres";
            break;
          case 'email':
            $scope[mensaje]  = "Debe ingresar un email valido";
            break;
          case 'pattern':
            $scope[mensaje]  = "Los datos ingresados no son validos, solo se permiten "+ valido;
            break;
          case 'min':
            $scope[mensaje]  = "El valor ingresado no puede ser menor a "+ min;
            break;
          case 'max':
            $scope[mensaje]  = "El valor ingresado no puede ser mayor a "+max;
            break;
          default:
        }
        $scope[show] =true;
      }
    }


    $scope.submit = function() {
      if(!$scope.form.$valid){

        $scope.validadInput($scope.form.username, 'usernameErrorMensaje', 'usernameError', 4, null, 'letras y espacios');
        $scope.validadInput($scope.form.email, 'emailErrorMensaje', 'emailError', null, null, null);
        $scope.validadInput($scope.form.dni, 'dniErrorMensaje', 'dniError', 1000000, 100000000);
        $scope.validadInput($scope.form.nombre, 'nombreErrorMensaje', 'nombreError', 4, null, 'letras y espacios');
        $scope.validadInput($scope.form.direccion, 'direccionErrorMensaje', 'direccionError', 4, null, 'letras, espacios y numeros');
        $scope.validadInput($scope.form.telefono, 'telefonoErrorMensaje', 'telefonoError', 10000000, 10000000000000, 'numeros');
        $scope.validadInput($scope.form.fechaNacimiento, 'fechaNacimientoErrorMensaje', 'fechaNacimientoError', "01-01-1900", $filter('date')($scope.hoy, "dd-MM-yyyy"));
        $scope.validadInput($scope.form.password, 'passwordErrorMensaje', 'passwordError', 4, null, 'letras, nuemros, espacios, guion bajo, guion alto y puntos');

      }else{
        var esp = $scope.especialistaNuevo;

          $scope.usuario.username = esp.username;
          $scope.usuario.password = esp.password;
          $scope.usuario.email = esp.email;
          $scope.usuario.telefono = esp.telefono;
          $scope.usuario.tipo = 'especialista'

          $scope.especialistaDatos.dni = esp.dni;
          $scope.especialistaDatos.nombre = esp.nombre;
          $scope.especialistaDatos.direccion = esp.direccion;
          $scope.especialistaDatos.fecha_nacimiento = esp.fecha_nacimiento;

          userService.postUser($scope.usuario)
            .then(function(user) {
              $scope.especialistaDatos.user = user.data;
              $scope.especialistaDatos.user = user.data._id;
              return especialistaService.postEspecialista($scope.especialistaDatos);
            }).then(function(especialista) {
              $location.path("/admin_listado_especialistas");
            }).catch($log.error);

      }

    }

  })
  .controller('editarEspecialistasController', function($auth, $scope, $rootScope, $state, userData, $log, $filter, $http, $translate, $stateParams, $location, config, especialistaService, userService) {

    var id = $stateParams.id;
    $scope.hoy = new Date();

    especialistaService.getEspecialista(id)
      .then(function(especialistaAModificar) {
        $scope.especialista = especialistaAModificar.data;
        $scope.especialista.dni= parseInt($scope.especialista.dni);
        $scope.especialista.fecha_nacimiento = new Date($scope.especialista.fecha_nacimiento);
        userService.getUser($scope.especialista.user)
          .then(function(usuarioAModificar) {
            $scope.usuario = usuarioAModificar.data;
            $scope.usuario.telefono= parseInt($scope.usuario.telefono);
            $scope.usuario.createdAt = new Date($scope.usuario.createdAt);
            $scope.usuario.updatedAt = new Date();
          }).catch($log.error);
      }).catch($log.error);

      $scope.validadInput = function(input, mensaje, show, min = null, max = null, valido = null){
        var keys = Object.keys(input.$error);
        var len = keys.length;
        if(len != 0){
          for (var first in input.$error) break;
          var error = first;
          switch (error) {
            case 'required':
              $scope[mensaje] = "Este campo es requerido";
              break;
            case 'minlength':
              $scope[mensaje] = "Este campo debe ser mayor a "+ min +" caracteres";
              break;
            case 'email':
              $scope[mensaje]  = "Debe ingresar un email valido";
              break;
            case 'pattern':
              $scope[mensaje]  = "Los datos ingresados no son validos, solo se permiten "+ valido;
              break;
            case 'min':
              $scope[mensaje]  = "El valor ingresado no puede ser menor a "+ min;
              break;
            case 'max':
              $scope[mensaje]  = "El valor ingresado no puede ser mayor a "+max;
              break;
            default:
          }
          $scope[show] =true;
        }
      }

      $scope.submit = function() {
        if(!$scope.form.$valid){
          $scope.validadInput($scope.form.dni, 'dniErrorMensaje', 'dniError', 1000000, 100000000);
          $scope.validadInput($scope.form.nombre, 'nombreErrorMensaje', 'nombreError', 4, null, 'letras y espacios');
          $scope.validadInput($scope.form.direccion, 'direccionErrorMensaje', 'direccionError', 4, null, 'letras, espacios y numeros');
          $scope.validadInput($scope.form.telefono, 'telefonoErrorMensaje', 'telefonoError', 10000000, 10000000000000, 'numeros');
          $scope.validadInput($scope.form.fechaNacimiento, 'fechaNacimientoErrorMensaje', 'fechaNacimientoError', "01-01-1900", $filter('date')($scope.hoy, "dd-MM-yyyy"));
        }else{
          especialistaService.putEspecialistaById($scope.especialista._id, $scope.especialista)
            .then(function(resp) {
              console.log('LISTO', resp);
              userService.putUserById($scope.usuario._id, $scope.usuario)
                .then(function(usuarioModificado) {
                  console.log('LISTO',usuarioModificado);
                  $location.path("/admin_listado_especialistas");
                }).catch($log.error);
            }).catch($log.error);
        }
}

  })
  .controller('verEspecialistasController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService) {
    var id = $stateParams.id;

    especialistaService.getEspecialista(id)
      .then(function(especialista) {
        $scope.especialista = especialista.data;
        $scope.especialista.fecha_nacimiento = $filter('date')(new Date($scope.especialista.fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy");

        userService.getUser($scope.especialista.user)
          .then(function(user) {
            $scope.user = user.data;
            $scope.user.createdAt = $filter('date')(new Date($scope.user.createdAt), "EEEE d 'de' LLLL 'de' yyyy");
            $scope.user.updatedAt = $filter('date')(new Date($scope.user.updatedAt), "EEEE d 'de' LLLL 'de' yyyy");
          }).catch($log.error);
      }).catch($log.error);

  })
  .controller('borrarEspecialistasController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService) {

    var id = $stateParams.id;

    especialistaService.getEspecialista(id)
      .then(function(especialistaABorrar) {
        $scope.especialista = especialistaABorrar.data;
        $scope.especialista.fecha_nacimiento = $filter('date')(new Date($scope.especialista.fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy");
      }).catch($log.error);

    $scope.borrarEspecialista = function() {
      var id = $scope.especialista._id;
      var userId = $scope.especialista.user;
      especialistaService.deleteEspecialistaById(id)
        .then(function() {
          console.log('userId', userId);
          return userService.deleteUserById(userId);
        })
        .then(function(userEliminado) {
          console.log(userEliminado.data);
          console.log('LISTO', userEliminado);
          $location.path("/admin_listado_especialistas");
        })
        .catch($log.error);

    };
  }).controller('listadoConsejosController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, config, consejosService, userService) {



    $scope.paginInit = function(lista) {

      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }

      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);

      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }

      $scope.page = [];

      for (var i = 0; i < $scope.cantRegistros; i++) {
        if (lista[i] != null) {
          //lista[i].fecha_nacimiento = $filter('date')(new Date(lista[i].fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy")
          $scope.page.push(lista[i]);
        }
      }
    }


    $scope.filtrar = function(palabra) {
      $scope.listadoConsejos = [];
      angular.forEach($scope.listaCompleta, function(value, key) {
        if (value.titulo.toLowerCase().includes(palabra.toLowerCase()) || value.descripcion.toLowerCase().includes(palabra.toLowerCase())) {
          $scope.listadoConsejos.push(value);
        }

        $scope.paginInit($scope.listadoConsejos);
      })
    }

    consejosService.getAllConsejos()
      .then(function(consejo) {
        console.log(consejo);
        $scope.listaCompleta = consejo.data;
        $scope.listadoConsejos = consejo.data;

        $scope.paginInit($scope.listadoConsejos);

      }).catch($log.error);

    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];

      for (var i = desde; i < hasta; i++) {
        if (lista[i] != null) {
          $scope.page.push(lista[i]);
        }

      }
    }

    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.antPag = function(lista) {
      if ($scope.pagActual - 1 > 0) {
        $scope.pagActual = $scope.pagActual - 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }



  })
  .controller('agregarConsejosController', function($auth, $scope, $rootScope, $state, userData, $filter, $log, $http, $translate, $location, config, consejosService, userService, moment) {
    $scope.consejoNuevo = {};
    $scope.consejo = {};

    $scope.submit = function() {
        var esp = $scope.consejoNuevo;

          $scope.consejo.titulo = esp.titulo;
          $scope.consejo.descripcion = esp.descripcion;

          consejosService.postConsejos($scope.consejo)
            .then(function(resp) {
              $location.path("/admin_listado_consejos");
            }).catch($log.error);

    }

  })
  .controller('editarConsejosController', function($auth, $scope, $rootScope, $state, userData, $log, $filter, $http, $translate, $stateParams, $location, config, consejosService, userService) {

    var id = $stateParams.id;

    consejosService.getConsejos(id)
      .then(function(consejoAModificar) {
        $scope.consejo = consejoAModificar.data;
      }).catch($log.error);


      $scope.submit = function() {

          consejosService.putConsejosById($scope.consejo._id, $scope.consejo)
            .then(function(resp) {
              console.log('LISTO', resp);
              $location.path("/admin_listado_consejos");
            }).catch($log.error);

}

  })
  .controller('verConsejosController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, $stateParams, $location, config, consejosService, userService) {
    var id = $stateParams.id;

    consejosService.getConsejos(id)
      .then(function(consejo) {
        $scope.consejo = consejo.data;
      }).catch($log.error);

  })
  .controller('borrarConsejosController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, $stateParams, $location, config, consejosService, userService) {

    var id = $stateParams.id;

    consejosService.getConsejos(id)
      .then(function(consejoABorrar) {
        $scope.consejo = consejoABorrar.data;
      }).catch($log.error);

    $scope.borrarConsejo = function() {
      var id = $scope.consejo._id;
      consejosService.deleteConsejosById(id)
        .then(function(consejoEliminado) {
          console.log(consejoEliminado.data);
          console.log('LISTO', consejoEliminado);
          $location.path("/admin_listado_consejos");
        })
        .catch($log.error);

    };
  })
  .controller('listadoNoticiasController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, config, especialistaService, userService, noticiasService) {

    $scope.paginInit = function(lista) {

      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }

      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);

      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }

      $scope.page = [];

      for (var i = 0; i < $scope.cantRegistros; i++) {
        if (lista[i] != null) {
          //lista[i].fecha_nacimiento = $filter('date')(new Date(lista[i].fecha_nacimiento), "EEEE d 'de' LLLL 'de' yyyy")
          $scope.page.push(lista[i]);
        }
      }
    }

    $scope.filtrar = function(palabra) {
      $scope.listadoNoticias = [];
      angular.forEach($scope.listaCompleta, function(value, key) {
        if (value.dni.toLowerCase().includes(palabra.toLowerCase()) || value.nombre.toLowerCase().includes(palabra.toLowerCase())) {
          $scope.listadoNoticias.push(value);
        }

        $scope.paginInit($scope.listadoNoticias);
      })
    }

    noticiasService.getAllNoticias()
      .then(function(noticias) {
        $scope.listaCompleta = noticias.data;
        $scope.listadoNoticias = noticias.data;

        $scope.paginInit($scope.listadoNoticias);

      }).catch($log.error);

    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];

      for (var i = desde; i < hasta; i++) {
        if (lista[i] != null) {
          $scope.page.push(lista[i]);
        }

      }
    }

    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }

    $scope.antPag = function(lista) {
      if ($scope.pagActual - 1 > 0) {
        $scope.pagActual = $scope.pagActual - 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];

        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }

        }
      }

    }



  })
  .controller('agregarNoticiasController', function($auth, $scope, $rootScope, $state, userData, $filter, $log, $http, $translate, $location, config, especialistaService, userService, moment, noticiasService) {
    $scope.noticiaNueva = {};

    $scope.submit = function() {
          noticiasService.postNoticias($scope.noticiaNueva)
            .then(function(user) {
              $location.path("/admin_listado_noticias");
            }).catch($log.error);


    }

  })
  .controller('editarNoticiasController', function($auth, $scope, $rootScope, $state, userData, $log, $filter, $http, $translate, $stateParams, $location, config, especialistaService, userService, noticiasService) {

    var id = $stateParams.id;
    $scope.hoy = new Date();

    noticiasService.getNoticias(id)
      .then(function(noticiaAModificar) {
        $scope.noticia = noticiaAModificar.data;
        console.log($scope.noticia);
      }).catch($log.error);


      $scope.submit = function() {

        noticiasService.putNoticiasById($scope.noticia._id, $scope.noticia)
          .then(function(resp) {
              $location.path("/admin_listado_noticias");
          }).catch($log.error);
      }

  })
  .controller('verNoticiasController', function($auth, $scope, $rootScope, $state, $filter, userData, $log, $http, $translate, $stateParams, $location, config, especialistaService, userService, noticiasService) {
    var id = $stateParams.id;

    noticiasService.getNoticias(id)
      .then(function(noticia) {
        $scope.noticia = noticia.data;
      }).catch($log.error);

  });
