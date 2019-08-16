document.addEventListener("DOMContentLoaded", () => {
    console.log("Rob Loaded")
    getAllWorkouts()
    getForm()
})

function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addMyWorkout)
}

let workoutDivRowWrap = document.getElementById('pills-monday')

function getAllWorkouts(){
    fetch('http://localhost:3000/workouts')
    .then(res => res.json())
    .then(res => res.forEach(showWorkouts))
}



function showWorkouts(workout){
   let workouttext = document.getElementById('monday1')
    workouttext.innerText = workout.name

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