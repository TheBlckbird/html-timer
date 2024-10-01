class Timer {
    timerElement = document.getElementById("timer");
    interval;
    alarmAudio = new Audio("alarm.mp3");

    start(time) {
        clearInterval(this.interval);
        this.alarmAudio.pause();

        this.time = time;
        this.advance();

        let self = this;
        this.interval = setInterval(() => {
            console.log(this.interval);
            self.advance();
        }, 1000);
    }

    advance() {
        if (this.time === 0) {
            clearInterval(this.interval);
            this.alarmAudio.play();
        }

        this.timerElement.innerText = this.format(this.time);
        this.time -= 1;
    }

    format(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        if (hours !== 0) {
            hours = hours + ":";
        } else {
            hours = "";
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return hours + minutes + ":" + seconds;
    }
}

let timer = new Timer();
let timeInput = document.getElementById("newTime");

function submitTime() {
    let time = Number(Math.round(timeInput.value));

    if (time <= 0 || time == null) {
        return;
    }

    timeInput.value = null;

    timer.start(time);
}

document.getElementById("submitButton").addEventListener("click", () => {
    submitTime();
});

timeInput.addEventListener("keypress", (e) => {
    if (document.activeElement === timeInput && e.key === "Enter") {
        submitTime();
    }
});
