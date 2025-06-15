// https://js.langchain.com/docs/tutorials/llm_chain/
// https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html
// https://js.langchain.com/docs/integrations/chat/bedrock_converse/
import { ChatBedrockConverse } from '@langchain/aws'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { configDotenv } from 'dotenv'
import fs from "node:fs";
import { z } from "zod";
import {HumanMessage} from "@langchain/core/messages";

configDotenv()

function getBytes(path: string) {
    const data = fs.readFileSync(path);
    // return data.toString('base64');  // string
    // Buffer.from(data).toString('base64')  // string
    return Buffer.from(data);
}

// https://js.langchain.com/docs/how_to/output_parser_json/
const outputSchema = z.object({
    volcano_name: z.string().describe('Nombre de volcán'),
    analysis_period: z.string().describe('Periodo de análisis, fechas de la forma YYYY-MM-DD separado por una ,'),
    issued_at: z.string().describe('Fecha de emisión en la forma YYYY-MM-DD'),
    alert_level: z.string().describe('Nivel de alerta en colores: verde, amarillo, naranja o rojo'),
    summary: z.string().describe('Resumen'),
    analysis: z.string().describe('el texto en la sección análisis'),
    perspectives: z.string().describe('el texto en la sección perspectivas'),
    recommendations: z.string().describe('recomendaciones')
})

const systemTemplate = `
## Contexto:
Eres un asistente que extrae datos del reportes vulcanológicos escritos en español, en formato json.
(es muy importante que el resultado lo des en json, Responde SOLO con el JSON, sin texto adicional.)

## Tarea:
Extrae datos del documento, que está escrito en español, con las siguientes llaves:
- volcano_name, descripción: Nombre de volcán
- analysis_period, descripción: Periodo de análisis, fechas de la forma YYYY-MM-DD separado por una ','
- issued_at, descripción: Fecha de emisión en la forma YYYY-MM-DD
- alert_level, descripción: Nivel de alerta en colores: verde, amarillo, naranja o rojo
- summary, descripción: Resumen
- analysis, descripción: el texto en la sección análisis
- perspectives, descripción: el texto en la sección perspectivas
- recommendations, descripción: recomendaciones

Respeta las tildes y letras del español en la respuesta.

##Esquema de respuesta:
{{
  "volcano_name": "value",
  "analysis_period": "value",
  "issued_at": "value",
  "alert_level": "value",
  "summary": "value",
  "analysis": "value",
  "perspectives": "value",
  "recommendations": "value"
}}
`;

async function askWithTemplate() {
const base64Image = getBytes(process.env.IMAGE_FILE || '').toString('base64');
    // Chat prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        // https://platform.openai.com/docs/guides/text?api-mode=chat
        // https://js.langchain.com/docs/concepts/messages/#role
        // OpenAI Format: user, developer=system?, assistant
        ['system', systemTemplate],
        // ['human', '{userInput}'],  // user = human
        new HumanMessage({
            content: [
                { type: 'text', text: '{userInput}' },
                {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                },
                /*{
                    type: "file",
                    source_type: "base64",
                    data: getBytes(process.env.REPORT_FILE || '').toString('base64'),
                    mime_type: "application/pdf",
                },*/
                // https://python.langchain.com/docs/how_to/multimodal_inputs/
            ]
        })
    ])
// https://v03.api.js.langchain.com/classes/_langchain_aws.ChatBedrockConverse.html
    // Chat
    const chat = new ChatBedrockConverse({
        model: 'amazon.nova-lite-v1:0',
        region: process.env.AWS_REGION
    })
        .withStructuredOutput(outputSchema, { name: 'boletin', includeRaw:true })



    // const parser = new JsonOutputParser<People>();  // pipeable

    // Chain
    // https://js.langchain.com/docs/how_to/sequence/
    const chain = promptTemplate.pipe(chat)

    // Invoke chain
    let aiResponse = await chain.invoke({
        userInput: "Extrae datos del texto"
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

