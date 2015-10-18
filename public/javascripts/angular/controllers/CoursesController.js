AcademicsModule.controller("CoursesController", ["$scope", "$http", "$routeParams", "$location", "$timeout", function($scope, $http, $routeParams, $location, $timeout) {

	$scope.course = {};

	$scope.initTabs = function() {
		$(".tabs").tabs();
	};

	$scope.changePath = function(path) {
		$location.path(path);
		if(path === "games") {
			setTimeout(function() {
    (function() {

      fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

      var canvas = this.__canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false,
        perPixelTargetFind: true,
        targetFindTolerance: 5
      });

      // load sun and center it
      fabric.Image.fromURL('/images/games/sun.png', function(sunImg) {
        canvas.add(sunImg);
        sunImg.center();
      });

      var planetSize = 26,
          totalPlanets = 12,
          rotationSpeed = 20000,
          orbits = [ ],
          planets = [ ],
          planetNames = ['Selene', 'Mimas', 'Ares', 'Enceladus', 'Tethys', 'Dione',
                         'Zeus', 'Rhea', 'Titan', 'Janus', 'Hyperion', 'Iapetus'];

      var hoverCircle = new fabric.Circle({
        radius: 13,
        fill: '#000',
        stroke: 'rgb(0,192,255)',
        strokeWidth: 3,
        left: -100,
        top: -100
      });

      var planetLabel = new fabric.Text('', {
        fill: '#fff',
        fontSize: 16,
        fontFamily: 'Open Sans',
        textBackgroundColor: '#002244'
      });

      // load sprite with planets
      fabric.Image.fromURL('/images/games/planets.png', function(planetsImg) {

        // temp canvas to generate planet images
        var tempCanvas = new fabric.StaticCanvas();

        // only to fit one planet onto temp canvas
        tempCanvas.setDimensions({
          width: planetSize,
          height: planetSize
        });

        // make sure image is drawn from left/top corner
        planetsImg.originX = 'left';
        planetsImg.originY = 'top';

        // add it onto temp canvas
        tempCanvas.add(planetsImg);

        for (var i = 0; i < totalPlanets; i++) {
          createOrbit(i);
        }
        canvas.add(hoverCircle);

        for (var i = 0; i < totalPlanets; i++) {
          var planet = createPlanet(i, planetsImg, tempCanvas);
          planets.push(planet);
          animatePlanet(planet, i);
        }

        canvas.add(planetLabel);
      });

      function createOrbit(i) {
        var orbit = new fabric.Circle({
          radius: 26 * i + 90,
          left: canvas.getWidth() / 2,
          top: canvas.getHeight() / 2,
          fill: '',
          stroke: 'rgba(0,192,255,0.5)',
          hasBorders: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          index: i
        });
        canvas.add(orbit);
        orbits.push(orbit);
      }

      function createPlanet(i, planetsImg, tempCanvas) {

        // offset planets sprite to fit each of the planets onto it
        planetsImg.left = -planetSize * i;
        planetsImg.setCoords();
        tempCanvas.renderAll();

        // get data url for that planet
        var img = new Image;
        img.src = tempCanvas.toDataURL();

        // create image of a planet from data url
        var oImg = new fabric.Image(img, {

          width: planetSize,
          height: planetSize,

          name: planetNames[i],
          index: i,

          // position planet 90px from canvas center and 26px from previous planet
          left: (canvas.getWidth() / 2) - 90 - (planetSize * i),
          top: canvas.getHeight() / 2,

          // remove borders and corners but leaving object available for events
          hasBorders: false,
          hasControls: false
        });

        canvas.add(oImg);
        return oImg;
      }

      function animatePlanet(oImg, planetIndex) {

        var radius = planetIndex * 26 + 90,

            // rotate around canvas center
            cx = canvas.getWidth() / 2,
            cy = canvas.getHeight() / 2,

            // speed of rotation slows down for further planets
            duration = (planetIndex + 1) * rotationSpeed,

            // randomize starting angle to avoid planets starting on one line
            startAngle = fabric.util.getRandomInt(-180, 0),
            endAngle = startAngle + 359;

        (function animate() {

          fabric.util.animate({
            startValue: startAngle,
            endValue: endAngle,
            duration: duration,

            // linear movement
            easing: function(t, b, c, d) { return c*t/d + b; },

            onChange: function(angle) {
              angle = fabric.util.degreesToRadians(angle);

              var x = cx + radius * Math.cos(angle);
              var y = cy + radius * Math.sin(angle);

              oImg.set({ left: x, top: y }).setCoords();

              // only render once
              if (planetIndex === totalPlanets - 1) {
                canvas.renderAll();
              }
            },
            onComplete: animate
          });
        })();
      }

      var hoverTarget, prevHoverTarget;

      canvas.on('mouse:over', function(options) {
        hoverTarget = options.target;
      });

      canvas.on('mouse:out', function(options) {
        hoverTarget = null;
        prevHoverTarget = options.target;
      });

      canvas.on('after:render', function() {
        if (hoverTarget) {

          var hoveredPlanet = planets[hoverTarget.index];
          var hoveredOrbit = orbits[hoveredPlanet.index];

          hoveredOrbit.set({
            strokeWidth: 3,
            stroke: 'rgb(0,192,255)'
          });

          hoverCircle.set({
            left: hoveredPlanet.left,
            top: hoveredPlanet.top
          });

          planetLabel.set({
            left: hoveredPlanet.left + 50,
            top: hoveredPlanet.top + 20,
            text: hoveredPlanet.name
          });
        }
        else {
          hoverCircle.set({ left: -100, top: -100 });
          planetLabel.set({ left: -100, top: -100 });

          prevHoverTarget &&
          orbits[prevHoverTarget.index] &&
          orbits[prevHoverTarget.index].set({
            strokeWidth: 1,
            stroke: 'rgba(0,192,255,0.5)'
          });
        }
      });
    })();

  }, 1000);
		}
	};

	$scope.getCourses = function() {
		$http.get("/profile/get").success(function(data) {
			$scope.profiles = data;
		});
	};

	$scope.getLanguajes = function() {
		$http.get("/languajes/get").success(function(languajes) {
			$scope.languajes = languajes;
		});
	};

	$scope.getCategories = function() {
		$http.get("/categories/get").success(function(categories) {
			$scope.categories = categories;
		});
	};

	$scope.getSubCategories = function(category_id) {
		if(category_id) {
			$scope.course.category_id = category_id;	
		}
		$http.get("/sub_categories/getByCategory/" + $scope.course.category_id).success(function(sub_categories) {
			$scope.sub_categories = sub_categories;
		});
	};

	$scope.setUpdateData = function() {
		$scope.getById($routeParams.id);
	};

	$scope.getById = function(id) {
		$http.get("/courses/me/get/" + id).success(function(data) {
			$timeout(function() {
				$scope.course = data;
			}, 1);
			$scope.getSubCategories(data.category_id);
		});
	};

	$scope.createCourse = function() {
		$http.post("/courses/create", {data : {course : $scope.course}}).success(function(data) {
			if(data.success) {
				$location.path("/");
				Materialize.toast("Curso creado correctamente!", 1000);
			}
		});
	};

}]);
