document.addEventListener("DOMContentLoaded", () => {
    console.log("Project Loaded")
    // getAllWorkouts()
    // getForm()
    getAllWorkoutsButton()
    
})




let loginForm = document.getElementById('sign-in')
let currentUser
loginForm.addEventListener('submit', login)

let addWorkoutForm = document.getElementById("add-workout-form")

function login(){
    event.preventDefault()
    
    let username = document.getElementById('username').value
    fetch(`http://localhost:3000/login/${username}`)
    .then(res => res.json())
  .then(res => {
      
      if (res.id){
          addWorkoutForm.addEventListener("submit", (e) => addMyWorkout(event, res))
          let displayUsername = document.getElementById('logged-in')
          displayUsername.innerText = res.username
          const myWorkoutButton = document.getElementById("my-workouts")
    myWorkoutButton.addEventListener("click", () => renderMyWorkouts(res))
    loginForm.reset()
    currentUser = res
    displayTodaysWorkout(res)
      }
      
      scheduledWorkouts(res)
    })
}
let homelink = document.getElementById('home-link')
homelink.addEventListener("click", renderHomeDiv)
function renderHomeDiv(){
const divCenter = document.getElementById("center-div")
divCenter.innerText = "" 
divCenter.innerHTML = '<div class="col-md-12 col-lg-5 mb-5 mb-lg-0"><h2 class="mb-3 text-uppercase">Add <strong class="text-black font-weight-bold">My Workout</strong></h2><form id="add-workout-form"><fieldset class="uk-fieldset"><div class="uk-margin"><input class="uk-input" id="workout-title" type="text" placeholder="Title of Workout"></div><div class="uk-margin"><textarea class="uk-textarea" id="workout-description" rows="5" placeholder="Description of Workout"></textarea></div><div class="uk-margin"><textarea class="uk-textarea" id="workout-notes" rows="5" placeholder="Notes"></textarea></div><div class="uk-margin"><input class="uk-input" id="youtube-url" type="text" placeholder="Embedded YouTube URL"></div><div class="uk-margin"><label class="uk-form-label" for="form-stacked-select">Select Day</label><div class="uk-form-controls"><select class="uk-select" id="form-stacked-select"><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></div></div></fieldset><button class="btn btn-primary pill px-4">Submit</button></form></div><div class="col-md-12 col-lg-6 ml-auto"><img src="images/about.jpg" alt="Image" class="img-fluid"></div>'

let addWorkoutForm = document.getElementById("add-workout-form")
addWorkoutForm.addEventListener("submit", (e) => addMyWorkout(event, currentUser))
}

function scheduledWorkouts(res){
    
    
    let sundayButton = document.getElementById('pills-sunday-tab')
    sundayButton.addEventListener('click', (e) => renderDay(e, res, 1))
    
    let mondayButton = document.getElementById('pills-monday-tab')
    mondayButton.addEventListener('click', (e) => renderDay(e, res, 2))
    
    let tuesdayButton = document.getElementById('pills-tuesday-tab')
    tuesdayButton.addEventListener('click', (e) => renderDay(e, res, 3))
    
    let wednesdayButton = document.getElementById('pills-wednesday-tab')
    wednesdayButton.addEventListener('click', (e) => renderDay(e, res, 4))
    
    let thursdayButton = document.getElementById('pills-thursday-tab')
    thursdayButton.addEventListener('click', (e) => renderDay(e, res, 5))
    
    let fridayButton = document.getElementById('pills-friday-tab')
    fridayButton.addEventListener('click', (e) => renderDay(e, res, 6))
    
    let saturdayButton = document.getElementById('pills-saturday-tab')
    saturdayButton.addEventListener('click', (e) => renderDay(e, res, 7))

}
function renderDay(e, res, num){
   
    let pillDay = document.getElementById(`pills-1`)
    pillDay.innerText = ""

    let yourWorkouts = res.user_workouts.filter(d => d.day_id === num)
    yourWorkouts.forEach(workout => {
    let rowWrap = document.createElement('div')
    rowWrap.classList.add('row-wrap')
    rowWrap.innerHTML=`
        <div class="row bg-white p-4 align-items-center">
            <div class="col-sm-3 col-md-3 col-lg-3"><h3 class="h5">${workout.workout.name}</h3></div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span>Notes: ${workout.workout.notes}</div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span> </div>       
            <div class="col-sm-3 col-md-3 col-lg-3 text-md-right"><a href="#" class="btn btn-primary pill px-4 mt-3 mt-md-0">Delete Workout</a></div>     
        </div>`
    pillDay.appendChild(rowWrap)
    })
}

function getAllWorkoutsButton(){
    const allWorkoutButton = document.getElementById("all-workouts")
    allWorkoutButton.addEventListener("click", renderAllWorkouts)
}

function renderAllWorkouts(){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    divCenter.appendChild(childDiv)
    const h2 = document.createElement("h2")
    h2.innerHTML = "<h2 class='mb-3 text-uppercase'>All <strong class='text-black font-weight-bold'>Workouts</strong></h2>"
    childDiv.appendChild(h2)
    getAllWorkouts(childDiv)

}

function getAllWorkouts(childDiv){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(workout => showWorkouts(workout, childDiv)))
}

function showWorkouts(workout, childDiv){
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerText = workout.name
    a.style.textDecoration = "underline"
    a.href = "#"
    li.appendChild(a)
    childDiv.appendChild(li)
    a.addEventListener("click", (event) => renderWorkoutShow(workout))
}

