function setUp(docName) {
  for (let i = 0; i < 20; i++) {
    arrayOfValues[i] = i;
  }
  console.log(docName);
  for (let i = 0; i < 20; i++) {
    document.getElementById(`bar${i}`).style.height = `${25 * i}px`;
  }
  document.getElementById("shuffle_btn").onclick = shuffle;
  if (docName == "Bubble Sort") {
    document.getElementById("sort_btn").onclick = bubbleSort;
  } else if (docName == "Modified Bubble Sort") {
    document.getElementById("sort_btn").onclick = modifiedBubbleSort;
  } else if (docName == "Selection Sort") {
    document.getElementById("sort_btn").onclick = selectionSort;
  } else if (docName == "Insertion Sort") {
    document.getElementById("sort_btn").onclick = insertionSort;
  } else if (docName == "Quick Sort") {
    document.getElementById("sort_btn").onclick = quickSort;
  } else if (docName == "Merge Sort") {
    document.getElementById("sort_btn").onclick = mergeSort;
  }
}

function updateAllValues() {
  for (let i = 0; i < 20; i++) {
    document.getElementById(`bar${i}`).style.height = `${
      25 * arrayOfValues[i]
    }px`;
  }
}

function swapValues(index1, index2) {
  instructionNumber++;
  aux = arrayOfValues[index1];
  arrayOfValues[index1] = arrayOfValues[index2];
  arrayOfValues[index2] = aux;
  swapHistorial[instructionNumber] = [
    [index1, arrayOfValues[index1]],
    [index2, arrayOfValues[index2]],
  ];
}

function run() {
  setUp(document.getElementById("page_title").innerHTML);
}

function shuffle() {
  let states = [];
  let counter = 0;
  for (let i = 0; i < arrayOfValues.length; i++) {
    states[i] = false;
  }
  for (let i = 0; counter < arrayOfValues.length; i++) {
    while (true) {
      randInt = Math.round(Math.random() * 19);
      if (states[randInt] == false) {
        states[randInt] = true;
        arrayOfValues[i] = randInt;
        counter++;
        break;
      }
    }
  }
  updateAllValues();
}

function displayChanges() {
  for (let i = 0; i < swapHistorial.length; i++) {
    setTimeout(() => {
      index1 = swapHistorial[i][0][0];
      index2 = swapHistorial[i][1][0];
      value1 = swapHistorial[i][0][1];
      value2 = swapHistorial[i][1][1];
      document.getElementById(`bar${index1}`).style.height = `${25 * value1}px`;
      document.getElementById(`bar${index2}`).style.height = `${25 * value2}px`;
    }, i * 100);
  }
}

function bubbleSort() {
  instructionNumber = 0;
  for (var i = 0; i < arrayOfValues.length; i++) {
    for (var j = 0; j < arrayOfValues.length - 1; j++) {
      if (arrayOfValues[j] > arrayOfValues[j + 1]) {
        swapValues(j, j + 1);
      }
    }
  }
  displayChanges();
}

function modifiedBubbleSort() {
  swapValues(2, 0);
}

function selectionSort() {
  swapValues(3, 0);
}

function insertionSort() {
  swapValues(4, 0);
}

function quickSort() {
  swapValues(5, 0);
}

function mergeSort() {
  swapValues(6, 0);
}

window.onload = run;
let arrayOfValues = [];
let instructionNumber;
let swapHistorial = [];
let copyOfValues;
run();
