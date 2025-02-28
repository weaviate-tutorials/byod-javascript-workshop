# BYOD: Vector Databases for AI-driven Web Apps!

At the end of this workshop, you too will have an idea of how to go about building AI-enabled experiences over YOUR data with the latest and greatest from Google models.

> Given at DevFest Stockholm

> Disclaimer: You will have to setup a billing account to use Google Models. Worry not if you don't have that, you can use something else.

## Hello Sweden! 

- [Repo](https://github.com/malgamves/byod-javascript-workshop)
- [Slides](https://drive.google.com/file/d/1BvYjUXTskAvsNWghrUjyUDe_JVoMenzK/view?usp=sharing)

## What are we building today

An AI-powered personal assistant powered by our journal entries.

We'll use...
- Weaviate
- Next.js
- Google (maybe)

### Test Setup

Please have the following installed:

- [Node.js](https://nodejs.org/en/download/current) (v18+): `node -v`
- [VSCode](https://code.visualstudio.com/download) (optional): `code .`
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/downloads-interactive) (optional): `gcloud auth print-access-token` - expires in an hour.

#### Google specifics

1. Setup a project and get our API keys 
2. Add Billing to your account 
3. Install Google Cloud CLI

Project ID can be found [here](https://console.cloud.google.com/welcome).

Now let's chat with Google
> Let's talk with Google! Go [here](https://console.cloud.google.com/vertex-ai/studio/chat).

## What data are we working with? 

Some journal data! Month entries to give as context to our LLM
- Link to data: [Journal entries](./journal.json)


## Test Weaviate connection

1. Make a new folder and run `npm init` in it.
2. Install weaviate-client, typescript and dotenv.
3. Get credentials on Weaviate Cloud
4. Setup [TS config](./tsconfig.json)
5. Create `.env` file.
6. Make a new script file and run it, but before! 


Paste this! 

```ts
  const weaviateURL = process.env.WEAVIATE_URL as string
  const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string
  const googleKey = process.env.GOOGLE_API_KEY as string

  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL, {
    authCredentials: new weaviate.ApiKey(weaviateKey),
    headers: {
      'X-Goog-Vertex-Api-Key': googleKey,  
    }
  })

  console.log("Client details", (await client.getMeta()).version)
```

## Importing data

1. Create a file called `load.ts`
2. Let's import data with `insertMany()`! 
    - Data [link](./journal.json)
3. Run code! 

## Searching for Data

1. Create a file called `query.ts`
2. Play with Search using `nearText()`
3. Run code! 
4. What do our vectors look like?


## RAG! Retrieval Augmented Generation

1. Let's play with `generate.nearText()`
2. Prompting 🪄
3. Different types of context! Grouped or Single


## Better Search
How can we improve retrieval?

### Hybrid Search

The best of both worlds! 
1. Alpha and Fusion algorithms

### Filters and Aggregates
Can we drill down into our data?

1. Filtering on properties
2. Aggregate queries


## Building our App

1. Clone - https://github.com/weaviate-tutorials/nextjs-weaviate-template
2. Run `yarn install` and `yarn dev`
3. What are we looking at?
4. Let's make it our own! 


## Resources

- [Weaviate Academy](https://weaviate.io/developers/academy)
- [Weaviate x JavaScript](https://weaviate.io/javascript)

## Definitions

Refer to slides! Weaviate [Knowledge cards](https://weaviate.io/learn/knowledgecards) help a lot too! 

