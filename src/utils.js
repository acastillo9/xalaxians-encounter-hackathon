export function formatFilename(name, type = 'txt') {
  return `${name.toLowerCase().replaceAll(' ','_')}.${type}`;
}
