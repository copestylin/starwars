
//marc copes

const form = document.getElementById("form");



function submitEvent(event) {
    event.preventDefault();

    let input = document.getElementById("search");
    //console.log("value: "+input.value);
    let resultsDiv = document.getElementById("results");
    //console.log(resultsDiv)

    fetch("https://www.swapi.tech/api/people/?name="+input.value)
    .then(function(response) {
        return response.json()
    })
    .then(function(result) {
     //console.log(result);
       for (let i=0; i < result.results.length; i++) {

        let char = result.results[i].properties;
        let characterDiv = document.createElement("div");
        
        //console.log(char.homeworld);
        
        fetch(char.homeworld)
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {

            let html = "<h2>"+char.name+"</h2>"
            html += "<ul>"
            html += "<li>homeworld url: "+char.homeworld+"</li>"
            html += "<li>homeworld name: "+result.result.properties.name+"</li>"
            html += "<li>height: "+char.height+"</li>"
            html += "<li>eye colour: "+char.eye_color+"</li>"
            html += "</ul>"
            characterDiv.innerHTML = html;
            resultsDiv.appendChild(characterDiv);

            //add gif

            fetch("https://api.giphy.com/v1/gifs/search?api_key=J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D&q="+char.Name+"&limit=1&offset=0&rating=g&lang=en")
            .then(function(response) {
                return response.json()
            })
            .then(function(result) {
                console.log(result.data[0].url);
            });


            });
       }
        
    });
}

form.addEventListener("submit", submitEvent);
