import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { generateDatasetFileContent } from "./api.js";
import { formatFilename } from './utils.js';

export default async function (indexFilename) {

  const fileStream = fs.createReadStream(indexFilename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const directory = path.dirname(indexFilename);
  for await (const filename of rl) {
    const fileContent = await generateDatasetFileContent(filename);

    fs.writeFile(`${directory}/${formatFilename(filename)}`, fileContent, (err) => {
      if (err) throw err;
      console.log(`File "${filename}" generated.`);
    });
  }

  console.log('Finished processing all lines on index file.');
  return;
}
