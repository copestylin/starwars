
//marc copes




/////////////// code from discord, unsure how to implement

div.addEventListener('dragstart', () => {
    div.classList.add('dragging');
})

div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
})

div.addEventListener('dragover', e => {
    e.preventDefault()
    const dragCard = document.querySelector('.dragging')
})


// this doesn't implement the moving you will need to use the following

draggingDiv.parentNode.insertBefore(draggingDiv, hoverDiv);

//////////////



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
        characterDiv.id = "characterDivProperties";

        fetch(char.homeworld)
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {

            let html = "<h2 id=\"characterName\">"+char.name+"</h2>"
            html += "<div id=\"characterWorld\">"+result.result.properties.name+"</div>";
            html += "<ul>"
            html += "<div id=\"characterDetails\"><li>Height: "+char.height+"</li></div>"
            html += "<div id=\"characterDetails\"><li>Eye Colour: "+char.eye_color+"</li></div>"
            html += "</ul>"
            characterDiv.innerHTML = html;
            resultsDiv.appendChild(characterDiv);

            //add gif

            getGif("https://api.giphy.com/v1/gifs/search?api_key=J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D&q="+char.name+"&limit=1&offset=0&rating=g&lang=en", function(result) {
                result.data.forEach((gif) => {

                    //main large gif
                    let img = document.createElement("img");
                    img.src = result.data[0].images.original.url;
                    img.id = "characterGif";
                    characterDiv.appendChild(img);

                    //profile circle gif
                    let prof = document.createElement("img");
                    prof.src = result.data[0].images.original.url;
                    prof.id = "characterProfile";
                    characterDiv.appendChild(prof);
                    
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

    //check if userSequence is correct so far
    for (let i=1; i <= currentCount; i++) {
        if (userSequence[i-1] === konamiCode[i-1]) {
        } else {
            //if it isn't, reset userSequence and currentCount
            userSequence = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
            currentCount = 0;
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
