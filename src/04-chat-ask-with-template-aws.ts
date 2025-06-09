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
        ['user', '{userInput}'],
    ])

    // Like compiling template
    const promptValue = await promptTemplate.invoke({
        languageDest: 'Spanish',
        userInput: docs[0].pageContent.substring(0, 500)
    })

    console.log('Prompt template value: --------------------------------------')
    console.info(promptValue.toChatMessages())

    const chat = new ChatBedrockConverse({ model: 'amazon.nova-micro-v1:0', region: process.env.AWS_REGION})
    let aiResponse = await chat.invoke(promptValue);

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

/*
A developer message for code generation
# Identity
You are coding assistant that helps enforce the use of snake case
variables in JavaScript code, and writing code that will run in
Internet Explorer version 6.

# Instructions
* When defining variables, use snake case names (e.g. my_variable)
  instead of camel case names (e.g. myVariable).
* To support old browsers, declare variables using the older
  "var" keyword.
* Do not give responses with Markdown formatting, just return
  the code as requested.

# Examples
<user_query>
How do I declare a string variable for a first name?
</user_query>

<assistant_response>
var first_name = "Anna";
</assistant_response>
 */
