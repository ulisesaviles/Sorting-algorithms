let arrayOfValues = [];

function setUp(docName) {
  for (let i = 0; i < 20; i++) {
    arrayOfValues[i] = i;
  }
  console.log(docName);
  for (let i = 0; i < 20; i++) {
    document.getElementById(`bar${i}`).style.height = `${25 * i}px`;
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
  document.getElementById(`bar${index1}`).style.height = `${
    25 * arrayOfValues[index1]
  }px`;
  document.getElementById(`bar${index2}`).style.height = `${
    25 * arrayOfValues[index2]
  }px`;
}

function run() {
  setUp(document.getElementById("page_title").innerHTML);
  swapValues(18, 0);
  // updateAllValues();
}

function shuffle() {}

function bubbleSort() {}

function modifiedBubbleSort() {}

function selectionSort() {}

function insertionSrot() {}

function quickSort() {}

function mergeSort() {}

run();
