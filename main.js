
let numberOfPlayers = 1;
let numberOfHoles = 18;

var myCard = [];

let cardLoaded = false;

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            courseCollection = JSON.parse(this.responseText);
            console.log(courseCollection);

            for(let i = 0; i < courseCollection.courses.length; i++) {
                $("#courseselect").append(`<option value="${courseCollection.courses[i].id}">${courseCollection.courses[i].name}</option>`);
            }
        }
    }
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses");
    xhttp.send();
}

function loadCourse(courseId) {
    if(cardLoaded) {
        $(".card").empty();
        cardLoaded = false;
    }
    console.log(courseId);
    if(cardLoaded) {
        $("#teeselect").empty();
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);
            console.log(myCourse);

            let teeArray = myCourse.data.holes[0].teeBoxes;
            for(let i = 0; i < teeArray.length; i++) {
                $("#teeselect").append(`<option>${teeArray[i].teeType}</option>`);
            }
            numberOfHoles = myCourse.data.holes.length;
        }
    }
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+courseId, true);
    xhttp.send();
}

function changePlayers(num) {
    numberOfPlayers = num;
    buildCard();
}

function buildCard() {
    $(".card").empty();
    for(let i = 0; i <= (numberOfHoles + 1); i++) {
        if(i == 0) {
            $(".card").append(`<div class="column" id="playerNumbers"></div>`);
            for(let j=1; j <= numberOfPlayers; j++) {
                $("#playerNumbers").append(`<p>Player${j}</p>`);
            }
        } else if(i == (numberOfHoles + 1)) {
            $(".card").append(`<div class="column" id="totals"></div>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $("#totals").append(`<p id="PT${j}">Total:</p>`);
            }
        } else if(i == numberOfHoles) {
            $(".card").append(`<div class="column" id="C${i}"></div>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $(`#C${i}`).append(`<input onfocusout="lastScore(${j})" id="I${i}${j}">`);
            }
        } else {
            $(".card").append(`<div class="column" id="C${i}"></div>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $(`#C${i}`).append(`<input id="I${i}${j}">`);
            }
        }
    }
    cardLoaded = true;
}

function lastScore(player) {
    
}