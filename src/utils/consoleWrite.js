export function consoleWrite(message) {
  process.stdout.clearLine();
  process.stdout.write('\r' + message + '\n');
}
