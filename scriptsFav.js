function loadFavorites(){
    const container = document.getElementById("favContainer");
    container.innerHTML = "";//clear it

    //get favorites array of objects form local storage
    let favorites = localStorage.getItem("favorites");
    if(!favorites){
        container.innterHTML = "<p>You Currently Have no Favorites.</p>"
        return;
    }

    favorites = JSON.parse(favorites);
    console.log(favorites);
    console.log(favorites.length);

    for(let i = 0; i<favorites.length; i++){
        //get input, type, and fact form favorites[i]
        let currInput = favorites[i].input;
        let currType = favorites[i].type;
        let currFact = favorites[i].fact;
        //put it into a card 
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${i+1}. Type: ${currType}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">Value: ${currInput}</h6>
                      <p class="card-text">${currFact}</p>
                      <button onClick = "RemoveFavorite(${i})" class="btn btn-outline-secondary " id = "DeleteBtn"> 
                            <img src = "trash.svg" class = "img-rounded" alt="Logo" width="20" height="20" />
                        </button>
                    </div>
                </div>
        `;
        container.appendChild(card);
    }

}
loadFavorites();

function RemoveFavorite(i){
    console.log("deleting Item at index "+i);
    let favorites = localStorage.getItem("favorites");
    favorites = JSON.parse(favorites);
    //splice removes array item at i, only 1 item being removed.
    favorites.splice(i, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    //reload the page to show that it is removed
    loadFavorites();

}