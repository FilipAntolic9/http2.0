console.log("Script 4 Loaded!");

function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 1000));
    }
    return array;
}

function logExecutionTime(sortFunction, arr, algorithmName) {
    const startTime = performance.now();
    const sortedArray = sortFunction([...arr]);
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(4);
    console.log(`${algorithmName} took ${timeTaken} milliseconds.`);
    return sortedArray;
}

function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];

        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function jsBuiltInSort(arr) {
    return arr.sort((a, b) => a - b);
}

function compareSortingAlgorithms() {
    const arrSize = 1000;
    const arr = generateRandomArray(arrSize);

    console.log(`Comparing sorting algorithms with an array of size ${arrSize}:`);
    logExecutionTime(bubbleSort, arr, "Bubble Sort");
    logExecutionTime(selectionSort, arr, "Selection Sort");
    logExecutionTime(insertionSort, arr, "Insertion Sort");
    logExecutionTime(mergeSort, arr, "Merge Sort");
    logExecutionTime(quickSort, arr, "Quick Sort");
    logExecutionTime(heapSort, arr, "Heap Sort");
    logExecutionTime(jsBuiltInSort, arr, "JavaScript Built-In Sort");
}




// ,---,.
// ,'  .' |
// ,---.'   |
// |   |   .'
// :   :  :
// :   |  |-,
// |   :  ;/|
// |   |   .'
// '   :  '
// |   |  |
// |   :  \
// |   | ,'
// `----'     




