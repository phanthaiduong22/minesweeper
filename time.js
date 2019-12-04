let h1;
let seconds = 0; let minutes = 0; let hours = 0;
let t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    if (canClickCanvas == true)
        timer();
    console.log(canClickCanvas);
}
timer();
function timer() {
    t = setTimeout(add, 1000);
}