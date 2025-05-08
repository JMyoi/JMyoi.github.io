async function GetFactOfDay(){
    const url = 'https://numbersapi.p.rapidapi.com/random/trivia?min=0&max=100';
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

async function handleFormSubmit(){

    let type = document.getElementById("Type");
    console.log(type.textContent);

    switch(type.textContent){
        case "Trivia":
            
            break;
        case "Math":
            break;
        case "Date":
            break;
        case "Year":
            break;
        case "Random":
            break;
    }


}