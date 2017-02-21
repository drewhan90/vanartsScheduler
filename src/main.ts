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

$(document).ready( () => {
    const dir = "http://localhost/projects";
    const url = `${dir}/vanartsScheduler/public/php/json.php`;
    $.getJSON(url, (result) => {
        $.each(result, (i, field) => {
            const id = field.id;
            const name = field.name;
            const instructor = field.instructor;
            const day = field.day;
            const starttime = field.starttime;
            const endtime = field.endtime;

            $("#class-list").append(`<li class="item"><a href='classinfo.html?id=${id}&name=${name}&instructor=${instructor}&day=${day}&starttime=${starttime}&endtime=${endtime}'>
                                        <div class="item-left">
                                            <h4 class="classDays">${day}</h4>
                                            <h4 class="classTimes">${starttime} - ${endtime}</h4>
                                        </div>
                                        <div class="item-right">
                                            <h4 class="instructor">${instructor}</h4>
                                        </div>
                                        <div class="item-title">
                                            <h2 class="className">${name}</h2>
                                        </div></a></li>`);
        })
    })
    function editClass() {
        if( $('#app-editClass').length > 0 ){
            // Show value in input
            const id = decodeURI(getUrlVars()["id"]);
            const name = decodeURI(getUrlVars()["name"]);
            const instructor = decodeURI(getUrlVars()["instructor"]);
            const day = decodeURI(getUrlVars()["day"]);
            const starttime = decodeURI(getUrlVars()["starttime"]);
            const endtime = decodeURI(getUrlVars()["endtime"]);

            $("#id").val(id);
            $("#className").val(name);
            $("#instructorName").val(instructor);
            $("#day").val(day);
            $("#startTime").val(starttime);
            $("#endTime").val(endtime);
        }
        

        $("#edit").click( () => {
            const id  =$("#id").val();
            const name = $("#className").val();
            const instructor = $("#instructorName").val();
            const day = $("#day").val();
            const starttime=$("#startTime").val();
            const endtime=$("#endTime").val();
            const dataString=`id=${id}&name=${name}&instructor=${instructor}&day${day}&starttime=${starttime}&endtime=${endtime}&update=`;
            $.ajax({
                type: "POST",
                url: `${dir}/vanartsScheduler/public/php/edit.php`,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: () => { 
                    $("#edit").val('Connecting...');
                },
                success: (data) => {
                    if(data=="ok")
                    {
                        console.log("edit successful");
                        $("#edit").val("edit");
                    }
                    else if(data=="error")
                    {
                        console.log("error: Edit was not completed");
                    }
                }
            });
        });
        $("#delete").click( () => {
            const id = $("#id").val();
            const dataString = `id=${id}&delete=`;
            $.ajax({
                type: "GET",
                //url: "http://phonegappro.esy.es/test/delete.php",
                url:`${dir}/vanartsScheduler/public/php/delete.php`,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: () => { 
                    $("#delete").val('Connecting...');
                },
                success: (data) => {
                    if(data=="ok")
                    {
                        console.log("Delete");
                        $("#delete").val("Deleted");
                    }
                    else if(data=="error")
                    {
                        console.log("error: Delete was not completed");
                    }
                }
            });
        });
    } // edit

    function addClass() {
        $("#add").click( () => {
            const name = $("#className").val();
            const instructor = $("#instructorName").val();
            const day = $("#day").val();
            const starttime=$("#startTime").val();
            const endtime=$("#endTime").val();
            const dataString= `className=${name}&instructorName=${instructor}&day=${day}&startTime=${starttime}&endTime=${endtime}&add=`;
            
                $.ajax({
                    type: "POST",
                    url: `${dir}/vanartsScheduler/public/php/insert.php`,
                    //headers: {'X-Requested-With': 'XMLHttpRequest'},
                    data: dataString,
                    crossDomain: false,
                    cache: false,
                    beforeSend: () => { 
                        $("#add").val('Connecting...');
                    },
                    success: (data) => {
                        if(data=="ok")
                        {
                            console.log("inserted");
                            $("#add").val('submit');
                        }
                        else if(data=="error")
                        {
                            console.log("error");
                        }
                    }
                });
            
         });
    } // add 

    const index = document.getElementById('index');
    const classes = document.getElementById('class');

    function changePageOnSwipe(page, lpage, rpage){
        var touchStartCoords =  {'x':-1, 'y':-1}, // X and Y coordinates on mousedown or touchstart events.
        touchEndCoords = {'x':-1, 'y':-1},// X and Y coordinates on mouseup or touchend events.
        direction = 'undefined',// Swipe direction
        minDistanceXAxis = 30,// Min distance on mousemove or touchmove on the X axis
        maxDistanceYAxis = 30,// Max distance on mousemove or touchmove on the Y axis
        maxAllowedTime = 1000,// Max allowed time between swipeStart and swipeEnd
        startTime = 0,// Time on swipeStart
        elapsedTime = 0,// Elapsed time between swipeStart and swipeEnd
        target = page;// Element to delegate

        function swipeStart(e) {
            e = e ? e : window.event;
            e = ('changedTouches' in e)?e.changedTouches[0] : e;
            touchStartCoords = {'x':e.pageX, 'y':e.pageY};
            startTime = new Date().getTime();
        }

        function swipeMove(e){
            e = e ? e : window.event;
            e.preventDefault();
        }

        function swipeEnd(e) {
            e = e ? e : window.event;
            e = ('changedTouches' in e)?e.changedTouches[0] : e;
            touchEndCoords = {'x':e.pageX - touchStartCoords.x, 'y':e.pageY - touchStartCoords.y};
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= maxAllowedTime){
                if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
                    direction = (touchEndCoords.x < 0)? 'left' : 'right';
                    switch(direction){
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
            for (var i=0, iLen=evts.length; i<iLen; i++) {
                el.addEventListener(evts[i], fn, false);
            }
        }

        addMultipleListeners(target, 'mousedown touchstart', swipeStart);
        addMultipleListeners(target, 'mousemove touchmove', swipeMove);
        addMultipleListeners(target, 'mouseup touchend', swipeEnd);
    }
    
    if( $('#index').length > 0 ){
        changePageOnSwipe( index, "assignment.html", "class.html" );
    }
    else if( $('#class').length > 0 ){
        changePageOnSwipe( classes, "addClass.html", "index.html" );
    }
    
    
    editClass();
    addClass();
    
    
});