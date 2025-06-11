// https://docs.pinecone.io/reference/api/2025-04/data-plane/query

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from '@langchain/openai'
import {configDotenv} from "dotenv";

configDotenv()

// Pinecone client
const pineClient = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY || '' });

async function pineconeSearch() {
    //pineClient.listIndexes().then(console.info);
    const index = pineClient.index(
        process.env.PINECONE_INDEX_NAME || '', process.env.PINECONE_INDEX_HOST || '', {}
    );

    const model = new OpenAIEmbeddings()
    const embedding = await model.embedQuery('Qué cosméticos se vendría más en el mercado?')

    const queryResponse = await index.query({
        // vector: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // Vector dimension 8 does not match the dimension of the index 1536
        vector: embedding,
        topK: 3,  // required
        includeMetadata: true,
    });

    console.info(queryResponse)

}

pineconeSearch().then(() => console.info('Done'))