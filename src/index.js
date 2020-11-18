console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", onDomLoad)

function onDomLoad(){
    getImages()
    getBreeds()
    clickOnBreed()
    dropdownClick()
}

function getImages(){
    let container = document.getElementById("dog-image-container")
    return fetch("https://dog.ceo/api/breeds/image/random/4").then(img => img.json()).then(function(json){
        const imgArr = json['message']
    for (const img of imgArr){
        let imgTag = document.createElement('img')
        imgTag.setAttribute("src", img)
        container.appendChild(imgTag)
    }
    })
}

function getBreeds(startswith = ""){
    return fetch("https://dog.ceo/api/breeds/list/all").then(res => res.json()).then(breeds => handleBreeds(breeds.message, startswith))
}

function handleBreeds(breeds, startswith){
    
    let listBreeds = document.getElementById("dog-breeds")
    listBreeds.innerHTML = ""
    if(startswith != ""){
        for(const key in breeds){
            if (key[0].toLowerCase() != startswith){
            delete breeds[key]
            }
        }
    }

        for (const breed in breeds){
            if(breeds[breed].length != 0){
                for (const value of breeds[breed]){
                    let li = document.createElement('li')
                    li.textContent = `${breed} ${value} `
                    listBreeds.appendChild(li)
                }    
            }
            else {
                let li = document.createElement('li')
                li.textContent = `${breed}`
                listBreeds.appendChild(li)
            }
        }
}

function clickOnBreed(){
    let listBreeds = document.getElementById("dog-breeds")
    listBreeds.addEventListener('click', function(e){
        e.target.style.color = "pink"
    })
}

function dropdownClick(){
    let dropdown = document.getElementById("breed-dropdown")
    dropdown.addEventListener('change',function(e){
        let choice = e.target.value
        getBreeds(choice)

    })
}
