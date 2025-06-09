import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import {loadPdf} from "./01-loader";

const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`;

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 2,
    //lengthFunction: (text) => text.length,
})

// split text
splitter.splitText(text).then(console.log).catch(console.error)

// create Documents from texts
splitter.createDocuments([text]).then(console.info).catch(console.error)
/*const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: text }),
]);*/

const splitter2 = new RecursiveCharacterTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 180,  // 15%
    //lengthFunction: (text) => text.length,
})

// split documents
loadPdf().then(async (docs)=> {
    const chunks = await splitter2.splitDocuments(docs)
    //console.log(chunks[10].metadata)
    console.log(chunks)
    console.log('Chunk sizes: ',chunks.length)
})