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
  .controller('especialistaHomeController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaAgendaController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, turnoService, alumnoService) {
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
        console.log('turnos de hoy', turnosDeHoy.data);
      })
      .catch($log.error);

    turnoService.getTurnosEspecialista(userData.get('datosRol')._id)
      .then(function(turnos) {
        $scope.turnos = turnos.data;
        Object.keys($scope.turnos).forEach(function(key) {
          alumnoService.getAlumno($scope.turnos[key].alumno)
            .then(function(alumno) {
              $scope.turnos[key].alumnoDelTurno = alumno.data;
            }).catch($log.error);
        });
      })
      .catch($log.error);

  })
  .controller('especialistaDiagnosticosController', function($auth, $scope, $rootScope, $filter, $window, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
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
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
        .then(function(diagnostico) {
          diagnostico.data.asignado = true;
          diagnostico.data.visto = true;
          $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
          diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
            .then(function(diagnosticoPrematuro) {
              return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
            })
            .then(function() {
              $state.go('especialista_pacientes');
            }).catch($log.error);
        }).catch($log.error);
    }

    $scope.cambiarDiagnosticoAVisto = function(idDiagnostico) {
      console.log('antes');
      console.log($scope.especialista.diagnosticos_vistos);
      $scope.especialista.diagnosticos_vistos.push(idDiagnostico);
      especialistaService.putEspecialistaById($scope.especialista._id, $scope.especialista)
      .then(function(resp) {
        console.log('despues');
        console.log(resp.data);
        //$window.location.reload();
      }).catch($log.error);
    };

  }).controller('especialistaDiagnosticosViejosController', function($auth, $scope, $rootScope, $filter, $state, userData, $log, $http, $translate, config, especialistaService, userService, diagnosticoPrematuroService, alumnoService) {
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

    $scope.informacion = {};
    diagnosticoPrematuroService.getAllDiagnosticosPrematurosVistos()
      .then(function(resp) {
        $scope.diagnosticosPrematuros = resp.data;
        $scope.diagnosticosPrematuros = $filter('orderBy')($scope.diagnosticosPrematuros, "createdAt", true);
        $scope.paginInit($scope.diagnosticosPrematuros);
      }).catch($log.error);


    $scope.filtrarFecha = function(desde, hasta) {
      $scope.desde = new Date($scope.tiempo.buscadorDesde.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      $scope.hasta = new Date($scope.tiempo.buscadorHasta.replace("Diciembre", "Dec").replace("Enero", "Jan").replace("Abril", "Apr").replace("Agosto", "Aug").replace("diciembre", "Dec").replace("enero", "Jan").replace("abril", "Apr").replace("agosto", "Aug"));
      diagnosticoPrematuroService.getAllDiagnosticosPrematurosVistosPorFecha(desde, hasta)
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
    $scope.agregarAMisPacientes = function(idAlumno, idDiagnostico) {
      diagnosticoPrematuroService.getDiagnosticoPrematuro(idDiagnostico)
        .then(function(diagnostico) {
          diagnostico.data.asignado = true;
          diagnostico.data.visto = true;
          $scope.informacion.diagnostico.alumno.especialistaAsociado = userData.get('datosRol')._id;
          diagnosticoPrematuroService.putDiagnosticoPrematuroById(idDiagnostico, diagnostico.data)
            .then(function(diagnosticoPrematuro) {
              return alumnoService.putAlumnoById(idAlumno, $scope.informacion.diagnostico.alumno);
            })
            .then(function() {
              $state.go('especialista_pacientes');
            }).catch($log.error);
        }).catch($log.error);


    };



  })
  .controller('especialistaDiagnosticoVerController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService) {


  })
  .controller('especialistaHistorialController', function($auth, $scope, $rootScope, $state, userData, $stateParams, $log, $http, $translate, config, especialistaService, userService, registrosService, alumnoService) {
    alumnoService.getAlumno($stateParams.id)
      .then(function(resp) {
        $scope.alumno = resp.data;
      }).catch($log.error);

    registrosService.getRegistrosPorPaciente($stateParams.id)
      .then(function(resp) {
        $scope.registros = resp.data;
      }).catch($log.error);

    $scope.verRegistro = function(registro) {
      $scope.registroSeleccionado = registro;
    }
  })
  .controller('especialistaObservacionesController', function($auth, $scope, $rootScope, turnoService, alumnoService, $state, userData, $log, $http, $translate, config, especialistaService, userService, $stateParams) {
    turnoService.getTurnosAlumno($stateParams.id)
      .then(function(turno) {
        $scope.turnos = turno.data;
      })
      .catch($log.error);

      alumnoService.getAlumno($stateParams.id)
      .then(function(alumno) {
        $scope.alumno = alumno.data;
        console.log($scope.alumno);
      })
      .catch($log.error);

      $scope.verDatos = function(datos) {
        $scope.datos = datos;
        console.log($scope.datos);
      }
  })
  .controller('especialistaPacientesController', function($auth, $scope, $rootScope, $state, userData, $log, $http, $translate, config, especialistaService, userService, alumnoService) {
    alumnoService.getAlumnoByEspecialistaId(userData.get('datosRol')._id)
      .then(function(dataAlumnos) {
        $scope.alumnosEspecialista = dataAlumnos.data;
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
  .controller('especialistaTurnoController', function($auth, $scope, $stateParams, $rootScope, $state, userData, $document, $log, $http, $translate, config, moment, especialistaService, userService, alumnoService, turnoService) {
    $scope.turno = {};
    $scope.selector = {};
    var modalMjs = $document.find('#demoModal').modal();
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
      var dataMoment = moment($scope.currentYear.toString() + '-' + $scope.turno.mesNumero + '-' + $scope.turno.dia + ' ' + $scope.turno.hora + ':' + $scope.turno.minutos, "YYYY-MM-DD HH:mm");
      var turno = new Date(dataMoment);
      if ($scope.selector.mensual === true) {
        console.log('que empieze la fiesta');
        var data = {
          alumno: $scope.alumnoElegido._id,
          horario: turno,
          nota_previa: $scope.turno.nota_previa,
          especialista: userData.get('datosRol')._id,
        }
        turnoService.postTurno(data)
          .then(function(resp) {
            var data2 = {
              alumno: $scope.alumnoElegido._id,
              horario: turno.setDate(turno.getDate() + 7),
              nota_previa: $scope.turno.nota_previa,
              especialista: userData.get('datosRol')._id,
            }
            return turnoService.postTurno(data2);
          }).then(function(resp) {
            var data3 = {
              alumno: $scope.alumnoElegido._id,
              horario: turno.setDate(turno.getDate() + 7),
              nota_previa: $scope.turno.nota_previa,
              especialista: userData.get('datosRol')._id,
            }
            return turnoService.postTurno(data3);
          }).then(function(resp) {
            var data4 = {
              alumno: $scope.alumnoElegido._id,
              horario: turno.setDate(turno.getDate() + 7),
              nota_previa: $scope.turno.nota_previa,
              especialista: userData.get('datosRol')._id,
            }
            return turnoService.postTurno(data4);
          }).then(function(resp) {
            modalMjs.modal('open');
          })
          .catch($log.error);
      } else {
        var data = {
          alumno: $scope.alumnoElegido._id,
          horario: turno,
          nota_previa: $scope.turno.nota_previa,
          especialista: userData.get('datosRol')._id,
        }

        turnoService.postTurno(data)
          .then(function(resp) {
            modalMjs.modal('open');
          }).catch($log.error);
      }

    }
  });
