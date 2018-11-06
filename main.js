
let numberOfPlayers = 1;
let numberOfHoles = 18;

let total = 0;
let outSum = 0;
let inSum = 0;
let totalPar = 0;

var myCourse;
var myTee = 0;

courseSelected = false;
cardLoaded = false;

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
    $("#placeholder1").remove()
    if(courseSelected) {
        $(".card").empty();
        $("#teeselect").empty();
        $("#teeselect").append(`<option id="placeholder2">Select Tee</option>`);
    } else {
        courseSelected = true;
    }
    console.log(courseId);
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

function buildCard(tee) {
    $(".card").empty();
    $("#placeholder2").remove();
    cardLoaded = true;
    for(let i in myCourse.data.holes[0].teeBoxes) {
        if(myCourse.data.holes[0].teeBoxes[i].teeType == tee) {
            myTee = i;
            break;
        }
    }
    totalPar = 0;
    for(let i in myCourse.data.holes) {
        totalPar += myCourse.data.holes[i].teeBoxes[myTee].par;
    }
    for(let i = 0; i <= (numberOfHoles + 3); i++) {
        if(i == 0) {
            $(".card").append(`<div class="column" id="labels"></div>`);
            $("#labels").append('<p>Hole</p>');
            for(let j=1; j <= numberOfPlayers; j++) {
                $("#labels").append(`<p>Player ${j}</p>`);
            }
            $("#labels").append('<p>Par</p>');
            $("#labels").append('<p>Yardage</p>');
            $("#labels").append('<p>Handicap</p>');
        } else if(i == (numberOfHoles + 1)) {
            $(".card").append(`<div class="column" id="totals"></div>`);
            $("#totals").append(`<p><u>Totals</u></p>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $("#totals").append(`<p id="PT${j}">0</p>`);
            }
        } else if(i == (numberOfHoles + 2)) {
            $(".card").append(`<div class="column" id="outs"></div>`);
            $("#outs").append(`<p><u>Outs</u></p>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $("#outs").append(`<p id="O${j}">0</p>`);
            }
        } else if(i == (numberOfHoles + 3)) {
            $(".card").append(`<div class="column" id="ins"></div>`);
            $("#ins").append(`<p><u>Ins</u></p>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $("#ins").append(`<p id="IN${j}">0</p>`);
            }
        } else if(i == numberOfHoles) {
            $(".card").append(`<div class="column" id="C${i}"></div>`);
            $(`#C${i}`).append(`<p>${i}</p>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $(`#C${i}`).append(`<input onfocusout="lastScore(${j})" id="I${i}${j}">`);
            }
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].par}</p>`);
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].yards}</p>`);
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].hcp}</p>`);
        } else {
            $(".card").append(`<div class="column" id="C${i}"></div>`);
            $(`#C${i}`).append(`<p>${i}</p>`);
            for(let j=1; j<= numberOfPlayers; j++) {
                $(`#C${i}`).append(`<input onfocusout="updateValues(${j})" id="I${i}${j}">`);
            }
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].par}</p>`);
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].yards}</p>`);
            $(`#C${i}`).append(`<p>${myCourse.data.holes[i-1].teeBoxes[myTee].hcp}</p>`);
        }
    }
    $("#totals").append(`<p id="parTotal">${totalPar}</p>`);
    cardLoaded = true;
}

function lastScore(player) {
    updateValues();
    let message = "";

}

function updateValues(player) {
    total = 0;
    inSum = 0;
    outSum = 0;
    for(let i=1; i<= numberOfHoles; i++) {
        total += Number($(`#I${i}${player}`).val());
    }
    for(let i=1; i<= Math.floor(numberOfHoles / 2); i++) {
        inSum += Number($(`#I${i}${player}`).val());
    }
    for(let i=Math.floor(numberOfHoles / 2); i<= numberOfHoles; i++) {
        outSum += Number($(`#I${i}${player}`).val());
    }
    $(`#PT${player}`).html(`${total}`);
    $(`#O${player}`).html(`${outSum}`);
    $(`#IN${player}`).html(`${inSum}`);
}