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
    document.getElementById("sort_btn").onclick = qs;
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
  aux = arrayOfValues[index1];
  arrayOfValues[index1] = arrayOfValues[index2];
  arrayOfValues[index2] = aux;
  swapHistorial[instructionNumber] = [
    [index1, arrayOfValues[index1]],
    [index2, arrayOfValues[index2]],
  ];
  instructionNumber++;
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
  index1D = 0;
  index2D = 0;
  for (let i = 0; i < swapHistorial.length; i++) {
    setTimeout(() => {
      document.getElementById(`bar${index1D}`).style.backgroundColor = "white";
      document.getElementById(`bar${index2D}`).style.backgroundColor = "white";
      index1D = swapHistorial[i][0][0];
      index2D = swapHistorial[i][1][0];
      value1D = swapHistorial[i][0][1];
      value2D = swapHistorial[i][1][1];
      if (swapHistorial.length - i > 1) {
        document.getElementById(`bar${index1D}`).style.backgroundColor = "red";
        document.getElementById(`bar${index2D}`).style.backgroundColor = "red";
      }
      document.getElementById(`bar${index1D}`).style.height = `${
        25 * value1D
      }px`;
      document.getElementById(`bar${index2D}`).style.height = `${
        25 * value2D
      }px`;
    }, i * 100);
  }
}

function bubbleSort() {
  instructionNumber = 0;
  swapHistorial = [];
  for (var i = 0; i < arrayOfValues.length; i++) {
    for (var j = 0; j < arrayOfValues.length - 1; j++) {
      if (arrayOfValues[j] > arrayOfValues[j + 1]) {
        swapValues(j, j + 1);
      }
    }
  }
  console.log(swapHistorial);
  displayChanges();
}

function modifiedBubbleSort() {
  instructionNumber = 0;
  swapHistorial = [];
  let flag;
  for (let i = 0; i < arrayOfValues.length; i++) {
    flag = false;
    for (let j = 0; j < arrayOfValues.length - 1; j++) {
      if (arrayOfValues[j] > arrayOfValues[j + 1]) {
        swapValues(j, j + 1);
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  console.log(swapHistorial);
  displayChanges();
}

function selectionSort() {
  instructionNumber = 0;
  swapHistorial = [];
  let currentMin;
  let currentMinPosition = 0;
  for (let i = 0; i < arrayOfValues.length; i++) {
    currentMin = arrayOfValues[i];
    for (let j = i; j < arrayOfValues.length; j++) {
      if (arrayOfValues[j] <= currentMin) {
        currentMin = arrayOfValues[j];
        currentMinPosition = j;
      }
    }
    for (; currentMinPosition > i; currentMinPosition--) {
      swapValues(currentMinPosition, currentMinPosition - 1);
    }
  }
  console.log(swapHistorial);
  displayChanges();
}

function insertionSort() {
  instructionNumber = 0;
  swapHistorial = [];
  for (let i = 0; i < arrayOfValues.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arrayOfValues[j - 1] >= arrayOfValues[j]) {
        swapValues(j, j - 1);
      } else {
        break;
      }
    }
  }
  console.log(swapHistorial);
  displayChanges();
}

function quickSort(a, bottomLimit, topLimit) {
  bottomLimit = bottomLimit != undefined ? bottomLimit : 0;
  topLimit = topLimit != undefined ? topLimit : arrayOfValues.length - 1;

  if (
    topLimit - bottomLimit <= 0 ||
    bottomLimit < 0 ||
    topLimit >= arrayOfValues.length
  ) {
    return;
  }

  pivotPos = Math.round(Math.random() * (topLimit - bottomLimit)) + bottomLimit;
  swapValues(pivotPos, topLimit);
  pivotPos = topLimit;
  topLimit = pivotPos - 1;

  for (let itemFromLeft_index, itemFromRight_index; ; ) {
    for (let i = bottomLimit; i <= topLimit; i++) {
      if (arrayOfValues[i] > arrayOfValues[pivotPos]) {
        itemFromLeft_index = i;
        break;
      }
    }
    for (let i = topLimit; i >= bottomLimit; i--) {
      if (arrayOfValues[i] < arrayOfValues[pivotPos]) {
        itemFromRight_index = i;
        break;
      }
    }

    if (itemFromLeft_index > itemFromRight_index) {
      swapValues(pivotPos, itemFromLeft_index);
      pivotPos = itemFromLeft_index;
      topLimit++;
      quickSort("", bottomLimit, pivotPos - 1);
      quickSort("", pivotPos + 1, topLimit);
      return;
    } else if (itemFromLeft_index == undefined) {
      topLimit = pivotPos - 1;
      quickSort("", bottomLimit, topLimit);
      return;
    } else if (itemFromRight_index == undefined) {
      swapValues(pivotPos, bottomLimit);
      pivotPos = bottomLimit;
      bottomLimit++;
      topLimit++;
      bottomLimit = pivotPos + 1;
      quickSort("", bottomLimit, topLimit);
      return;
    }

    swapValues(itemFromLeft_index, itemFromRight_index);
    itemFromLeft_index = undefined;
    itemFromRight_index = undefined;
  }
}

function qs() {
  instructionNumber = 0;
  swapHistorial = [];
  quickSort();
  console.log(swapHistorial);
  displayChanges();
}

function mergeSort() {
  swapValues(6, 0);
}

window.onload = run;
let arrayOfValues = [];
let instructionNumber;
let swapHistorial = [];
let index1D;
let index2D;
let value1D;
let value2D;
run();
