import weaviate, { WeaviateClient } from 'weaviate-client'
import 'dotenv/config'

async function main() {

    const weaviateURL = process.env.WEAVIATE_URL as string
    const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string
    const googleKey = process.env.GOOGLE_API_KEY as string

    // Step 1: Connect to your Weaviate database on Weaviate Cloud
    const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL, {
        authCredentials: new weaviate.ApiKey(weaviateKey),
        headers: {
            'X-Goog-Vertex-Api-Key': googleKey,  // Replace with your inference API key
          }
    })

    const myCollection = client.collections.get('personal_journal');

    // Step 2: Make a generative search with a single prompt
    const genResult = await myCollection.generate.nearText('women in the olympics', {
        singlePrompt: "Write a haiku about {text} that includes at least a word from {title}",
    })

    for (const item of genResult.objects) {
        console.log("Single generated concept:", item.generated);
    }

    // Step 3: Make a generative search with a grouped task
    const groupedGenResult = await myCollection.generate.nearText('women in the olympics', {
        groupedTask: "Summarize all the results received in 100 words",
    })

    console.log("Grouped generated concept:", groupedGenResult.generated);

    // Step 4: Filter 
    const resultFilter = await myCollection.query.fetchObjects({
        filters: myCollection.filter.byProperty('person').equal('Mike!'),
        limit: 3,
      })
      
      for (let object of resultFilter.objects) {
        console.log(JSON.stringify(object.properties, null, 2));
      }


    // Step 5: Aggregate
    const resultAgg = await myCollection.aggregate.overAll({
        returnMetrics: myCollection.metrics.aggregate('person')
        .text(
          ['topOccurrencesValue', 'topOccurrencesOccurs'],
          2 // minOccurrences - threshold minimum count
        )
      })
      
      console.log(resultAgg.properties);



  await client.close()
}

void main();