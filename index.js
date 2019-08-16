document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
  getAllWorkers()
  getForm()
})

function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

let workoutDivRowWrap = document.getElementById('pills-monday')

function getAllWorkers(){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(showWorkouts))
}

function showWorkouts(workout){
        debugger
   let workouttext = document.getElementById('monday1')
    workouttext.innerText = workout.name
}

function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

function addWorkout(event){

}