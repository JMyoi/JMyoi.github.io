async function GetFactOfDay(){
    const url = 'https://numbersapi.p.rapidapi.com/random/trivia';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        document.getElementById("FOD").textContent = result;
    } catch (error) {
        console.error(error);
    }
}
GetFactOfDay();

//handle the click of button types, Trivia, math, etc


function handleTrivia(){
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
    //button color
    document.getElementById("triviaBtn").setAttribute("class", "btn btn-secondary btn-lg m-2");
    document.getElementById("mathBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("dateBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("yearBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("randomBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    //change text
    document.getElementById("Type").textContent = "Trivia";
    //show input 1
    document.getElementById("firstInput").setAttribute("class", "mb-3");
    document.getElementById("input1Text").textContent = "Input";
    //hide input 2
    document.getElementById("secondInput").setAttribute("class", "mb-3 visually-hidden");

}
function handleMath(){
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
    document.getElementById("triviaBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("mathBtn").setAttribute("class", "btn btn-secondary btn-lg m-2");
    document.getElementById("dateBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("yearBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("randomBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("Type").textContent = "Math";
    document.getElementById("firstInput").setAttribute("class", "mb-3");
    document.getElementById("input1Text").textContent = "Input";
    document.getElementById("secondInput").setAttribute("class", "mb-3 visually-hidden");
}
function handleDate(){
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
    document.getElementById("triviaBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("mathBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("dateBtn").setAttribute("class", "btn btn-secondary btn-lg m-2");
    document.getElementById("yearBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("randomBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("Type").textContent = "Date";
    //both inputs should be shown because we input a month/day
    document.getElementById("firstInput").setAttribute("class", "mb-3");
    document.getElementById("input1Text").textContent = "Month";
    document.getElementById("secondInput").setAttribute("class", "mb-3");
}
function handleYear(){
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
    document.getElementById("triviaBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("mathBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("dateBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("yearBtn").setAttribute("class", "btn btn-secondary btn-lg m-2");
    document.getElementById("randomBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("Type").textContent = "Year";
    document.getElementById("firstInput").setAttribute("class", "mb-3");
    document.getElementById("input1Text").textContent = "Input";
    document.getElementById("secondInput").setAttribute("class", "mb-3 visually-hidden");
}
function handleRandom(){
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
    document.getElementById("triviaBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("mathBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("dateBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("yearBtn").setAttribute("class", "btn btn-light btn-lg m-2");
    document.getElementById("randomBtn").setAttribute("class", "btn btn-secondary btn-lg m-2");
    document.getElementById("Type").textContent = "Random";
    document.getElementById("firstInput").setAttribute("class", "mb-3 visually-hidden");
    document.getElementById("secondInput").setAttribute("class", "mb-3 visually-hidden");

}

async function handleFormSubmit(){
    document.getElementById("starIcon").setAttribute("src", "star.svg");
    let type = document.getElementById("Type");
    console.log(type.textContent);
    let errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";

    switch(type.textContent){
        case "Trivia":
            // take input and handle exceptions
            console.log("type is Trivia, processing...");
            let userInput = document.getElementById("Input1").value;
            userInput = parseInt(userInput);
            //if a string is inputted it will result in NaN, if it is empty it will also result in NaN
            console.log("user inputted: ", userInput);
            console.log(userInput);
            //errors would be !int, Empty, also handle negative numbers
            if(isNaN(userInput) || (userInput < 0)){
                errorMessage.textContent = "Please Enter a Number (must be an integer greater than or equal to 0)";
                return;
            }
            else{
                console.log("consuming API");
                const url = 'https://numbersapi.p.rapidapi.com/'+userInput+'/trivia?notfound=floor';
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
                        'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    console.log(result);
                    document.getElementById("factOutput").textContent = result;
                    //show the favorite button
                    document.getElementById("favBtn").setAttribute("class", "btn btn-outline-secondary");
                } catch (error) {
                    console.error(error);
                }
            }
            break;
        case "Math":
            console.log("type is Math, processing...");
            let userInputM = document.getElementById("Input1").value;
            userInputM = parseInt(userInputM);
            console.log("user inputted: ", userInputM);
            console.log(userInputM);
            if(isNaN(userInputM) || (userInputM < 0)){
                errorMessage.textContent = "Please Enter a Number (must be an integer greater than or equal to 0)";
                return;
            }
            else{
                console.log("consuming API");
                const url = 'https://numbersapi.p.rapidapi.com/'+userInputM+'/math';
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
                        'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    console.log(result);
                    document.getElementById("factOutput").textContent = result;
                    document.getElementById("favBtn").setAttribute("class", "btn btn-outline-secondary");
                } catch (error) {
                    console.error(error);
                }
            }
            break;
        case "Date":
            console.log("type is Date, processing...");
            //get month and day
            let userInputMonth = document.getElementById("Input1").value;
            let userInputDay = document.getElementById("Input2").value;
            //make sure month and day are valid and in range.
            userInputMonth = parseInt(userInputMonth);
            userInputDay = parseInt(userInputDay);
            if(isNaN(userInputMonth) || isNaN(userInputDay)|| userInputMonth<1 || userInputMonth>12 || userInputDay <1 ||userInputDay>31){
                errorMessage.textContent = "Please Enter a Valid Date";
                return;
            }
            else{
                console.log("consuming API");
                const url = 'https://numbersapi.p.rapidapi.com/'+userInputMonth+'/'+userInputDay+'/date';
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
                        'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    console.log(result);
                    document.getElementById("factOutput").textContent = result;
                    document.getElementById("favBtn").setAttribute("class", "btn btn-outline-secondary");
                } catch (error) {
                    console.error(error);
                }
            }
            break;
        case "Year":
            console.log("type is Year, processing...");
            let userInputY = document.getElementById("Input1").value;
            userInputY = parseInt(userInputY);
            console.log("user inputted: ", userInputY);
            console.log(userInputY);
            if(isNaN(userInputY) || (userInputY< 0)){
                errorMessage.textContent = "Please Enter a Number (must be an integer greater than or equal to 0)";
                return;
            }
            else{
                console.log("consuming API");
                const url = 'https://numbersapi.p.rapidapi.com/'+userInputY+'/year';
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
                        'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                    }
                };
                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    console.log(result);
                    document.getElementById("factOutput").textContent = result;
                    document.getElementById("favBtn").setAttribute("class", "btn btn-outline-secondary");
                } catch (error) {
                    console.error(error);
                }
            }

            break;
        case "Random":
            console.log("type is Random, processing...");
            const url = 'https://numbersapi.p.rapidapi.com/random/trivia';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c350818ac0mshe54d33e0036d032p1cd6f1jsn117ada7f393f',
                    'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                }
            };
            
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
                document.getElementById("factOutput").textContent = result;
                document.getElementById("favBtn").setAttribute("class", "btn btn-outline-secondary");
            } catch (error) {
                console.error(error);
            }
            break;
    }


}

function handleFavorite(){
    console.log("adding to Favorites.");
    //need to store the information in localStorage
    //stored as array of objects. [{ input: 42, type: trivia, fact: 42 is the answer to life, the universe, and everything}, { ...}]
    let type = document.getElementById("Type").textContent;
    let userInput1 = document.getElementById("Input1").value;
    let userInput2 = document.getElementById("Input2").value;
    let fact = document.getElementById("factOutput").textContent;
    console.log("type ", type, "Input1 ", userInput1, "input2 ","fact: ", fact );

    //if the type is a date we will combine the date and month into a single string.
    let input;
    if(type === "Date"){
        input = userInput1+"/"+userInput2;
    }
    else{
        input = userInput1;
    }
    //make the object to push into the array
    const newFav = {
        input: input,
        type:type,
        fact: fact
    }
    //get the favorites array of objects
    let favorites = localStorage.getItem("favorites");
    //if there is no favorites: [] then initialize it 
    if(favorites){
        favorites = JSON.parse(favorites);
    }else{
        favorites = [];
    }
    favorites.push(newFav);
    console.log("favorites:", favorites);
    //because the local storage only takes string inputs we have to stringify.
    localStorage.setItem("favorites", JSON.stringify(favorites));

    document.getElementById("starIcon").setAttribute("src", "star-fill.svg");

}