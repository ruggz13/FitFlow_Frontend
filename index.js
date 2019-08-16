document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
    getAllWorkouts()
    getForm()
})

function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

let workoutDivRowWrap = document.getElementById('pills-monday')

function getAllWorkouts(){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(showWorkouts))
}



function showWorkouts(workout){
   let workouttext = document.getElementById('')
    workouttext.innerText = workout.name

}