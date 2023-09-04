export function parseDurationToMilliseconds(durationStr) {
  // Define a regular expression pattern to match the duration components with decimals
  const pattern = /(?:(\d+(?:\.\d+)?)d)?(?:(\d+(?:\.\d+)?)h)?(?:(\d+(?:\.\d+)?)m(?!s))?(?:(\d+(?:\.\d+)?)s)?(?:(\d+(?:\.\d+)?)ms)?/;
  const matches = pattern.exec(durationStr);

  // Extract components
  const days = parseFloat(matches[1] || 0);
  const hours = parseFloat(matches[2] || 0);
  const minutes = parseFloat(matches[3] || 0);
  const seconds = parseFloat(matches[4] || 0);
  const milliseconds = parseFloat(matches[5] || 0); 

  // Calculate the total milliseconds
  const totalMilliseconds = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;

  return Math.round(totalMilliseconds);
}
