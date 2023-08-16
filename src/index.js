import readline from 'readline';
import datasetIndexGenerator from './datasetIndexGenerator.js';
import datasetFileGenerator from './datasetFileGenerator.js';

const DEFAULT_DATASET_INDEX_SIZE = 10;
const DEFAULT_DATASET_INDEX_FILENAME = 'dataset/index.txt';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log("========== MENU ==========");
  console.log("1. Generate Dataset Index");
  console.log("2. Generate Dataset Files");
  console.log("3. Exit");
  console.log("==========================");
}

function clearConsole() {
  console.clear();
}

function reset() {
  clearConsole();
  promptForMenu();
}

function handleMenuSelection(selection) {
  switch (selection) {
    case '1':
      rl.question(`Dataset size (${DEFAULT_DATASET_INDEX_SIZE}):`, (size) => {
        rl.question(`Generated file name (${DEFAULT_DATASET_INDEX_FILENAME}):`, (filename) => {
          datasetIndexGenerator(size || DEFAULT_DATASET_INDEX_SIZE, filename || DEFAULT_DATASET_INDEX_FILENAME).then(reset);
        });
      });
      break;
    case '2':
      rl.question(`Route to the dataset index file (${DEFAULT_DATASET_INDEX_FILENAME}):`, (filename) => {
        datasetFileGenerator(filename || DEFAULT_DATASET_INDEX_FILENAME).then(reset);
      });
      break;
    case '3':
      rl.close();
      return;
    default:
      clearConsole();
      console.log("Invalid selection. Please choose 1, 2 or 3.");
      promptForMenu();
      break;
  }
}

function promptForMenu() {
  displayMenu();
  rl.question("Please select an option (1, 2 or 3): ", handleMenuSelection);
}

function handleDatasetFileGenerator(fileIndexRoute) {
  console.log(fileIndexRoute);
}

clearConsole();
promptForMenu();
