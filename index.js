document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
    // getAllWorkouts()
    // getForm()
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
      displayUsername.innerText = res.name

      scheduledWorkouts(res)
  })

}

// function getForm(){
//     const addWorkoutForm = document.getElementById("add-workout-form")
//     addWorkoutForm.addEventListener("submit", addMyWorkout)
// }

// let workoutDivRowWrap = document.getElementById('pills-monday')

function renderAllWorkouts(){
    const divCenter = document.getElementById("center-div")
    divCenter.innerHTML = ""
    const childDiv = document.createElement("div")
    // childDiv.innerHTML = "<div class='col-md-12 col-lg-5 mb-5 mb-lg-0'>"
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







// function getForm(){
//     const addWorkoutForm = document.getElementById("add-workout-form")
//     addWorkoutForm.addEventListener("submit", addWorkout)
// }




function showWorkouts(workout, childDiv){
        // debugger
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerText = workout.name
    a.style.textDecoration = "underline"
    a.href = "#"
    // a.id = `workout-${workout.id}`
    li.appendChild(a)
    childDiv.appendChild(li)
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
    // childDiv.classList = "w-110 h-100 block-feature p-5 bg-light"
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
    
         //    let workouttext = document.getElementById('monday1')
        //     workouttext.innerText = workout.name
  
//    let workoutTab = document.getElementById('pills-tabContent')


    // pillDay.classList.add('tab-pane', 'fade', 'show', 'active')
    // pillDay.id = `pills-monday`
    // pillDay.role.add('tabpanel')
        let rowWrap = document.createElement('div')
        rowWrap.classList.add('row-wrap')
      
        rowWrap.innerHTML=`
        <div class="row bg-white p-4 align-items-center">
            <div class="col-sm-3 col-md-3 col-lg-3"><h3 class="h5">${workout.workout.name}</h3></div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span>Notes: ${workout.workout.notes}</div>
            <div class="col-sm-3 col-md-3 col-lg-3"><span></span> </div>       
            <div class="col-sm-3 col-md-3 col-lg-3 text-md-right"><a href="#" class="btn btn-primary pill px-4 mt-3 mt-md-0">Delete Workout</a></div>     
        </div>`

//    workoutTab.appendChild(pillDay)
    pillDay.appendChild(rowWrap)
    
        })
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
    

function getAllWorkoutsButton(){
    const allWorkoutButton = document.getElementById("all-workouts")
    allWorkoutButton.addEventListener("click", renderAllWorkouts)
}

