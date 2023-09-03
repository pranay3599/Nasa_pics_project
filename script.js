api_key = "W669tamB8ZIr0fHjyX26CJL2opPLROIieqLfkzph"
// for the current day image
getCurrentImageOfTheDay()

 async function getCurrentImageOfTheDay(){


    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);
   const nasa = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}
   `)
   const data = await nasa.json();
   
    document.getElementById("image").src = data.url;
    document.getElementById("title").innerText = data.title;
    document.getElementById("content").innerText = data.explanation;
   
}


// for the expected date 
let dateInput = document.getElementById("search-input");
let searchbtn = document.querySelector("input[type=submit]")

searchbtn.addEventListener("click" , getImageOfTheDay)


let arr =[];

async function getImageOfTheDay(e){
    e.preventDefault();
    let p = e.target.id;
    let currentDate;
    if(p!==""){
        currentDate = p;
    }
    else{
        let date = dateInput.value;
        currentDate = new Date(date).toISOString().split('T')[0];
        saveSearch(currentDate);

    }
    
   const nasa = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}
   `)
   const data = await nasa.json();
   
    document.getElementById("date").innerHTML = `Picture on ${data.date}`
    document.getElementById("image").src = data.url;
    document.getElementById("title").innerText = data.title;
    document.getElementById("content").innerText = data.explanation;
}
function saveSearch(currentDate){
    //let data = JSON.parse(localStorage.getItem("dates"))
    const currentDateNow = new Date().toISOString().split('T')[0];
    if(currentDate !== currentDateNow){

        const searches = JSON.parse(localStorage.getItem('searches')) || [];

  searches.push(currentDate);
  localStorage.setItem('searches', JSON.stringify(searches));
  addSearchToHistory(currentDate)
    }}
   
addSearchToHistory("outside");
function addSearchToHistory(s){
    let data = JSON.parse(localStorage.getItem("dates"))
    let list = document.getElementById("search-history")
    if(s==="outside"){
    if(data!==null){
        data.forEach((element )=> {
            list.innerHTML +=`<a href="#" class="links" "> <li id="${element}">${element}</li></a>
            `
        });
    } 
}
else{
    let p = document.createElement('a');
    p.href ="#"
    p.classList.add("links")
    p.innerHTML = `<li id="${s}">${s}</li>`
    // console.log(p)
    p.addEventListener("click" , getImageOfTheDay)
    list.appendChild(p);
}
}

let previouslinks = document.querySelectorAll(".links")
 console.log(previouslinks)
previouslinks.forEach((item)=>{
    item.addEventListener("click" , getImageOfTheDay)
})
 //https:api.nasa.gov/planetary/apod?date=2023-04-04&api_key=W669tamB8ZIr0fHjyX26CJL2opPLROIieqLfkzph 