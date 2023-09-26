import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import readline from 'readline';
import path from 'path';
import { generateDatasetFileContent } from "./api.js";
import { formatFilename } from './utils/formatFilename.js';
import PDFDocument from 'pdfkit';
import { consoleWrite } from './utils/consoleWrite.js';
import {templateWrite} from "./utils/templateWrite.js";

export default async function (indexFilename, filesType) {

  const fileStream = createReadStream(indexFilename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const directory = path.dirname(indexFilename);
  for await (const filename of rl) {
    const fileContent = await generateDatasetFileContent(filename);

    const filePath = `${directory}/${formatFilename(filename, filesType)}`;
    await writeFile(filePath, fileContent, filesType, filename);
    consoleWrite(`File "${filePath}" generated.`);
  }
}

async function writeFile(filePath, fileContent, fileType, filename) {
  switch(fileType) {
    case 'docx':
      const fileContentInTemplateDocx = await templateWrite(
          './src/templates/format.docx', {title: filename, content: fileContent}
      );
      await fs.writeFile(filePath, fileContentInTemplateDocx);
      break;
    case 'xlsx':
      const fileContentInTemplateXlsx = await templateWrite(
          './src/templates/format.xlsx', {title: filename, content: fileContent.split('\n')}
      );
      await fs.writeFile(filePath, fileContentInTemplateXlsx);
      break;
    case 'pdf':
      const doc = new PDFDocument();
      doc.pipe(createWriteStream(filePath));
      doc.text(fileContent, 100, 100);
      doc.end();
    case 'txt':
    default:
      await fs.writeFile(filePath, fileContent);
  }
}
