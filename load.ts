import weaviate, { WeaviateClient } from 'weaviate-client'
import 'dotenv/config'

async function main() {

  const weaviateURL = process.env.WEAVIATE_URL as string
  const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string
  const googleKey = process.env.GOOGLE_API_KEY as string

  // Step 1: Connect to your Weaviate instance  
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL, {
    authCredentials: new weaviate.ApiKey(weaviateKey),
    headers: {
      'X-Goog-Vertex-Api-Key': googleKey,  // Replace with your inference API key
    }
  })

  console.log("client", (await client.getMeta()).version)

  // Delete the Journal collection if it exists
  await client.collections.delete('personal_journal');

  if (await client.collections.exists('personal_journal') == false) {
    // Step 2: Create a collection with both a vectorizer and generative model
    await client.collections.create({
      name: 'personal_journal',
      // Define your Google vectorizer and generative model  
      vectorizers: weaviate.configure.vectorizer.text2VecGoogle({
        sourceProperties: ['title','text'],
        projectId: '<google-cloud-project-id>',
        modelId: 'text-embedding-004'
      }),
      generative: weaviate.configure.generative.google({
        projectId: '<google-cloud-project-id>',  // semi-random-dev
    modelId: 'gemini-1.0-pro'
      })
    });

    try {
      let myCollection = client.collections.get('personal_journal');

      const url = 'https://raw.githubusercontent.com/weaviate-tutorials/byov-javascript-workshop/main/journal.json'
      const response = await fetch(url);
      const wikipediaPages = await response.json();

      

    } catch (e) {
      console.error(e);
    }
  }

  await client.close()
}

void main();