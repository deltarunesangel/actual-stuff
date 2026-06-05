
let sanctuary = false;
const submitButton = document.getElementById("submit-button");
const codeInput = document.getElementById("code-input");
const beginning = document.getElementById("the-whole-hog");
const portfolio = document.getElementById("portfolio");
const musica = document.getElementById("please-work");
// window.addEventListener('click', function() {
//     if(sanctuary===false){
//         document.getElementById("please-work").src = "https://www.youtube.com/embed/QQQq1T06lYg?autoplay=1&loop=1&playlist=QQQq1T06lYg";
//         sanctuary = true;
//     }

// });
submitButton.addEventListener('click', function() {
    if(codeInput.value === "42"){
        console.log("welcome to the sanctuary, you may now enjoy the fruits of your labor :)");
         document.getElementById("please-work").src = "https://www.youtube.com/embed/QQQq1T06lYg?autoplay=1&loop=1&playlist=QQQq1T06lYg";
        sanctuary = true;
        portfolio.style.display = "block";
        setTimeout(function() {
        beginning.classList.add("fade-out");
        portfolio.classList.add("fade-in");
        }, 10); // Delay to allow the fade-out animation to start
        setTimeout(function() {
        beginning.style.display = "none";
        }, 1000); // Match the duration of the fade-out animation
    }
    else{
        alert("wrong code, try again :P");
        codeInput.value = "";
    }


});
