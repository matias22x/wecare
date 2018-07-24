'use strict';
angular.module('wecareApp')
  .controller('especialistaUserController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, $stateParams, $location, config, userService) {

    $scope.usuario = userData.get('user');
    $scope.especialista = userData.get('datosRol');
    $scope.especialista.fecha_nacimiento = $filter('date')($scope.especialista.fecha_nacimiento, "dd-MM-yyyy");
    $scope.contraseniaNueva = "";
    $scope.contraseniaNuevaBis = "";
    $scope.passwordError = false;
    $scope.emailErrorMensaje = "";
    $scope.cambiarClave = function() {
      if ($scope.contraseniaNueva == $scope.contraseniaNuevaBis && $scope.contraseniaNueva && $scope.contraseniaNueva.length > 8) {
        $scope.usuario.password = $scope.contraseniaNuevaBis;
        $scope.usuario.updatedAt = new Date();
        userService.putUserById($scope.usuario._id, $scope.usuario)
          .then(function(resp) {

            $scope.passwordCorrecto = true;
            $scope.contraseniaCorrectoMensaje = "Las contraseñas cambio satisfactoriamente";
          }).catch($log.error);
      } else {
        $scope.passwordError = true;
        if (!$scope.contraseniaNueva) {
          $scope.contraseniaErrorMensaje = "la contraseña no puede estar vacia y debe ser mayor a 8 caracteres";
        } else if ($scope.contraseniaNueva.length < 8) {
          $scope.contraseniaErrorMensaje = "La contraseña es demasiado corta, debe ser mayor a 8 caracteres";
        } else {
          $scope.contraseniaErrorMensaje = "Las contraseñas no coinciden";
        }

      }
    }
  })
  .controller('especialistaHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, consejosService, userService) {
    consejosService.getAllConsejos()
    .then(function(resp) {
      $scope.consejos = resp.data;
    }).catch($log.error);

  })
  .controller('especialistaAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, turnoService, alumnoService) {
    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }
      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      if(lista && lista.length>0){
        $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);
      }else{
        $scope.paginas = 1;
      }
      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }
      $scope.page = [];
      if(lista){
        for (var i = 0; i < $scope.cantRegistros; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];
      if(lista){
        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
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
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
    }


    $scope.turnosDeHoy = {};
    $scope.turnos = {};

    turnoService.getTurnosdeHoyEspecialista(userData.get('datosRol')._id)
      .then(function(turnosDeHoy) {
        $scope.turnosDeHoy = turnosDeHoy.data;
        Object.keys($scope.turnosDeHoy).forEach(function(key) {
          alumnoService.getAlumno($scope.turnosDeHoy[key].alumno)
            .then(function(alumno) {
              $scope.turnosDeHoy[key].alumnoDelTurno = alumno.data;
            }).catch($log.error);
        });
      })
      .catch($log.error);

    turnoService.getTurnosEspecialista(userData.get('datosRol')._id)
      .then(function(turnos) {
        $scope.turnosListaCompleta = turnos.data
        $scope.turnos = turnos.data;
        Object.keys($scope.turnos).forEach(function(key) {
          alumnoService.getAlumno($scope.turnos[key].alumno)
            .then(function(alumno) {
              $scope.turnos[key].alumnoDelTurno = alumno.data;
              $scope.turnosListaCompleta[key].alumnoDelTurno = alumno.data;
            }).catch($log.error);
        });
        $scope.paginInit($scope.turnos);
      })
      .catch($log.error);

      $scope.filtrar = function(desde, hasta, palabra) {
      $scope.turnos = [];
      if($scope.tiempo && $scope.tiempo.buscadorDesde){
        $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      }else{ $scope.desde = new Date("01-01-1970") }
      if($scope.tiempo && $scope.tiempo.buscadorHasta){
        $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      }else{ $scope.hasta = new Date("12-31-2099") }
      angular.forEach($scope.turnosListaCompleta, function(value, key) {
        value.horario = new Date(value.horario);
        if ( value.horario>=$scope.desde && value.horario<=$scope.hasta && ( value.alumnoDelTurno.dni.toLowerCase().includes(palabra.toLowerCase()) || value.alumnoDelTurno.nombre.toLowerCase().includes(palabra.toLowerCase())
             || (value.alumnoDelTurno.curso && value.alumnoDelTurno.curso.toLowerCase().includes(palabra.toLowerCase())) ) ) {
          $scope.turnos.push(value);
        }
        $scope.paginInit($scope.turnos);
      })
    }
  })
  .controller('especialistaDiagnosticosController', function($auth, $scope, $rootScope, $filter, $window, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
    $scope.loader=false;
    $scope.paginInit = function(lista) {

      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 5;
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

    $scope.especialista = userData.get('datosRol');
    $scope.informacion = {};
    $scope.diagnosticosPrematuros = [];
    diagnosticoPrematuroService.getAllDiagnosticosPrematuros()
      .then(function(resp) {
        angular.forEach(resp.data, function(value, key) {
          if (!$scope.especialista.diagnosticos_vistos.includes(value._id)) {
            $scope.diagnosticosPrematuros.push(value);
          };
        })
        $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "gravedad", true);
        $scope.paginInit($scope.diagnosticosPrematuros);
      }).catch($log.error);



    $scope.informacionAlumno = function(diagnostico) {
      $scope.informacion.diagnostico = diagnostico;
      alumnoService.getAlumnoByDni(diagnostico.dniAlumno)
        .then(function(alumno) {
          $scope.informacion.diagnostico.alumno = alumno.data[0];
          if ($scope.informacion.diagnostico.gravedad === 0) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Estable'
          } else if ($scope.informacion.diagnostico.gravedad > 0 && $scope.informacion.diagnostico.gravedad < 10) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Observar'
          } else if ($scope.informacion.diagnostico.gravedad > 10 && $scope.informacion.diagnostico.gravedad < 18) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Preocupante'
          } else if ($scope.informacion.diagnostico.gravedad > 15) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Urgente'
          }
        }).catch($log.error);
    }
    $scope.agregarAMisPacientes = function(idAlumno, idDiagnostico, datosNombre) {
      $scope.datos = {
        nombre: datosNombre,
        idAlumno: idAlumno,
        idDiagnostico: idDiagnostico
      }
    };

    $scope.guardarAMisPacientes = function(idAlumno, idDiagnostico, datosNombre) {
      $scope.loader=true;
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
        .then(function(diagnostico) {
          diagnostico.data.asignado = true;
          $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
          diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
            .then(function(diagnosticoPrematuro) {
              return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
            })
            .then(function() {
              $scope.cambiarDiagnosticoAVisto(idDiagnostico);
            }).catch($log.error);
        }).catch($log.error);

    }

    $scope.cambiarDiagnosticoAVisto = function(idDiagnostico) {
      $scope.loader=true;
      delete $scope.especialista.__v;
      $scope.especialista.diagnosticos_vistos.push(idDiagnostico);
      especialistaService.putEspecialistaById($scope.especialista._id, $scope.especialista)
      .then(function(respuesta) {
        $scope.diagnosticosPrematuros = [];
        diagnosticoPrematuroService.getAllDiagnosticosPrematuros()
          .then(function(resp) {
            angular.forEach(resp.data, function(value, key) {
              if (!$scope.especialista.diagnosticos_vistos.includes(value._id)) {
                $scope.diagnosticosPrematuros.push(value);
              };
            })
            $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "gravedad", true);
            if($scope.diagnosticosPrematuros){
              $scope.informacionAlumno($scope.diagnosticosPrematuros[0]);
            }else{
              $scope.informacion.diagnostico = null;
            }
            $scope.paginInit($scope.diagnosticosPrematuros);
            $scope.loader=false;
          }).catch($log.error);
      }).catch($log.error);
      userData.set('datosRol',$scope.especialista);

    };

  }).controller('especialistaDiagnosticosViejosController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
    $scope.loader=false;
    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 5;
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

    $scope.especialista = userData.get('datosRol');
    $scope.informacion = {};
    $scope.diagnosticosPrematuros = [];
    diagnosticoPrematuroService.getAllDiagnosticosPrematuros()
      .then(function(resp) {
        angular.forEach(resp.data, function(value, key) {
          if ($scope.especialista.diagnosticos_vistos.includes(value._id)) {
            $scope.diagnosticosPrematuros.push(value);
          };
        })
        $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "createdAt", true);
        $scope.paginInit($scope.diagnosticosPrematuros);
      }).catch($log.error);


    $scope.filtrarFecha = function(desde, hasta) {
      $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      diagnosticoPrematuroService.getAllDiagnosticosPrematurosVistosPorFecha($scope.desde, $scope.hasta)
        .then(function(resp) {
          $scope.diagnosticosPrematuros = resp.data;
          $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "createdAt", true);
          $scope.paginInit($scope.diagnosticosPrematuros);
        }).catch($log.error);

    }

    $scope.informacionAlumno = function(diagnostico) {
      $scope.informacion.diagnostico = diagnostico;
      alumnoService.getAlumnoByDni(diagnostico.dniAlumno)
        .then(function(alumno) {
          $scope.informacion.diagnostico.alumno = alumno.data[0];
          if ($scope.informacion.diagnostico.gravedad === 0) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Estable'
          } else if ($scope.informacion.diagnostico.gravedad > 0 && $scope.informacion.diagnostico.gravedad < 10) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Observar'
          } else if ($scope.informacion.diagnostico.gravedad > 10 && $scope.informacion.diagnostico.gravedad < 18) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Preocupante'
          } else if ($scope.informacion.diagnostico.gravedad > 15) {
            $scope.informacion.diagnostico.puntuacionDeGravedad = 'Urgente'
          }
        }).catch($log.error);
    }
    $scope.agregarAMisPacientes = function(idAlumno, idDiagnostico, datosNombre) {
      $scope.datos = {
        nombre: datosNombre,
        idAlumno: idAlumno,
        idDiagnostico: idDiagnostico
      }
    };

    $scope.guardarAMisPacientes = function(idAlumno, idDiagnostico) {
      $scope.loader=true;
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
        .then(function(diagnostico) {
          diagnostico.data.asignado = true;
          $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
          diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
            .then(function(diagnosticoPrematuro) {
              return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
            })
            .then(function() {
                $scope.informacion.diagnostico.asignado = true;
                $scope.loader=false;
            }).catch($log.error);
        }).catch($log.error);


    };



  })
  .controller('especialistaDiagnosticoVerController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaHistorialController', function($auth, $scope, $rootScope, $state, userData, $stateParams, $log, $http, $translate, config, especialistaService, userService, registrosService, alumnoService) {
    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 5;
      }
      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      if(lista && lista.length>0){
        $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);
      }else{
        $scope.paginas = 1;
      }
      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }
      $scope.page = [];
      if(lista){
        for (var i = 0; i < $scope.cantRegistros; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];
      if(lista){
        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
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
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
    }

    alumnoService.getAlumno($stateParams.id)
      .then(function(resp) {
        $scope.alumno = resp.data;
      }).catch($log.error);

    registrosService.getRegistrosPorPaciente($stateParams.id)
      .then(function(resp) {
        $scope.registros = resp.data;
        $scope.paginInit($scope.registros);
      }).catch($log.error);

    $scope.verRegistro = function(registro) {
      $scope.registroSeleccionado = registro;
    }

    $scope.filtrarFecha = function(desde, hasta, alumnoId) {
      $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      registrosService.getRegistrosPorPacientePorFecha($scope.desde, $scope.hasta, alumnoId)
        .then(function(resp) {
          $scope.registros = resp.data;
          $scope.paginInit($scope.registros)
        }).catch($log.error);
    }

  })
  .controller('especialistaEstadisticasController', function($auth, $scope, $rootScope, $state, userData, $stateParams, $log, $http, $translate, config, especialistaService, userService, registrosService, alumnoService) {


    alumnoService.getAlumno($stateParams.id)
      .then(function(resp) {
        $scope.alumno = resp.data;
      }).catch($log.error);
      var dateInicio = new Date('01-01-1970');
      var dateFin = new Date('12-12-2099');
      var data =JSON.stringify({alumno:$stateParams.id, inicio:dateInicio, fin:dateFin}) ;


      $http.post(config.api_url + '/estadisticaspaciente', data).success(function(data, status, headers, config) {
        $scope.estadisticas = data.data;
      })

    $scope.filtrarFecha = function(desde, hasta, alumnoId) {
      $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      var data =JSON.stringify({alumno:alumnoId, inicio:$scope.desde, fin:$scope.hasta}) ;

      $http.post(config.api_url + '/estadisticaspaciente', data).success(function(data, status, headers, config) {
        $scope.estadisticas = data.data;
        console.log($scope.estadisticas);
      })
    }

  })
  .controller('especialistaObservacionesController', function($auth, $scope, $rootScope, turnoService, alumnoService, $state, userData, $log, $http, $translate, config, especialistaService, userService, $stateParams) {
    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 5;
      }
      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      if(lista && lista.length>0){
        $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);
      }else{
        $scope.paginas = 1;
      }
      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }
      $scope.page = [];
      if(lista){
        for (var i = 0; i < $scope.cantRegistros; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];
      if(lista){
        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
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
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
    }

    turnoService.getTurnosAlumno($stateParams.id)
      .then(function(turno) {
        $scope.turnos = [];
        angular.forEach(turno.data, function(value, key) {
          if (value.sesion) {
            $scope.turnos.push(value);
          };
          $scope.paginInit($scope.turnos);
        })
      })
      .catch($log.error);

      alumnoService.getAlumno($stateParams.id)
      .then(function(alumno) {
        $scope.alumno = alumno.data;
      })
      .catch($log.error);

      $scope.verDatos = function(datos) {
        $scope.datos = datos;
      }

      $scope.filtrarFecha = function(desde, hasta, alumnoId) {
        $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
        $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
        turnoService.getTurnosAlumnoPorFecha($scope.desde, $scope.hasta, alumnoId)
          .then(function(resp) {
            $scope.turnos = [];
            angular.forEach(resp.data, function(value, key) {
              if (value.sesion) {
                $scope.turnos.push(value);
              };
              })
              $scope.paginInit($scope.turnos);
          }).catch($log.error);
      }
  })
  .controller('especialistaPacientesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, alumnoService) {
    $scope.paginInit = function(lista) {
      if (!$scope.cantRegistros) {
        $scope.cantRegistros = 10;
      }
      if (!$scope.pagActual) {
        $scope.pagActual = 1;
      }

      if(lista && lista.length>0){
        $scope.paginas = Math.ceil(lista.length / $scope.cantRegistros);
      }else{
        $scope.paginas = 1;
      }
      $scope.getNumber = function(num) {
        return new Array($scope.paginas);
      }
      $scope.page = [];
      if(lista){
        for (var i = 0; i < $scope.cantRegistros; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.cambiarPag = function(pag, lista) {
      $scope.pagActual = pag + 1;
      var hasta = $scope.pagActual * $scope.cantRegistros;
      var desde = hasta - $scope.cantRegistros;
      $scope.page = [];
      if(lista){
        for (var i = desde; i < hasta; i++) {
          if (lista[i] != null) {
            $scope.page.push(lista[i]);
          }
        }
      }
    }
    $scope.sigPag = function(lista) {
      if ($scope.pagActual + 1 <= $scope.paginas) {
        $scope.pagActual = $scope.pagActual + 1;
        var hasta = $scope.pagActual * $scope.cantRegistros;
        var desde = hasta - $scope.cantRegistros;
        $scope.page = [];
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
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
        if(lista){
          for (var i = desde; i < hasta; i++) {
            if (lista[i] != null) {
              $scope.page.push(lista[i]);
            }
          }
        }
      }
    }

    $scope.filtrar = function(palabra) {
      $scope.alumnosEspecialista = [];
      angular.forEach($scope.alumnosEspecialistaCompleta, function(value, key) {
        if (value.dni.toLowerCase().includes(palabra.toLowerCase()) || value.nombre.toLowerCase().includes(palabra.toLowerCase())
             || (value.curso && value.curso.toLowerCase().includes(palabra.toLowerCase()))) {
          $scope.alumnosEspecialista.push(value);
        }
        $scope.paginInit($scope.alumnosEspecialista);
      })
    }

    alumnoService.getAlumnoByEspecialistaId(userData.get('datosRol')._id)
      .then(function(dataAlumnos) {
        $scope.alumnosEspecialista = dataAlumnos.data;
        $scope.alumnosEspecialistaCompleta = dataAlumnos.data;
        console.log($scope.alumnosEspecialista);
        $scope.paginInit($scope.alumnosEspecialista);
      }).catch($log.error);

  })
  .controller('especialistaSesionController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, turnoService, alumnoService, $stateParams, $document) {
    var modalMjs = $document.find('#demoModal').modal();

    turnoService.getTurno($stateParams.id)
      .then(function(turno) {
        $scope.turno = turno.data;
        console.log($scope.turno);
        return alumnoService.getAlumno($scope.turno.alumno);
      })
      .then(function(alumno) {
        $scope.alumno = alumno.data;
      })
      .catch($log.error);

      $scope.finalizarSesion = function() {
        console.log($scope.turno);
        turnoService.putTurnoById($scope.turno._id, $scope.turno)
        .then(function(turnoModificado) {
            modalMjs.modal('open');
        }).catch($log.error);
      }

  })
  .controller('especialistaTurnoController', function($auth, $scope, $stateParams, $q, $rootScope, $state, userData, $document, $log, $http, $translate, config, moment, especialistaService, userService, alumnoService, turnoService) {
    $scope.turno = {};
    $scope.selector = {};
    var modalMjs = $document.find('#demoModal').modal();
    var modalError = $document.find('#errorModal').modal();
    var modalTurnoError = $document.find('#turnoErrorModal').modal();
    $scope.currentYear = new Date().getFullYear();
    $scope.date = {
      month: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      day: [],
      hour: ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
      minute: ['00', '15', '30', '45']
    };
    $scope.dateNow = new Date();

    function daysOfAMonth(year, month) {
      var day = new Date(year, month, 0).getDate();
      var dayQuantities = Array.from(Array(day).keys()).map(function(val) {
        return val + 1;
      });

      return dayQuantities;
    };

    $scope.$watch('turno.mes', function(resp) {
      if ($scope.turno.mes) {
        var month = $scope.date.month.indexOf(resp);
        $scope.turno.mesNumero = month +1;
        var year = $scope.currentYear;
        $scope.date.day = daysOfAMonth(year, $scope.turno.mesNumero);
      }
    });

    if ($stateParams.id !== '') {
      alumnoService.getAlumno($stateParams.id)
        .then(function(dataAlumno) {
          $scope.alumnoElegido = dataAlumno.data;
        }).catch($log.error);
    }

    $scope.crearTurno = function() {
      if ($scope.turno.mes && $scope.turno.dia) {
        var dataMoment = moment($scope.currentYear.toString() + '-' + $scope.turno.mesNumero + '-' + $scope.turno.dia + ' ' + $scope.turno.hora + ':' + $scope.turno.minutos, "YYYY-MM-DD HH:mm");
        var turno = new Date(dataMoment);
        var listadoTurnos = [new Date(dataMoment)];
        var turnosEncontrados = [];

        if ($scope.selector.mensual === true) {
          for (var i = 1; i < 4; i++) {
            listadoTurnos.push(new Date(turno.setDate(turno.getDate() + 7)));
          }
        }

        var TurnosPromises = listadoTurnos.map(function(item) {
          return turnoService.getTurnoPorFecha(item)
          .then(function(resp) {
            if (resp.data.length > 0) {
              return resp.data[0];
            }
            return false;
          });
        });

        $q.all(TurnosPromises).then(function(dataReceived) {
          if (dataReceived.indexOf(false) !== -1) {
            for (var i = 0; i < listadoTurnos.length; i++) {
              var data = {
                alumno: $scope.alumnoElegido._id,
                horario: listadoTurnos[i],
                nota_previa: $scope.turno.nota_previa,
                especialista: userData.get('datosRol')._id,
              }

              turnoService.postTurno(data)
              .then(function(resp) {
                if (i === listadoTurnos.length) {
                  modalMjs.modal('open');
                }
              }).catch($log.error);
            }
          } else {
            modalTurnoError.modal('open');
          }
        });
      } else {
        modalError.modal('open');
      }
    }
  });
