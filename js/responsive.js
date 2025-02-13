function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

function renderDate() {
    let d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let daynumber = d.getDate();
    var m = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[m.getMonth()];

    let year = d.getFullYear();

    document.getElementById("date").innerHTML = day + ",   " + daynumber + " of " + month + "   " + year;


    getMessage(day);

}


function getMessage(day) {
    if (day == "Friday") {
        document.getElementsByClassName("message")[0].classList.toggle("fridaymessage");
    }
}

function loadTowns() {
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObject) {

            const towns = jsonObject['towns'];
            const preston = towns.filter(town => (town.name == 'Preston'));

            const fishhaven = towns.filter(town => (town.name == 'Fish Haven'));

            const sodasprings = towns.filter(town => (town.name == 'Soda Springs'));


            addTown(preston);
            addTown(fishhaven);
            addTown(sodasprings);

        });
}

function addTown(town) {

    /* create elements to show */
    let card = document.createElement('section');
    let div = document.createElement('div');
    let h1 = document.createElement('h1')
    let p = document.createElement('p');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3')
    let h3b = document.createElement('h3')
    let image = document.createElement('img');

    h1.innerHTML = `<strong>${town[0].name}</strong>`;
    p.innerHTML = `${town[0].motto}`;
    h2.innerHTML = `Founded in :${town[0].yearFounded}`;
    h3.innerHTML = `Current Population: ${town[0].currentPopulation}`;
    h3b.innerHTML = `Average Rainfall: ${town[0].averageRainfall}`;

    image.setAttribute('src', `images/${town[0].photo}`);
    image.setAttribute('alt', `Picture of the city of  ${town[0].name}`);
    image.setAttribute('id', 'hometown');
    h1.setAttribute('class', 'data');
    p.setAttribute('class', 'data');
    h2.setAttribute('class', 'data');
    h3.setAttribute('class', 'data');
    h3b.setAttribute('class', 'data');

    div.setAttribute('class', 'information');


    /*Add content to the card and set it in div */

    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(h3);
    div.appendChild(h3b);
    card.appendChild(div);
    card.appendChild(image);

    document.querySelector('div.cards').appendChild(card);

}

function setValue() {
    var message = document.getElementById("value").value;
    document.getElementById("severity").innerHTML = message;
}

function setActivity(townName) {
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObject) {

            const towns = jsonObject['towns'];

            const townResult = towns.filter(town => (town.name == townName));





            addTownActivity(townResult);

        });

    function addTownActivity(town) {

        /* create elements to show and titles*/

        let div = document.createElement('div');

        let h2 = document.createElement('h2');
        h2.innerHTML = `Upcoming Events`;
        let hr = document.createElement('hr');
        h2.setAttribute('id', 'eventTitle');
        hr.setAttribute('id', 'eventLine');
        div.appendChild(h2);
        div.appendChild(hr);


        /*take information from events in town*/
        var x;
        var h3;
        for (x in town[0].events) {
            console.log(town[0].events[x]);
            h3 = document.createElement('h3');
            h3.innerHTML = `${town[0].events[x]}`;
            h3.setAttribute('class', 'event');
            div.appendChild(h3);
        }




        div.setAttribute('class', 'townEvents');


        /*Add content to the card and set it in div */





        document.querySelector('div.cards2').appendChild(div);


    }



}