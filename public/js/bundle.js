/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
$(document).ready(function () {
    var dir = "http://localhost/projects";
    var url = dir + "/vanartsScheduler/public/php/json.php";
    $.getJSON(url, function (result) {
        $.each(result, function (i, field) {
            var id = field.id;
            var name = field.name;
            var instructor = field.instructor;
            var day = field.day;
            var starttime = field.starttime;
            var endtime = field.endtime;
            $("#class-list").append("<li class=\"item\"><a href='classinfo.html?id=" + id + "&name=" + name + "&instructor=" + instructor + "&day=" + day + "&starttime=" + starttime + "&endtime=" + endtime + "'>\n                                        <div class=\"item-left\">\n                                            <h4 class=\"classDays\">" + day + "</h4>\n                                            <h4 class=\"classTimes\">" + starttime + " - " + endtime + "</h4>\n                                        </div>\n                                        <div class=\"item-right\">\n                                            <h4 class=\"instructor\">" + instructor + "</h4>\n                                        </div>\n                                        <div class=\"item-title\">\n                                            <h2 class=\"className\">" + name + "</h2>\n                                        </div></a></li>");
        });
    });
    function editClass() {
        if ($('#app-editClass').length > 0) {
            // Show value in input
            var id = decodeURI(getUrlVars()["id"]);
            var name_1 = decodeURI(getUrlVars()["name"]);
            var instructor = decodeURI(getUrlVars()["instructor"]);
            var day = decodeURI(getUrlVars()["day"]);
            var starttime = decodeURI(getUrlVars()["starttime"]);
            var endtime = decodeURI(getUrlVars()["endtime"]);
            $("#id").val(id);
            $("#className").val(name_1);
            $("#instructorName").val(instructor);
            $("#day").val(day);
            $("#startTime").val(starttime);
            $("#endTime").val(endtime);
        }
        $("#edit").click(function () {
            var id = $("#id").val();
            var name = $("#className").val();
            var instructor = $("#instructorName").val();
            var day = $("#day").val();
            var starttime = $("#startTime").val();
            var endtime = $("#endTime").val();
            var dataString = "id=" + id + "&name=" + name + "&instructor=" + instructor + "&day" + day + "&starttime=" + starttime + "&endtime=" + endtime + "&update=";
            $.ajax({
                type: "POST",
                url: dir + "/vanartsScheduler/public/php/edit.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () {
                    $("#edit").val('Connecting...');
                },
                success: function (data) {
                    if (data == "ok") {
                        console.log("edit successful");
                        $("#edit").val("edit");
                    }
                    else if (data == "error") {
                        console.log("error: Edit was not completed");
                    }
                }
            });
        });
        $("#delete").click(function () {
            var id = $("#id").val();
            var dataString = "id=" + id + "&delete=";
            $.ajax({
                type: "GET",
                //url: "http://phonegappro.esy.es/test/delete.php",
                url: dir + "/vanartsScheduler/public/php/delete.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () {
                    $("#delete").val('Connecting...');
                },
                success: function (data) {
                    if (data == "ok") {
                        console.log("Delete");
                        $("#delete").val("Deleted");
                    }
                    else if (data == "error") {
                        console.log("error: Delete was not completed");
                    }
                }
            });
        });
    } // edit
    function addClass() {
        $("#add").click(function () {
            var name = $("#className").val();
            var instructor = $("#instructorName").val();
            var day = $("#day").val();
            var starttime = $("#startTime").val();
            var endtime = $("#endTime").val();
            var dataString = "className=" + name + "&instructorName=" + instructor + "&day=" + day + "&startTime=" + starttime + "&endTime=" + endtime + "&add=";
            $.ajax({
                type: "POST",
                url: dir + "/vanartsScheduler/public/php/insert.php",
                //headers: {'X-Requested-With': 'XMLHttpRequest'},
                data: dataString,
                crossDomain: false,
                cache: false,
                beforeSend: function () {
                    $("#add").val('Connecting...');
                },
                success: function (data) {
                    if (data == "ok") {
                        console.log("inserted");
                        $("#add").val('submit');
                    }
                    else if (data == "error") {
                        console.log("error");
                    }
                }
            });
        });
    } // add 
    var index = document.getElementById('index');
    var classes = document.getElementById('class');
    function changePageOnSwipe(page, lpage, rpage) {
        var touchStartCoords = { 'x': -1, 'y': -1 }, // X and Y coordinates on mousedown or touchstart events.
        touchEndCoords = { 'x': -1, 'y': -1 }, // X and Y coordinates on mouseup or touchend events.
        direction = 'undefined', // Swipe direction
        minDistanceXAxis = 30, // Min distance on mousemove or touchmove on the X axis
        maxDistanceYAxis = 30, // Max distance on mousemove or touchmove on the Y axis
        maxAllowedTime = 1000, // Max allowed time between swipeStart and swipeEnd
        startTime = 0, // Time on swipeStart
        elapsedTime = 0, // Elapsed time between swipeStart and swipeEnd
        target = page; // Element to delegate
        function swipeStart(e) {
            e = e ? e : window.event;
            e = ('changedTouches' in e) ? e.changedTouches[0] : e;
            touchStartCoords = { 'x': e.pageX, 'y': e.pageY };
            startTime = new Date().getTime();
        }
        function swipeMove(e) {
            e = e ? e : window.event;
            e.preventDefault();
        }
        function swipeEnd(e) {
            e = e ? e : window.event;
            e = ('changedTouches' in e) ? e.changedTouches[0] : e;
            touchEndCoords = { 'x': e.pageX - touchStartCoords.x, 'y': e.pageY - touchStartCoords.y };
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= maxAllowedTime) {
                if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis) {
                    direction = (touchEndCoords.x < 0) ? 'left' : 'right';
                    switch (direction) {
                        case 'left':
                            console.log('left');
                            location.replace(lpage);
                            break;
                        case 'right':
                            console.log('right');
                            location.replace(rpage);
                            break;
                    }
                }
            }
        }
        function addMultipleListeners(el, s, fn) {
            var evts = s.split(' ');
            for (var i = 0, iLen = evts.length; i < iLen; i++) {
                el.addEventListener(evts[i], fn, false);
            }
        }
        addMultipleListeners(target, 'mousedown touchstart', swipeStart);
        addMultipleListeners(target, 'mousemove touchmove', swipeMove);
        addMultipleListeners(target, 'mouseup touchend', swipeEnd);
    }
    if ($('#index').length > 0) {
        changePageOnSwipe(index, "assignment.html", "class.html");
    }
    else if ($('#class').length > 0) {
        changePageOnSwipe(classes, "addClass.html", "index.html");
    }
    editClass();
    addClass();
});


/***/ })
/******/ ]);