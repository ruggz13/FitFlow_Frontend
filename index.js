document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
    // getAllWorkouts()
    getForm()
    getAllWorkoutsButton()
})
let loginForm = document.getElementById('sign-in')
loginForm.addEventListener('submit', login)

function login(){
    event.preventDefault()
  let username = document.getElementById('username').value
  fetch(`http://localhost:3000/login/${username}`)
  .then(res => res.json())
  .then(res => {
      let displayUsername = document.getElementById('logged-in')
      displayUsername.innerText = res.user.name
      let pillDay = document.getElementById('pills-1')
        pillDay.innerText = ""
      res.workouts.forEach(scheduledWorkouts)
  })

}

function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addMyWorkout)
}

// let workoutDivRowWrap = document.getElementById('pills-monday')

function renderAllWorkouts(){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    childDiv.innerHTML = "<div class='col-md-12 col-lg-5 mb-5 mb-lg-0'>"
    divCenter.appendChild(childDiv)
    const h2 = document.createElement("h2")
    h2.innerHTML = "<h2 class='mb-3 text-uppercase'>All <strong class='text-black font-weight-bold'>Workouts</strong></h2>"
    divCenter.appendChild(h2)
    getAllWorkouts(h2)

}

function getAllWorkouts(h2){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(workout => showWorkouts(workout, h2)))
}
// function allScheduledWorkouts(){
//     fetch('http://localhost:3000/workouts')
//     .then(res => res.json())
//     .then(res => res.forEach(workout => scheduledWorkouts(workout)))
// }



function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

function addWorkout(event){
let sundayButton = getElementById('pills-sunday-tab')
sundayButton.addEventListener('click', renderDay)}

function showWorkouts(workout, h2){

    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerText = workout.name
    a.style.textDecoration = "underline"
    a.href = "#"
    // a.id = `workout-${workout.id}`
    li.appendChild(a)
    h2.appendChild(li)
    a.addEventListener("click", (event) => renderWorkoutShow(workout))
}

function renderWorkoutShow(event){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    childDiv.innerHTML = "<div class='col-md-12 col-lg-5 mb-5 mb-lg-0'>"
    const h2 = document.createElement("h2")
    h2.innerHTML = `<h2 class='mb-3 text-uppercase'><strong class='text-black font-weight-bold'>${event.name}</strong></h2>`
    divCenter.appendChild(h2)
    h2.appendChild(childDiv)
    const descH4 = document.createElement("h4")
    descH4.innerHTML = `<strong>Description:</strong> ${event.description}`
    childDiv.innerHTML = `<iframe width='560' height='315' src='${event.video_url}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`
    childDiv.appendChild(descH4)
}

function scheduledWorkouts(workout){
//    let workouttext = document.getElementById('monday1')
//     workouttext.innerText = workout.name
  
//    let workoutTab = document.getElementById('pills-tabContent')
   
   let pillDay = document.getElementById('pills-1')

    // pillDay.classList.add('tab-pane', 'fade', 'show', 'active')
    // pillDay.id = `pills-monday`
    // pillDay.role.add('tabpanel')
   let rowWrap = document.createElement('div')
   rowWrap.classList.add('row-wrap')
   rowWrap.innerHTML=`
   <div class="row bg-white p-4 align-items-center">
     <div class="col-sm-3 col-md-3 col-lg-3"><h3 class="h5">${workout.name}</h3></div>
     <div class="col-sm-3 col-md-3 col-lg-3"><span></span>Notes: ${workout.notes}</div>
     <div class="col-sm-3 col-md-3 col-lg-3"><span class="icon-person mr-3"></span> David Holmes</div>
     <div class="col-sm-3 col-md-3 col-lg-3 text-md-right"><a href="#" class="btn btn-primary pill px-4 mt-3 mt-md-0">Delete Workout</a></div>     
   </div>`

//    workoutTab.appendChild(pillDay)
   pillDay.appendChild(rowWrap)
}


function addMyWorkout(event){
    debugger
    event.preventDefault()
    let data = {
        name: event.target.querySelector("#workout-title").value,
        description: event.target.querySelector("#workout-description").value,
        video_url: event.target.querySelector("#youtube-url").value,
        notes: event.target.querySelector("#workout-notes").value,
        day_id: event.target.querySelector("#form-stacked-select").value
    }
    fetch("http://localhost:3000/workouts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => console.log(response))
}
    
function renderDay(){
    
}

function getAllWorkoutsButton(){
    const allWorkoutButton = document.getElementById("all-workouts")
    allWorkoutButton.addEventListener("click", renderAllWorkouts)
}

