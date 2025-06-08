import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { configDotenv } from 'dotenv'
import { loadPdf } from './01-loader'

configDotenv()

async function ask() {
    const docs = await loadPdf()

    const chat = new ChatOpenAI({ model: 'gpt-4o-mini'})
    const messages = [
        new SystemMessage("Haz un resumen del contenido que te suministro"),
        new HumanMessage(docs[0].pageContent),
    ];

     let aiResponse = await chat.invoke(messages);
     console.log('--------------------------------------')
     console.info(aiResponse)
}

ask()
