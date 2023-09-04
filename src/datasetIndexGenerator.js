import fs from 'fs/promises';
import path from 'path';
import { generateDatasetIndex } from './api.js';

export default async function (size, filename) {
  const fileContent = await generateDatasetIndex(size);

  const directory = path.dirname(filename);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filename, fileContent);
}
