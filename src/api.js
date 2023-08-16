import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateDatasetIndex(size) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
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
    temperature: 1,
    max_tokens: 7500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].message.content;
}

export async function generateDatasetFileContent(filename) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
      "role": "system",
      "content": "in the context of an encounter with a peaceful alien civilization called Xalaxians you have the task of generating files for a dataset with the results of research conducted by humans in order to learn about the Xalaxians in any aspect."
    },
    {
      "role": "user",
      "content": `generate the content of the file "${filename}"`
    }
    ],
    temperature: 1,
    max_tokens: 8000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].message.content;
}
