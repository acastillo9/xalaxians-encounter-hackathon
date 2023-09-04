import { Configuration, OpenAIApi } from 'openai';
import { parseDurationToMilliseconds } from './utils/parseDurationToMilliseconds.js';
import { sleep } from './utils/sleep.js';
import { consoleWrite } from './utils/consoleWrite.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function createChatCompletion(config) {
  let response;
  try {
    response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [],
      temperature: 1,
      max_tokens: 8000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      ...config,
    });
  } catch(error) {
    if(error.response.status !== 429) {
      throw error;
    }
    const remainingTokens = error.response.headers['x-ratelimit-remaining-tokens'];
    if (remainingTokens < config.max_tokens) {
      const resetTokens = error.response.headers['x-ratelimit-reset-tokens'];
      consoleWrite(`Waiting tokens reset in ${resetTokens}...`);

      await sleep(parseDurationToMilliseconds(resetTokens));
      return await createChatCompletion(config);
    }
    const remainingRequests = error.response.headers['x-ratelimit-remaining-requests'];
    if (remainingRequests <= 0) {
      const resetRequests = error.response.headers['x-ratelimit-reset-requests'];
      consoleWrite(`Waiting requests reset in ${resetRequests}...`);
      await sleep(parseDurationToMilliseconds(resetRequests));
      return await createChatCompletion(config);
    }
    return '';
  }
  return response.data.choices[0].message.content;
}

export async function generateDatasetIndex(size) {
  return createChatCompletion({
    messages: [
      {
        "role": "system",
        "content": "in the context of an encounter with a peaceful alien civilization called Xalaxians you have the task of generating a dataset index with the titles of files containing researchs conducted by humans in order to learn about the Xalaxians in any aspect, do not enumerate the titles, do not use quotes, separate the words with space."
      },
      {
        "role": "user",
        "content": `generate the dataset index for ${size} files`
      },
    ],
    max_tokens: 7500,
  });
}

export async function generateDatasetFileContent(filename) {
  const config = {
    messages: [
      {
        "role": "system",
        "content": "in the context of an encounter with a peaceful alien civilization called Xalaxians you have the task of generating the files of a dataset with the results of researchs carried out by humans in order to learn about the Xalaxians in every aspect."
      },
      {
        "role": "user",
        "content": `generate the content of the file "${filename}"`
      }
    ],
    max_tokens: 8000,
  };
  return createChatCompletion(config);
}
