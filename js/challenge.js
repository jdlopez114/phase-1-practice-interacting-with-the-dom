const counter = document.querySelector('#counter');
const heart = document.querySelector('#heart');
const submit = document.querySelector('#submit');

// See the timer increment every second once the page has loaded.
// document.addEventListener('DOMContentLoaded', () =>
//     function setCounter(){
//         const num = 0;
//         const interval = setInterval(( ) => {  // intevral where we want something to happen every interval
//             counter.innerText = num++;
//         }, 1000)
//     }
// );

document.addEventListener('DOMContentLoaded', startTimer);
let timer;

function startTimer(){
    timer = setInterval(incrementCounter, 1000); //we already have a function to increment so we can use it 
}

// Manually increment and decrement the counter using the plus and minus buttons.
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
plus.addEventListener('click', incrementCounter);
minus.addEventListener('click', decrementCounter);

function incrementCounter(){
    const currentCount = parseInt(counter.textContent, 10); // 3rd arugument is base 10, base 10 is default
    counter.textContent = `${currentCount + 1}`;
}

function decrementCounter(){
    const currentCount = parseInt(counter.textContent, 10); // 3rd arugument is base 10, base 10 is default
    counter.textContent = `${currentCount - 1}`;
}

// "Like" an individual number of the counter. 
// I should see the count of the number of "likes" associated with that number displayed.
const likes = document.querySelector('.likes');
heart.addEventListener('click', addLike)

function addLike(){
    const currentCount = parseInt(counter.textContent, 10);
    const previousLikes = Array.from(likes.children); //html collection not nodes like querySelectorAll --- not an array, have to turn it into one 

    const previousLike = previousLikes.find(previousLike => {
        const previousLikeCount = parseInt(previousLike.textContent.split(" ")[0], 10)
        return previousLikeCount === currentCount;
    })

    // we can refactor this to make cleaner and read nice
    
    if(previousLike){
        //add like to previousLike
        const previousHearts= previousLike.textContent.split(" ").slice(-2)[0];
        const numberOfHearts = parseInt(previousHearts, 10);

        previousLike.textContent = `${currentCount} has been liked ${numberOfHearts + 1} times`;

    } else { // if we dont find anything we create a new like 
        const newLike = document.createElement('li');
        newLike.textContent = `${currentCount} has been liked 1 time`;
        likes.append(newLike);
    }
}
// Pause the counter, which should:
//  - pause the counter
//  - disable all buttons except the pause button
//  - switch the label on the button from "pause" to "resume"
const pause = document.querySelector('#pause');
pause.addEventListener('click', pauseResume);

let activeTime = true;

function pauseResume(){  //if statement, set active time a boolean-> true, toggle with if else statement-> set text contents
    
    const buttonArray = Array.from(document.getElementsByTagName('button'));
    const noPauseButton = buttonArray.filter(buttonArray => buttonArray.id != 'pause');
    console.log(noPauseButton);

    if (activeTime) {
        clearInterval(timer);
        pause.textContent = "resume";
        // toggleActivities();
    } else {
        startTimer();
        pause.textContent = "pause";
        // toggleActivities();
    }

    // can put toggle here since youre doing in both if and else

    toggleActivities(noPauseButton);
}

function toggleActivities(noPauseButton){
    noPauseButton.forEach(buttonArray => buttonArray.disabled = activeTime) // can refactor
    activeTime = !activeTime;
}


// Click the "restart" button to restart the counter and re-enable the buttons.


// Leave comments on my gameplay, such as: "Wow, what a fun game this is."
const comments = document.querySelector('#list');
const commentForm = document.querySelector('#comment-form');
commentForm.addEventListener('submit', displayComment); //form is handling the submission and holding on to the data

function displayComment(event){ //event target is always the thing we are are listening for the event on, has event listener
    event.preventDefault(); //every time we submit a form it reloads the page

    const commentFormData = new FormData(event.target);
    const commentText = commentFormData.get("comment");//name is identifier of input 
    const comment = document.createElement("p");

    comment.textContent = commentText;
    comments.append(comment);

    event.target.reset(); //clears comment box
}

