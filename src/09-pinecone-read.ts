// https://docs.pinecone.io/reference/api/2025-04/data-plane/list

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import {configDotenv} from "dotenv";

configDotenv()

// Pinecone client
const pineClient = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY || '' });

async function pineconeRead() {
    //pineClient.listIndexes().then(console.info);
    const index = pineClient.index(
        process.env.PINECONE_INDEX_NAME || '', process.env.PINECONE_INDEX_HOST || '', {});

    // Fetch vectors
    //index.fetch(['044c3dcf-0d27-406d-b9c6-e56859bd1d6d']).then(console.info)

    // List vector IDs.
    // listPaginated returns up to 100 IDs at a time by default in sorted order (bitwise “C” collation).
    const results = await index.listPaginated({ limit: 5 });
    console.info(results)

    const ids = results.vectors?.map(vector => vector.id || '' )
    index.fetch(ids || []).then(console.info)

    // Get next pagination
    // index.listPaginated({ paginationToken: results.pagination?.next}).then(console.info);

    // TODO: https://docs.pinecone.io/reference/api/2025-04/data-plane/query

}

pineconeRead()