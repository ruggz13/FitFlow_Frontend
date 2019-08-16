document.addEventListener("DOMContentLoaded", function(){
    console.log("Nick loaded")
    getForm()
})
























function getForm(){
    const addWorkoutForm = document.getElementById("add-workout-form")
    addWorkoutForm.addEventListener("submit", addWorkout)
}

function addWorkout(event){

}