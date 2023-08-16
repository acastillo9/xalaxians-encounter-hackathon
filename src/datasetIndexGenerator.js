import fs from 'fs';
import path from 'path';
import { generateDatasetIndex } from './api.js';

export default async function (size, filename) {
  const fileContent = await generateDatasetIndex(size);

  const directory = path.dirname(filename);
  fs.mkdir(directory, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(filename, fileContent, (err) => {
      if (err) throw err;
      console.log('Data written to file.');
      return;
    });
  });
}
