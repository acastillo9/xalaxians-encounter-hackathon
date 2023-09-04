let spinnerIndex = 0;
const spinnerChars = ['|', '/', '-', '\\'];

function writeSpinner(message) {
  process.stdout.write('\r' + message + (message ? ' ' : '') + spinnerChars[spinnerIndex]);
  spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
}

export function showSpinner(message = '') {
  console.clear();
  return setInterval(() => {
    writeSpinner(message);
  }, 200);
}
