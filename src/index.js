import readline from 'readline';
import datasetIndexGenerator from './datasetIndexGenerator.js';
import datasetFileGenerator from './datasetFileGenerator.js';
import { DEFAULT_DATASET_FILES_TYPE, DEFAULT_DATASET_INDEX_FILENAME, DEFAULT_DATASET_INDEX_SIZE, LOADING_MESSAGE } from './constants.js';
import { showSpinner } from './utils/showSpinner.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('========== MENU ==========');
  console.log('1. Generate Dataset Index');
  console.log('2. Generate Dataset Files');
  console.log('3. Exit');
  console.log('==========================');
}

function clearConsole() {
  console.clear();
}

function reset(message = '') {
  clearConsole();
  if (message) {
    console.log(message);
  }
  promptForMenu();
}

function handleMenuSelection(selection) {
  switch (selection) {
    case '1':
      rl.question(`Dataset size (${DEFAULT_DATASET_INDEX_SIZE}): `, (size) => {
        rl.question(`Generated file name (${DEFAULT_DATASET_INDEX_FILENAME}): `, (filename) => {
          const showSpinnerId = showSpinner(LOADING_MESSAGE);
          datasetIndexGenerator(size || DEFAULT_DATASET_INDEX_SIZE, filename || DEFAULT_DATASET_INDEX_FILENAME).then(() => {
            clearInterval(showSpinnerId);
            reset('Index created.');
          });
        });
      });
      break;
    case '2':
      rl.question(`Route to the dataset index file (${DEFAULT_DATASET_INDEX_FILENAME}): `, (filename) => {
        console.log('Dataset Files type')
        console.log('1. txt');
        console.log('2. pdf');
        rl.question(`Please select an option (${DEFAULT_DATASET_FILES_TYPE}): `, (filesType) => {
          const showSpinnerId = showSpinner(LOADING_MESSAGE);
          datasetFileGenerator(filename || DEFAULT_DATASET_INDEX_FILENAME, getExtension(filesType)).then(() => {
            clearInterval(showSpinnerId);
            reset('Finished processing all files on dataset.');
          });
        });
      });
      break;
    case '3':
      rl.close();
      return;
    default:
      reset('Invalid selection. Please choose 1, 2 or 3.');
      break;
  }
}

function promptForMenu() {
  displayMenu();
  rl.question('Please select an option (1, 2 or 3): ', handleMenuSelection);
}

function getExtension(selection) {
  switch(selection) {
    case '2':
      return 'pdf';
    case '1':
    default:
      return 'txt';
  }
}

reset();