function renderWorkoutShow(workout){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    childDiv.innerHTML = "<div class='col-md-12 col-lg-5 mb-5 mb-lg-0'>"
    const h2 = document.createElement("h2")
    h2.innerHTML = `<h2 class='mb-3 text-uppercase'><strong class='text-black font-weight-bold'>${workout.name}</strong></h2>`
    divCenter.appendChild(h2)
    h2.appendChild(childDiv)
    const descH4 = document.createElement("h4")
    descH4.innerHTML = `<strong>Description:</strong> ${workout.description}`
    childDiv.innerHTML = `<iframe width='560' height='315' src='${workout.video_url}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`
    childDiv.appendChild(descH4)
}
function scheduledWorkouts(res){
    let sundayButton = document.getElementById('pills-sunday-tab')
    sundayButton.addEventListener('click', (e) => renderDay(e, res, 1))
    
    let mondayButton = document.getElementById('pills-monday-tab')
    mondayButton.addEventListener('click', (e) => renderDay(e, res, 2))
    
    let tuesdayButton = document.getElementById('pills-tuesday-tab')
    tuesdayButton.addEventListener('click', (e) => renderDay(e, res, 3))
    
    let wednesdayButton = document.getElementById('pills-wednesday-tab')
    wednesdayButton.addEventListener('click', (e) => renderDay(e, res, 4))
    
    let thursdayButton = document.getElementById('pills-thursday-tab')
    thursdayButton.addEventListener('click', (e) => renderDay(e, res, 5))
    
    let fridayButton = document.getElementById('pills-friday-tab')
    fridayButton.addEventListener('click', (e) => renderDay(e, res, 6))
    
    let saturdayButton = document.getElementById('pills-saturday-tab')
    saturdayButton.addEventListener('click', (e) => renderDay(e, res, 7))
}
function renderDay(e, res, num){
 let pillDay = document.getElementById(`pills-1`)
 pillDay.innerText = ""

let  yourWorkouts = res.user_workouts.filter(d => d.day_id === num)
     yourWorkouts.forEach(workout => {
        let rowWrap = document.createElement('div')
        rowWrap.classList.add('row-wrap')
       
        rowWrap.innerHTML=`
        <div class="row bg-white p-4 align-items-center">
            <div class="col-sm-3 col-md-3 col-lg-3"><h3 class="h5">${workout.workout.name}</h3></div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span>Notes: ${workout.workout.notes}</div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span> </div>       
            <div class="col-sm-3 col-md-3 col-lg-3 text-md-right"><a class="btn btn-primary pill px-4 mt-3 mt-md-0" id="delete-button${workout.id}">Delete Workout</a></div>     
        </div>`
        
    pillDay.appendChild(rowWrap)
    let deleteButton = document.getElementById(`delete-button${workout.id}`)
    deleteButton.addEventListener('click', (e) => removeUserWorkout(e, res, rowWrap, workout))
    
        })
    }


function removeUserWorkout(e, res, rowWrap, workout){
    

    let data = {
        user_id: res.id,
        user_workout_id: workout.id

    }
    // method: "POST",
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(data)
    fetch('http://localhost:3000/user_workouts/:username', {
                method: "DELETE",
                headers: {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res =>{
            rowWrap.remove()
     scheduledWorkouts(res)})

}



function addMyWorkout(event, res){

    event.preventDefault()

    let dayName = event.target.querySelector("#form-stacked-select").value
    let day
    switch(dayName){
        case "Sunday":
            day = 1;
            break;
          case "Monday":
            day = 2;
            break;
          case "Tuesday":
             day = 3;
            break;
          case "Wednesday":
            day = 4;
            break;
          case "Thursday":
            day = 5;
            break;
          case "Friday":
            day = 6;
            break;
          case "Saturday":
            day = 7;
        }
    
    let data = {
        name: event.target.querySelector("#workout-title").value,
        description: event.target.querySelector("#workout-description").value,
        video_url: event.target.querySelector("#youtube-url").value,
        notes: event.target.querySelector("#workout-notes").value,
        day_id: day,
        user_id: res.id
    }
    fetch(`http://localhost:3000/addworkout/${res.username}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        alert("Workout Added!")
        addWorkoutForm.reset()
        scheduledWorkouts(res)} )
}
    
function renderMyWorkouts(res){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    divCenter.appendChild(childDiv)
    const h2 = document.createElement("h2")
    h2.innerHTML = "<h2 class='mb-3 text-uppercase'>My <strong class='text-black font-weight-bold'>Workouts</strong></h2>"
    childDiv.appendChild(h2)
    res.user_workouts.forEach(
        user_workout => {
            const li = document.createElement("li")
            const a = document.createElement("a")
            a.innerText = user_workout.workout.name
            a.style.textDecoration = "underline"
            a.href = "#"
            li.appendChild(a)
            childDiv.appendChild(li)
            a.addEventListener("click", (event) => renderWorkoutShow(user_workout.workout))
        }
    )
}




















function displayTodaysWorkout(res) {
   
    let todayRow = document.getElementById('todays-workout-row')
    let d = new Date();
    d = d.getDay() + 1
    if (res){
    let dayworkouts = res.user_workouts.filter(day => day.day_id === d)
    dayworkouts.forEach( element => {
    let todayWorkoutDiv = document.createElement('div')
    todayWorkoutDiv.classList.add('col-md-6', 'col-lg-3')
    todayWorkoutDiv.innerHTML =
        `<div class="w-100 h-100 block-feature p-5 bg-light">
        <span class="d-block mb-3">
            <span class="flaticon-weight display-4"></span>
        </span>
        <h2>Today's Workout</h2>
        <p>${element.workout.name}</p>
        <p>${element.workout.description}</p>
        </div>`
    todayRow.appendChild(todayWorkoutDiv)})
    }        

    

}












