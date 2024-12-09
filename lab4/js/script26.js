console.log("Loading...");
console.log("Script 6 loaded");

function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayTimeBasedGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Dobro jutro!";
    } else if (hours < 18) {
        greeting = "Dobar dan!";
    } else {
        greeting = "Dobro vecer!";
    }

    const greetingElement = document.createElement("h2");
    greetingElement.textContent = greeting;
    greetingElement.style.color = "#007bff";
    greetingElement.style.textAlign = "center";
    document.body.insertBefore(greetingElement, document.body.firstChild);
}

function changeBackgroundColor() {
    const colors = ["#aaaafa", "#ffaafa", "#caafea", "#caeaca", "#ffccbc"];
    const randomColor = colors[getNumber(0, colors.length - 1)];
    document.body.style.backgroundColor = randomColor;
}

function createColourChangeButton() {
    const button = document.createElement("button");
    button.textContent = "Change Background Color";
    button.style.display = "block";
    button.style.margin = "20px auto";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";

    button.addEventListener("click", changeBackgroundColor);

    document.body.appendChild(button);
}

function selectLetters() {
    const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    const listContainer = document.createElement("div");
    const list = document.createElement("ul");

    for (let i = 0; i < 5; i++) {
        const randomIndex = getNumber(0, items.length - 1);
        const listItem = document.createElement("li");
        listItem.textContent = items[randomIndex];
        list.appendChild(listItem);
    }

    listContainer.appendChild(list);
    listContainer.style.textAlign = "center";
    listContainer.style.marginTop = "20px";
    document.body.appendChild(listContainer);
}

function createCountdownTimer(durationInSeconds) {
    let timeLeft = durationInSeconds;
    const timerElement = document.createElement("h3");
    timerElement.style.textAlign = "center";
    timerElement.style.fontSize = "24px";
    document.body.appendChild(timerElement);

    function updateTimer() {
        timerElement.textContent = `Preostalo vrijeme: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Zavrseno!";
            timerElement.style.color = "red";
        }

        timeLeft--;
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

function createBouncingBall() {
    const ball = document.createElement("div");
    ball.style.width = "50px";
    ball.style.height = "50px";
    ball.style.backgroundColor = "#ff5722";
    ball.style.borderRadius = "50%";
    ball.style.position = "absolute";
    ball.style.top = "0";
    ball.style.left = "0";
    document.body.appendChild(ball);

    let x = 0;
    let y = 0;
    let dx = 4;
    let dy = 4;

    function animateBall() {
        x += dx;
        y += dy;

        if (x + 50 > window.innerWidth || x < 0) {
            dx = -dx;
        }

        if (y + 50 > window.innerHeight || y < 0) {
            dy = -dy;
        }

        ball.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animateBall);
    }

    animateBall();
}


function processData() {
    const data = Array.from({ length: 10000 }, () => getNumber(1, 100));
    const sortedData = data.sort((a, b) => a - b);

    console.log("Zavrseno");
    console.log(sortedData.slice(0, 10));
}


// _____
// /\    \
// /::\    \
// /::::\    \
// /::::::\    \
// /:::/\:::\    \
// /:::/__\:::\    \
// /::::\   \:::\    \
// /::::::\   \:::\    \
// /:::/\:::\   \:::\    \
// /:::/  \:::\   \:::\____\
// \::/    \:::\   \::/    /
// \/____/ \:::\   \/____/
//  \:::\    \
//   \:::\____\
//    \::/    /
//     \/____/     





