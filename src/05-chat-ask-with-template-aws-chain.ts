// https://js.langchain.com/docs/tutorials/llm_chain/
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html
// https://js.langchain.com/docs/integrations/chat/bedrock_converse/
import { ChatBedrockConverse } from '@langchain/aws'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { configDotenv } from 'dotenv'
import { loadPdf } from './01-loader'

configDotenv()

async function askWithTemplate() {
    const docs = await loadPdf()

    const systemTemplate = "Translate the following from English into {languageDest}";

    // Chat prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        // https://platform.openai.com/docs/guides/text?api-mode=chat
        // https://js.langchain.com/docs/concepts/messages/#role
        // OpenAI Format: user, developer=system?, assistant
        ['system', systemTemplate],
        ['human', '{userInput}'],  // user = human
    ])

    // Chat
    const chat = new ChatBedrockConverse({ model: 'amazon.nova-micro-v1:0', region: process.env.AWS_REGION})

    // Chain
    // https://js.langchain.com/docs/how_to/sequence/
    const chain = promptTemplate.pipe(chat)

    // Invoke chain
    let aiResponse = await chain.invoke({
        languageDest: 'Spanish',
        userInput: docs[0].pageContent.substring(0, 500)
    });

    console.log('AI Response = AIMessage = assistant: --------------------------------------')
    console.info(aiResponse)

    /*const aiMsg = await chat.invoke([
        [
            "system",
            "You are a helpful assistant that translates English to French. Translate the user sentence.",
        ],
        ["human", "I love programming."],
    ]);*/
}

askWithTemplate()

