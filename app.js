
//marc copes

function handleDragStart(e) {
    this.style.opacity = '0.4';
    console.log("Dragging...");

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    console.log("Dropped.");
    this.style.opacity = '1';
    
}

function handleDragEnter(e) {
    this.classList.add('over');
    console.log("Hovering...");

  }

  function handleDragLeave(e) {
    this.classList.remove('over');
    console.log("No longer hovering.");

  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }

  function handleDrop(e) {
    e.stopPropagation();
  
      if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
  
      return false;
    }

function createDragAndDropListeners() {
    let items = document.querySelectorAll("#characterDivProperties");
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('dragend', handleDragEnd, false);
        item.addEventListener('drop', handleDrop, false);

    });
}



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
        characterDiv.draggable = true;

        


        fetch(char.homeworld)
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {


            createDragAndDropListeners();

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
                    img.draggable = false;
                    characterDiv.appendChild(img);

                    //profile circle gif
                    let prof = document.createElement("img");
                    prof.src = result.data[0].images.original.url;
                    prof.id = "characterProfile";
                    prof.draggable = false;
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
