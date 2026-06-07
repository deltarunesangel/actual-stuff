
let sanctuary = false;
const submitButton = document.getElementById("submit-button");
const codeInput = document.getElementById("code-input");
const beginning = document.getElementById("the-whole-hog");
const portfolio = document.getElementById("portfolio");
const musica = document.getElementById("please-work");
const homebtn = document.getElementById("home");
const aboutbtn = document.getElementById("about");
const projectsbtn = document.getElementById("projects");
const aspbtn = document.getElementById("aspirations");
const guestbookbtn = document.getElementById("guestbook");
const homevis = document.getElementById("home-screen");
const aboutvis = document.getElementById("about-screen");
const projectsvis = document.getElementById("projects-screen");
const aspvis = document.getElementById("aspirations-screen");
const guestbookvis = document.getElementById("guestbook-screen");
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50amVremRvamR6cndqbWx5aGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTY2NTUsImV4cCI6MjA5NjQzMjY1NX0.jSOz_CQ_F2S0SUSpyCdOEZqXg8hB0IF5RQs0mV-xkZg";
const supabaseUrl = "https://ntjekzdojdzrwjmlyhcd.supabase.co";
const yipee = supabase.createClient(supabaseUrl, supabaseKey);
const guestbookNameInput = document.getElementById("guestbook-name");
const guestbookMessageInput = document.getElementById("guestbook-message");
const guestbookSubmitButton = document.getElementById("guestbook-submit");
const commentsStream = document.getElementById("comments-stream");
// window.addEventListener('click' function() {
//     if(sanctuary===false){
//         document.getElementById("please-work").src = "https://www.youtube.com/embed/QQQq1T06lYg?autoplay=1&loop=1&playlist=QQQq1T06lYg";
//         sanctuary = true;
//     }

// });
submitButton.addEventListener('click', function () {
    if (codeInput.value === "42") {
        console.log("welcome to the sanctuary, you may now enjoy the fruits of your labor :)");
        musica.src = "https://www.youtube.com/embed/QQQq1T06lYg?autoplay=1&loop=1&playlist=QQQq1T06lYg";
        sanctuary = true;
        portfolio.style.display = "block";
        setTimeout(function () {
            beginning.classList.add("fade-out");
            portfolio.classList.add("fade-in");
        }, 10); // Delay to allow the fade-out animation to start
        setTimeout(function () {
            beginning.style.display = "none";
            alert("you did it! now, prepare to be amazed by the wonders of my portfolio! (also, if you want to see the code for this website, just inspect element and have fun exploring :P)");
        }, 1000); // Match the duration of the fade-out animation
    }
    else {
        alert("wrong code, try again :P");
        codeInput.value = "";
    }


});
homebtn.addEventListener('click', function () {
    homevis.style.display = "block"
    aboutvis.style.display = "none"
    projectsvis.style.display = "none"
    aspvis.style.display = "none"
    guestbookvis.style.display = "none"
    musica.src = "https://www.youtube.com/embed/QQQq1T06lYg?autoplay=1&loop=1&playlist=QQQq1T06lYg";
})
aboutbtn.addEventListener('click', function () {
    homevis.style.display = "none"
    aboutvis.style.display = "block"
    projectsvis.style.display = "none"
    aspvis.style.display = "none"
    guestbookvis.style.display = "none"
    musica.src = "https://www.youtube.com/embed/j6baKyF2Ksc?autoplay=1&loop=1&playlist=j6baKyF2Ksc";
})
projectsbtn.addEventListener('click', function () {
    homevis.style.display = "none"
    aboutvis.style.display = "none"
    projectsvis.style.display = "block"
    aspvis.style.display = "none"
    guestbookvis.style.display = "none"
    musica.src = "https://www.youtube.com/embed/xz61v-lss5g?autoplay=1&loop=1&playlist=xz61v-lss5g";
})
aspbtn.addEventListener('click', function () {
    homevis.style.display = "none"
    aboutvis.style.display = "none"
    projectsvis.style.display = "none"
    aspvis.style.display = "block"
    guestbookvis.style.display = "none"
    musica.src = "https://www.youtube.com/embed/z9e2_xxi6q4?autoplay=1&loop=1&playlist=z9e2_xxi6q4";
})
guestbookbtn.addEventListener('click', function () {
    homevis.style.display = "none"
    aboutvis.style.display = "none"
    projectsvis.style.display = "none"
    aspvis.style.display = "none"
    guestbookvis.style.display = "block"
    musica.src = "https://www.youtube.com/embed/4s0VBDxeEXY?autoplay=1&loop=1&playlist=4s0VBDxeEXY";
})
async function fetchComments() {
    const { data, error } = await yipee
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching comments:", error);
        return;
    }
    commentsStream.innerHTML = "";
    data.forEach(entry => {
        const commentDiv = document.createElement("div");
        commentDiv.style.background = "rgba(0,200,255,0.1)";
        commentDiv.style.padding = "10px";
        commentDiv.style.margin = "10px 0";
        commentDiv.style.borderRadius = "5px";
        commentDiv.innerHTML = `<strong>${entry.name}</strong><p>${entry.message}</p><small>${new Date(entry.created_at).toLocaleString()}</small>`;
        commentsStream.appendChild(commentDiv);
    });
}
guestbookSubmitButton.addEventListener('click', async function () {
    const name = guestbookNameInput.value.trim();
    const message = guestbookMessageInput.value.trim();
    if (name === "" || message === "") {
        alert("Please enter both your name and a message.");
        return;
    }
    const { error } = await yipee
        .from('guestbook')
        .insert([{ name: name, message: message }]);
    if (error) {
        alert("The cloud doesn't want to work right now, try again later :P");
        console.error("Error submitting comment:", error);
    } else {
        guestbookNameInput.value = "";
        guestbookMessageInput.value = "";
    }
});
yipee
    .channel('schema-db-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload) => {
        fetchComments();
    })
    .subscribe();
fetchComments();
