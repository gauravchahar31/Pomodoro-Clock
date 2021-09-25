var session_start_audio = new Audio("click.mp3");
var break_start_audio = new Audio("bell.mp3");

let session_minutes = 25;
let session_seconds = "00";
let break_minutes = 5;
let break_seconds = "00";
let jugad = 1;
let current_counter = 1;

let break_minutes_timer;
let break_seconds_timer; 
let session_minutes_timer;
let session_seconds_timer;

function timeSet(){
    document.getElementById("session_minutes").innerHTML = session_minutes;
    document.getElementById("session_seconds").innerHTML = session_seconds;
    document.getElementById("break_minutes").innerHTML = break_minutes;
    document.getElementById("break_seconds").innerHTML = break_seconds;
    document.getElementById("session_timer_minutes").innerHTML = session_minutes;
    document.getElementById("break_timer_minutes").innerHTML = break_minutes;
}

document.getElementById("title").style.display = "";
document.getElementById("title2").style.display = "none";

//Session and Break Time Updater//
let session_plus = document.getElementById("session_plus");
let session_minus = document.getElementById("session_minus");
let break_plus = document.getElementById("break_plus");
let break_minus = document.getElementById("break_minus");

session_plus.addEventListener("click", function(){
    session_minutes += 5;
    timeSet();
});
session_minus.addEventListener("click", function(){
    session_minutes -= 5;
    if(session_minutes < 5){
        session_minutes = 5;
    }
    timeSet();
});
break_plus.addEventListener("click", function(){
    break_minutes += 5;
    timeSet();
});
break_minus.addEventListener("click", function(){
    break_minutes -= 5;
    if(break_minutes < 5){
        break_minutes = 5;
    }
    timeSet();
});

//Timer Start, Pause, Reset//
let session_start_event = document.getElementById("start_pause");
let session_reset_event = document.getElementById("reset");
let session_start_pause_updater = 0;

session_start_event.addEventListener("click", function(){
    if(session_start_pause_updater == 0){
        if(current_counter == 1){
            session_start();
        }
        else{
            break_start();
        }
        session_start_pause_updater = 1;
        session_start_event.innerHTML = "Pause"
    }
    else if(session_start_pause_updater == 1){
        session_pause();
        session_start_pause_updater = 0;
        session_start_event.innerHTML = "Start"
    }
});

session_reset_event.addEventListener("click", function(){
    session_pause();
    session_minutes = 25;
    break_minutes = 5;
    session_seconds = "00";
    break_seconds = "00";
    timeSet();
    session_start_pause_updater = 0;
    session_start_event.innerHTML = "Start";
    document.getElementById("title").style.display = "";
    document.getElementById("title2").style.display = "none";
    session_id = 1;
    jugad = 1;
});

//Start, Pause Timer//
let session_id = 1;
let session_id_print = document.getElementById("title_count");
session_id_print.innerHTML = session_id;

function session_start(){

    session_start_audio.play();
    current_counter = 1;

    if(jugad == 1){
        session_minutes = session_minutes - 1;
        session_seconds = 59;
        jugad++;
    }

    document.getElementById("title").style.display = "block";
    document.getElementById("title2").style.display = "none";
    document.getElementById("session").style.display = "block";
    document.getElementById("break").style.display = "none";
    document.getElementById("session_minutes").innerHTML = session_minutes;
    document.getElementById("session_seconds").innerHTML = session_seconds;

    session_minutes_timer = setInterval(minutesTimer, 60000);
    session_seconds_timer = setInterval(secondsTimer, 1000); 

    function minutesTimer(){
        session_minutes = session_minutes - 1;
        document.getElementById("session_minutes").innerHTML = session_minutes;
    }

    function secondsTimer(){
        if(session_seconds == 0){
            session_seconds = 60;
        }  
        session_seconds = session_seconds - 1;
        document.getElementById("session_seconds").innerHTML = session_seconds;
        if(session_seconds <= 0){
            if(session_minutes <= 0){
            clearInterval(session_minutes_timer);
            clearInterval(session_seconds_timer);
            break_minutes = document.getElementById("break_timer_minutes").innerHTML - 1;
            break_seconds = 59;
            break_start();
            }
        } 
    }
}

function break_start(){

    break_start_audio.play();
    current_counter = 2;

    document.getElementById("title").style.display = "none";
    document.getElementById("title2").style.display = "block";
    document.getElementById("session").style.display = "none";
    document.getElementById("break").style.display = "block";
    document.getElementById("break_minutes").innerHTML = break_minutes;
    document.getElementById("break_seconds").innerHTML = break_seconds;

    break_minutes_timer = setInterval(break_minutesTimer, 60000);
    break_seconds_timer = setInterval(break_secondsTimer, 1000); 

    function break_minutesTimer(){
        break_minutes = break_minutes - 1;
        document.getElementById("break_minutes").innerHTML = break_minutes;
    }

    function break_secondsTimer(){
        if(break_seconds == 0){
            break_seconds = 60;
        }
        break_seconds = break_seconds - 1;
        document.getElementById("break_seconds").innerHTML = break_seconds;
        if(break_seconds <= 0){
            if(break_minutes <= 0){
            clearInterval(break_minutes_timer);
            clearInterval(break_seconds_timer);
            session_id = session_id + 1;
            document.getElementById("title_count").innerHTML = session_id;
            session_minutes = document.getElementById("session_timer_minutes").innerHTML - 1;
            session_seconds = 59;
            session_start();
            }
        }
    }
}

function session_pause(){
    clearInterval(break_minutes_timer);
    clearInterval(break_seconds_timer);
    clearInterval(session_minutes_timer);
    clearInterval(session_seconds_timer);
}

