
//marc copes

function getGif(apiCall, promise) {
 
    fetch(apiCall) 
        .then(function(response) {
            return response.json();
        })
        .then(function(obj) {
            promise(obj);
        });
    
}



    



  

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

        fetch(char.homeworld)
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {

            let html = "<h2>"+char.name+"</h2>"
            html += "<ul class=\"properties\">"
            html += "<li>homeworld url: "+char.homeworld+"</li>"
            html += "<li>homeworld name: "+result.result.properties.name+"</li>"
            html += "<li>height: "+char.height+"</li>"
            html += "<li>eye colour: "+char.eye_color+"</li>"
            html += "</ul>"
            characterDiv.innerHTML = html;
            resultsDiv.appendChild(characterDiv);

            //add gif

            getGif("https://api.giphy.com/v1/gifs/search?api_key=J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D&q="+char.name+"&limit=1&offset=0&rating=g&lang=en", function(result) {
                result.data.forEach((gif) => {
                    let img = document.createElement("img");
                    img.src = result.data[0].images.original.url;
                    characterDiv.appendChild(img);
                })
            });


            });
       }
        
    });
}

form.addEventListener("submit", submitEvent);

let konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a', 'enter'];
let userSequence = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
let currentCount = 0;

document.addEventListener('keyup', event => {

    //add next keystroke to userSequence
    const key = event.key.toLowerCase();
    userSequence[currentCount] = key;
    currentCount += 1;

    //testing
    //console.log(userSequence);
    //console.log(currentCount);

    //check if userSequence is correct so far
    for (let i=1; i <= currentCount; i++) {
        if (userSequence[i-1] === konamiCode[i-1]) {
        } else {
            //if it isn't, reset userSequence and currentCount
            userSequence = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
            currentCount = 0;
            console.log("Bad luck!");
            console.log(userSequence);
            break;
            
        }

        //if I get to 11 successful presses, success!
        if (currentCount === 11) {
            
            getGif("https://api.giphy.com/v1/gifs/search?api_key=J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D&q=jarjar&limit=1&offset=0&rating=g&lang=en", function(result) {
                document.body.innerHTML = "";
                let jarJar = document.createElement("img");
                jarJar.src = result.data[0].images.original.url;
                jarJar.style.height="100%";
                jarJar.style.width="100%";
                jarJar.style.position = "absolute";
                jarJar.style.top="0px";
                jarJar.style.left="0px";
                document.body.appendChild(jarJar);
            });

            //document.pageDiv.blur(); - how to use?
        }
    }


   
});
