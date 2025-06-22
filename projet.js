let randomNumber, maxAttempts, rangeMax, attemptsLeft;
let timer, timeStart;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

document.getElementById("bestScore").textContent = bestScore;

function setDifficulty(level) {
    const config = {
        easy: { max: 50, attempts: 10 },
        medium: { max: 100, attempts: 7 },
        hard: { max: 200, attempts: 5 }
    };

    rangeMax = config[level].max;
    maxAttempts = config[level].attempts;
    attemptsLeft = maxAttempts;
    randomNumber = Math.floor(Math.random() * rangeMax) + 1;

    document.getElementById("rangeMax").textContent = rangeMax;
    document.getElementById("attemptsLeft").textContent = attemptsLeft;
    document.getElementById("feedback").textContent = "";
    document.getElementById("game").style.display = "block";
    document.getElementById("score").textContent = score;

    startTimer();
}

function makeGuess() {
    const input = document.getElementById("guessInput");
    const guess = parseInt(input.value);
    if (isNaN(guess)) return;

    if (guess === randomNumber) {
        document.getElementById("feedback").textContent = "🎉 Bravo, c’est correct !";
        score += attemptsLeft * 10;
        stopTimer();
        updateScores();
        showStars(); // 👈 Affiche le message de félicitations
    } else {
        attemptsLeft--;
        document.getElementById("feedback").textContent = guess < randomNumber ? "📈 Trop petit !" : "📉 Trop grand !";
        document.getElementById("attemptsLeft").textContent = attemptsLeft;
        if (attemptsLeft <= 0) {
            document.getElementById("feedback").textContent = `💀 Perdu ! Le nombre était ${randomNumber}`;
            stopTimer();
        }
    }

    input.value = "";
}

function updateScores() {
    document.getElementById("score").textContent = score;
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScore").textContent = bestScore;
    }
}

function resetGame() {
    document.getElementById("game").style.display = "none";
    clearInterval(timer);
    document.getElementById("timer").textContent = "00:00";
    score = 0;

    // 👇 Cache les étoiles et le message "Bravo"
    const stars = document.getElementById("stars-container");
    if (stars) {
        stars.style.display = "none";
    }
}

// ⏱ Timer
function startTimer() {
    timeStart = Date.now();
    timer = setInterval(() => {
        const diff = Math.floor((Date.now() - timeStart) / 1000);
        const min = String(Math.floor(diff / 60)).padStart(2, '0');
        const sec = String(diff % 60).padStart(2, '0');
        document.getElementById("timer").textContent = `${min}:${sec}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// ✨ Fonction pour afficher les étoiles animées
function showStars() {
    const stars = document.getElementById("stars-container");
    if (stars) {
        stars.style.display = "block";
    }
}
