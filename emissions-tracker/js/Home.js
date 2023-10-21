// Sample obituary data
const obituaryData = [73, 82, 65, 75, 79, 68, 71, 74, 76, 81, 78, 67, 72, 77, 69, 80, 83, 70, 85, 84];
const companies = [];
let currentFootPrint = 890;
for (let i = 0; i < 100; i++) {
    companies[i] = "comapany " + 1;

}

const companyName = document.getElementById("name")
companyName.innerHTML += "<i>"+localStorage.getItem("name")+"</i>"

const table = document.getElementById("table_item")
// Count the occurrences of each age
const ageCounts = {};
obituaryData.forEach(age => {
    ageCounts[age] = (ageCounts[age] || 0) + 1;
});

// Extract the ages and counts as separate arrays
const ages = Object.keys(ageCounts).map(Number);
const counts = Object.values(ageCounts);

// Create the histogram chart
const canvas = document.getElementById('histogram');
const ctx = canvas.getContext('2d');
//npm install -g browserify
//browserify index.js -o bundle.js
//Set-ExecutionPolicy RemoteSigned

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ages,
        datasets: [{
            label: 'Obituary Data',
            data: counts,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Age'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                }
            }
        }
    }
});


// Initialize Alan AI with your credentials
const alanKey = '2c5a684d41d9d231cda7666eb8f2b36e2e956eca572e1d8b807a3e2338fdd0dc/stage';
const alanConfig = {
    key: alanKey,
    onCommand: handleAlanCommand,

};
const alan = alanBtn(alanConfig);


//i am handling the command here
function handleAlanCommand(commandData) {
    if (commandData.command.toLowerCase() == 'hello') {
        // Trigger button click
        console.log("i am in this method");
        document.getElementById('helloBtn').click();


    } else if (commandData.command.toLowerCase() == 'about') {
        // Redirect to the home page
        //window.location.href = 'aboutUs.html';
        document.getElementById('aboutUs').click();
    } else if (commandData.command.toLowerCase() == 'home') {
        document.getElementById("home").click();

    } else if (commandData.command.toLowerCase() == 'dashboard') {
        document.getElementById("dashboard").click();
    } else if (commandData.command.toLowerCase() == 'contact') {
        document.getElementById("contactus").click();
    } else if (commandData.command.toLowerCase() == 'currentemission') {
        console.log("i am in this method");
        handlCurrentEmission();
    }
}
//handle current emmision
function handlCurrentEmission() {
    const outputText = "current carbon footPrint is " + currentFootPrint;
    const outputElement = document.createElement('p');
    outputElement.textContent = outputText;
    document.body.appendChild(outputElement);
    alan.playText('Current carbon FootPrint is displayed');

}
// Handle button click
function handleButtonClick() {
    // Output "Hello" on the screen
    const outputText = 'Hello';
    const outputElement = document.createElement('p');
    outputElement.textContent = outputText;
    document.body.appendChild(outputElement);

    // Respond with "Hello" using text-to-speech

    alan.playText('Hello');
}

