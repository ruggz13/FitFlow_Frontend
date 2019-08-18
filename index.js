document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
    getAllWorkouts()
    getForm()
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
      res.workouts.forEach(showWorkouts)
  })

}



function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

function addWorkout(){

}

// let workoutDivRowWrap = document.getElementById('pills-monday')

function getAllWorkouts(){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(showWorkouts))
}

let sundayButton = getElementById('pills-sunday-tab')
sundayButton.addEventListener('click' renderDay)

function showWorkouts(workout){
  
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