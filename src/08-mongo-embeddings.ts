// https://js.langchain.com/docs/integrations/vectorstores/
// https://js.langchain.com/docs/tutorials/rag/
import { BedrockEmbeddings } from "@langchain/aws";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"
import { Document } from "@langchain/core/documents";
import { MongoClient } from "mongodb";
import {configDotenv} from "dotenv";

configDotenv()

// Embedding model
const embeddings = new BedrockEmbeddings({
    model: "amazon.titan-embed-text-v2:0",
    region: process.env.AWS_REGION,
});

// Vector store database connection
const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
const collection = client
    .db(process.env.MONGODB_ATLAS_DB_NAME)
    .collection(process.env.MONGODB_ATLAS_COLLECTION_NAME || 'embeddingsdb');

// Set vector store with the embedding model
const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection,
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "embedding",
});

// Load Documents : Document[]
const docs = [
    new Document({ pageContent: 'This is the first document to be embedded' }),
    new Document({ pageContent: 'I am an other document to be embedded' }),
]
const ids = ['id1', 'id2']  // ids to be used, I mean _id

// Save embeddings, langchain call embedding model for each Document
vectorStore.addDocuments(docs, { ids }).then(console.info)

// Doesn't mongodb community support vector search ?
// console.info(vectorStore.similaritySearch('This is the first document to be embedded'))

