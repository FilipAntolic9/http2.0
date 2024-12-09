console.log("Script 2 Loaded!");

const list = ["#aaaafa", "#ffaafa", "#caafea", "#caeaca", "#ffccbc", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

function getRandomElement1() {
    const randomIndex = Math.floor(Math.random() * list.length);
    console.log(`Random element (1): ${list[randomIndex]}`);
}


function getRandomElement2() {
    const randomElement = list[Math.floor(Math.random() * list.length)];
    console.log(`Random element (2): ${randomElement}`);
}

function shuffleArray(arr) {
    const shuffledArray = [...arr];
    let currentIndex = shuffledArray.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }

    return shuffledArray;
}

function getRandomElement3() {
    const shuffled = shuffleArray(list);
    console.log(`Random element (3): ${shuffled[0]}`);
}

function getRandomElementSet() {
    const randomSet = new Set();
    while (randomSet.size < 1) {
        randomSet.add(list[Math.floor(Math.random() * list.length)]);
    }
    console.log(`Random element (Set): ${[...randomSet][0]}`);
}

function getRandomElement4(weights) {
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    const randomWeight = Math.random() * totalWeight;

    let weightSum = 0;
    for (let i = 0; i < list.length; i++) {
        weightSum += weights[i];
        if (randomWeight <= weightSum) {
            console.log(`Random element (4): ${list[i]}`);
            return;
        }
    }
}

const weights = [130, 500, 123, 83, 2, 41, 3, 13, 29, 7];

function getRandomSample(arr, sampleSize) {
    if (sampleSize > arr.length) {
        return;
    }

    const sample = [];
    const arrCopy = [...arr];

    for (let i = 0; i < sampleSize; i++) {
        const randomIndex = Math.floor(Math.random() * arrCopy.length);
        sample.push(arrCopy.splice(randomIndex, 1)[0]);
    }

    console.log(`Random sample: ${sample.join(", ")}`);
}

function getRandomSample2(arr, sampleSize) {
    const sample = [];
    for (let i = 0; i < sampleSize; i++) {
        sample.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    console.log(`Random sample (2): ${sample.join(", ")}`);
}

function getRandomMultipleElements(numElements) {
    const shuffled = shuffleArray(list);
    const selected = shuffled.slice(0, numElements);
    console.log(`Random multiple elements: ${selected.join(", ")}`);
}

function getRandomElementFromNestedArray() {
    const nestedArray = [
        ["A", "B"],
        ["C", "D"],
        ["E", "F"],
        ["G", "H"],
        ["I", "J"],
        [1, 2],
        [3, 4]
    ];
    const randomGroupIndex = Math.floor(Math.random() * nestedArray.length);
    const randomElementIndex = Math.floor(Math.random() * nestedArray[randomGroupIndex].length);
    console.log(`Random element from nested array: ${nestedArray[randomGroupIndex][randomElementIndex]}`);
}

function getRandomElementFromObject() {
    const obj = {
        letters: ["A", "B", "C"],
        numbers: ["1", "2", "3"],
        alnum: ["A1", "B2", "C3"]
    };

    const randomCategory = Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
    const randomItem = obj[randomCategory][Math.floor(Math.random() * obj[randomCategory].length)];

    console.log(`Random element from object: ${randomItem} (Category: ${randomCategory})`);
}

function getRandomElementFromPattern() {
    const regexPattern = /^A/;
    const matchingItems = list.filter(item => regexPattern.test(item));
    if (matchingItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingItems.length);
        console.log(`Random element matching pattern: ${matchingItems[randomIndex]}`);
    } else {
        console.log("No elements match the pattern.");
    }
}

function getRandomElementMap() {
    const mappedList = new Map();
    list.forEach((item, index) => {
        mappedList.set(index, item);
    });

    const randomKey = Math.floor(Math.random() * list.length);
    console.log(`Random element from Map: ${mappedList.get(randomKey)}`);
}

function initializeRandomSelections() {
    getRandomElement1();
    getRandomElement2();
    getRandomElement3();
    getRandomElementSet();
    getRandomElement4(weights);
    getRandomSample(list, 3);
    getRandomSample2(list, 5);
    getRandomMultipleElements(4);
    getRandomElementFromNestedArray();
    getRandomElementFromObject();
    getRandomElementFromPattern();
    getRandomElementMap();
}
