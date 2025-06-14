// https://docs.aws.amazon.com/nova/latest/userguide/prompting.html
// https://docs.aws.amazon.com/nova/latest/userguide/prompting-precision.html
// https://docs.aws.amazon.com/nova/latest/userguide/prompting-system-role.html

import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime'
import { configDotenv } from "dotenv";
import fs from "node:fs";

function getBytes(path: string) {
    const data = fs.readFileSync(path);
    // return data.toString('base64');  // string
    // Buffer.from(data).toString('base64')  // string
    return Buffer.from(data);
}

function getBase64(path: string) {
    const data = fs.readFileSync(path);
    // return data.toString('base64');  // string
    // Buffer.from(data).toString('base64')  // string
    return Buffer.from(data).toString('base64');
}

configDotenv();

const prompt = `
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
{
  "volcano_name": "value",
  "analysis_period": "value",
  "issued_at": "value",
  "alert_level": "value",
  "summary": "value",
  "analysis": "value",
  "perspectives": "value",
  "recommendations": "value"
}
`;

(async () => {
    const client = new BedrockRuntimeClient({region: process.env.AWS_REGION})
    const command = new ConverseCommand({
        modelId: 'amazon.nova-lite-v1:0',
        /*system: [{
            text: ''
        }],*/
        messages: [
            {
                role: 'user',
                content: [
                    { text: prompt },
                    {
                        //text: 'Dame un resumen del documento',  // never
                        document: { // DocumentBlock
                            format: "pdf",
                            name: "boletin-ubinas-202508", // required
                            source: { // DocumentSource Union: only one key present
                                bytes: getBytes(process.env.REPORT_FILE || ''), // e.g. Buffer.from("") or new TextEncoder().encode("")
                                /*s3Location: {
                                    uri: "STRING_VALUE", // required
                                    bucketOwner: "STRING_VALUE",
                                },*/
                            },
                        },
                    }
                ]
            },
            /*{
                role: 'assistant',
                content: [{ text: 'Eres un asistente que extrae datos de reportes'}]
            },*/
        ]
    })

    const response = await client.send(command);
    console.log(response)
    console.log(response.output?.message?.content)
    const content = response.output?.message?.content;

    // /\\{(?:.|\\n)*?\\}/
    // Regex to extract json

    if (content){
        console.log(content[0].text)
    }

})()
