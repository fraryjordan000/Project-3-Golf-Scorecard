
let numberOfPlayers = 1;
let numberOfHoles = 18;

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
}

function buildCard() {
    $(".card").empty();
    //TODO
    cardLoaded = true;
}

function addHoles() {
    //TODO
}