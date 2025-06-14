import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime"; // ES Modules import
// const { BedrockRuntimeClient, ConverseCommand } = require("@aws-sdk/client-bedrock-runtime"); // CommonJS import
const client = new BedrockRuntimeClient(config);

const input = { // ConverseRequest
  modelId: "STRING_VALUE", // required
  messages: [ // Messages
    { // Message
      role: "user" || "assistant", // required
      content: [ // ContentBlocks // required
        { // ContentBlock Union: only one key present
          text: "STRING_VALUE",
          image: { // ImageBlock
            format: "png" || "jpeg" || "gif" || "webp", // required
            source: { // ImageSource Union: only one key present
              bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
              s3Location: { // S3Location
                uri: "STRING_VALUE", // required
                bucketOwner: "STRING_VALUE",
              },
            },
          },
          document: { // DocumentBlock
            format: "pdf" || "csv" || "doc" || "docx" || "xls" || "xlsx" || "html" || "txt" || "md", // required
            name: "STRING_VALUE", // required
            source: { // DocumentSource Union: only one key present
              bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
              s3Location: {
                uri: "STRING_VALUE", // required
                bucketOwner: "STRING_VALUE",
              },
            },
          },
          video: { // VideoBlock
            format: "mkv" || "mov" || "mp4" || "webm" || "flv" || "mpeg" || "mpg" || "wmv" || "three_gp", // required
            source: { // VideoSource Union: only one key present
              bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
              s3Location: {
                uri: "STRING_VALUE", // required
                bucketOwner: "STRING_VALUE",
              },
            },
          },
          toolUse: { // ToolUseBlock
            toolUseId: "STRING_VALUE", // required
            name: "STRING_VALUE", // required
            input: "DOCUMENT_VALUE", // required
          },
          toolResult: { // ToolResultBlock
            toolUseId: "STRING_VALUE", // required
            content: [ // ToolResultContentBlocks // required
              { // ToolResultContentBlock Union: only one key present
                json: "DOCUMENT_VALUE",
                text: "STRING_VALUE",
                image: {
                  format: "png" || "jpeg" || "gif" || "webp", // required
                  source: {//  Union: only one key present
                    bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
                    s3Location: {
                      uri: "STRING_VALUE", // required
                      bucketOwner: "STRING_VALUE",
                    },
                  },
                },
                document: {
                  format: "pdf" || "csv" || "doc" || "docx" || "xls" || "xlsx" || "html" || "txt" || "md", // required
                  name: "STRING_VALUE", // required
                  source: {//  Union: only one key present
                    bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
                    s3Location: {
                      uri: "STRING_VALUE", // required
                      bucketOwner: "STRING_VALUE",
                    },
                  },
                },
                video: {
                  format: "mkv" || "mov" || "mp4" || "webm" || "flv" || "mpeg" || "mpg" || "wmv" || "three_gp", // required
                  source: {//  Union: only one key present
                    bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
                    s3Location: "<S3Location>",
                  },
                },
              },
            ],
            status: "success" || "error",
          },
          guardContent: { // GuardrailConverseContentBlock Union: only one key present
            text: { // GuardrailConverseTextBlock
              text: "STRING_VALUE", // required
              qualifiers: [ // GuardrailConverseContentQualifierList
                "grounding_source" || "query" || "guard_content",
              ],
            },
            image: { // GuardrailConverseImageBlock
              format: "png" || "jpeg", // required
              source: { // GuardrailConverseImageSource Union: only one key present
                bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
              },
            },
          },
          cachePoint: { // CachePointBlock
            type: "default", // required
          },
          reasoningContent: { // ReasoningContentBlock Union: only one key present
            reasoningText: { // ReasoningTextBlock
              text: "STRING_VALUE", // required
              signature: "STRING_VALUE",
            },
            redactedContent: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
          },
        },
      ],
    },
  ],
  system: [ // SystemContentBlocks
    { // SystemContentBlock Union: only one key present
      text: "STRING_VALUE",
      guardContent: {//  Union: only one key present
        text: {
          text: "STRING_VALUE", // required
          qualifiers: [
            "grounding_source" || "query" || "guard_content",
          ],
        },
        image: {
          format: "png" || "jpeg", // required
          source: {//  Union: only one key present
            bytes: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
          },
        },
      },
      cachePoint: {
        type: "default", // required
      },
    },
  ],
  inferenceConfig: { // InferenceConfiguration
    maxTokens: Number("int"),
    temperature: Number("float"),
    topP: Number("float"),
    stopSequences: [ // NonEmptyStringList
      "STRING_VALUE",
    ],
  },
  toolConfig: { // ToolConfiguration
    tools: [ // Tools // required
      { // Tool Union: only one key present
        toolSpec: { // ToolSpecification
          name: "STRING_VALUE", // required
          description: "STRING_VALUE",
          inputSchema: { // ToolInputSchema Union: only one key present
            json: "DOCUMENT_VALUE",
          },
        },
        cachePoint: "<CachePointBlock>",
      },
    ],
    toolChoice: { // ToolChoice Union: only one key present
      auto: {},
      any: {},
      tool: { // SpecificToolChoice
        name: "STRING_VALUE", // required
      },
    },
  },
  guardrailConfig: { // GuardrailConfiguration
    guardrailIdentifier: "STRING_VALUE", // required
    guardrailVersion: "STRING_VALUE", // required
    trace: "enabled" || "disabled" || "enabled_full",
  },
  additionalModelRequestFields: "DOCUMENT_VALUE",
  promptVariables: { // PromptVariableMap
    "<keys>": { // PromptVariableValues Union: only one key present
      text: "STRING_VALUE",
    },
  },
  additionalModelResponseFieldPaths: [ // AdditionalModelResponseFieldPaths
    "STRING_VALUE",
  ],
  requestMetadata: { // RequestMetadata
    "<keys>": "STRING_VALUE",
  },
  performanceConfig: { // PerformanceConfiguration
    latency: "standard" || "optimized",
  },
};
const command = new ConverseCommand(input);
const response = await client.send(command);
// { // ConverseResponse
//   output: { // ConverseOutput Union: only one key present
//     message: { // Message
//       role: "user" || "assistant", // required
//       content: [ // ContentBlocks // required
//         { // ContentBlock Union: only one key present
//           text: "STRING_VALUE",
//           image: { // ImageBlock
//             format: "png" || "jpeg" || "gif" || "webp", // required
//             source: { // ImageSource Union: only one key present
//               bytes: new Uint8Array(),
//               s3Location: { // S3Location
//                 uri: "STRING_VALUE", // required
//                 bucketOwner: "STRING_VALUE",
//               },
//             },
//           },
//           document: { // DocumentBlock
//             format: "pdf" || "csv" || "doc" || "docx" || "xls" || "xlsx" || "html" || "txt" || "md", // required
//             name: "STRING_VALUE", // required
//             source: { // DocumentSource Union: only one key present
//               bytes: new Uint8Array(),
//               s3Location: {
//                 uri: "STRING_VALUE", // required
//                 bucketOwner: "STRING_VALUE",
//               },
//             },
//           },
//           video: { // VideoBlock
//             format: "mkv" || "mov" || "mp4" || "webm" || "flv" || "mpeg" || "mpg" || "wmv" || "three_gp", // required
//             source: { // VideoSource Union: only one key present
//               bytes: new Uint8Array(),
//               s3Location: {
//                 uri: "STRING_VALUE", // required
//                 bucketOwner: "STRING_VALUE",
//               },
//             },
//           },
//           toolUse: { // ToolUseBlock
//             toolUseId: "STRING_VALUE", // required
//             name: "STRING_VALUE", // required
//             input: "DOCUMENT_VALUE", // required
//           },
//           toolResult: { // ToolResultBlock
//             toolUseId: "STRING_VALUE", // required
//             content: [ // ToolResultContentBlocks // required
//               { // ToolResultContentBlock Union: only one key present
//                 json: "DOCUMENT_VALUE",
//                 text: "STRING_VALUE",
//                 image: {
//                   format: "png" || "jpeg" || "gif" || "webp", // required
//                   source: {//  Union: only one key present
//                     bytes: new Uint8Array(),
//                     s3Location: {
//                       uri: "STRING_VALUE", // required
//                       bucketOwner: "STRING_VALUE",
//                     },
//                   },
//                 },
//                 document: {
//                   format: "pdf" || "csv" || "doc" || "docx" || "xls" || "xlsx" || "html" || "txt" || "md", // required
//                   name: "STRING_VALUE", // required
//                   source: {//  Union: only one key present
//                     bytes: new Uint8Array(),
//                     s3Location: {
//                       uri: "STRING_VALUE", // required
//                       bucketOwner: "STRING_VALUE",
//                     },
//                   },
//                 },
//                 video: {
//                   format: "mkv" || "mov" || "mp4" || "webm" || "flv" || "mpeg" || "mpg" || "wmv" || "three_gp", // required
//                   source: {//  Union: only one key present
//                     bytes: new Uint8Array(),
//                     s3Location: "<S3Location>",
//                   },
//                 },
//               },
//             ],
//             status: "success" || "error",
//           },
//           guardContent: { // GuardrailConverseContentBlock Union: only one key present
//             text: { // GuardrailConverseTextBlock
//               text: "STRING_VALUE", // required
//               qualifiers: [ // GuardrailConverseContentQualifierList
//                 "grounding_source" || "query" || "guard_content",
//               ],
//             },
//             image: { // GuardrailConverseImageBlock
//               format: "png" || "jpeg", // required
//               source: { // GuardrailConverseImageSource Union: only one key present
//                 bytes: new Uint8Array(),
//               },
//             },
//           },
//           cachePoint: { // CachePointBlock
//             type: "default", // required
//           },
//           reasoningContent: { // ReasoningContentBlock Union: only one key present
//             reasoningText: { // ReasoningTextBlock
//               text: "STRING_VALUE", // required
//               signature: "STRING_VALUE",
//             },
//             redactedContent: new Uint8Array(),
//           },
//         },
//       ],
//     },
//   },
//   stopReason: "end_turn" || "tool_use" || "max_tokens" || "stop_sequence" || "guardrail_intervened" || "content_filtered", // required
//   usage: { // TokenUsage
//     inputTokens: Number("int"), // required
//     outputTokens: Number("int"), // required
//     totalTokens: Number("int"), // required
//     cacheReadInputTokens: Number("int"),
//     cacheWriteInputTokens: Number("int"),
//   },
//   metrics: { // ConverseMetrics
//     latencyMs: Number("long"), // required
//   },
//   additionalModelResponseFields: "DOCUMENT_VALUE",
//   trace: { // ConverseTrace
//     guardrail: { // GuardrailTraceAssessment
//       modelOutput: [ // ModelOutputs
//         "STRING_VALUE",
//       ],
//       inputAssessment: { // GuardrailAssessmentMap
//         "<keys>": { // GuardrailAssessment
//           topicPolicy: { // GuardrailTopicPolicyAssessment
//             topics: [ // GuardrailTopicList // required
//               { // GuardrailTopic
//                 name: "STRING_VALUE", // required
//                 type: "DENY", // required
//                 action: "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//           },
//           contentPolicy: { // GuardrailContentPolicyAssessment
//             filters: [ // GuardrailContentFilterList // required
//               { // GuardrailContentFilter
//                 type: "INSULTS" || "HATE" || "SEXUAL" || "VIOLENCE" || "MISCONDUCT" || "PROMPT_ATTACK", // required
//                 confidence: "NONE" || "LOW" || "MEDIUM" || "HIGH", // required
//                 filterStrength: "NONE" || "LOW" || "MEDIUM" || "HIGH",
//                 action: "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//           },
//           wordPolicy: { // GuardrailWordPolicyAssessment
//             customWords: [ // GuardrailCustomWordList // required
//               { // GuardrailCustomWord
//                 match: "STRING_VALUE", // required
//                 action: "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//             managedWordLists: [ // GuardrailManagedWordList // required
//               { // GuardrailManagedWord
//                 match: "STRING_VALUE", // required
//                 type: "PROFANITY", // required
//                 action: "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//           },
//           sensitiveInformationPolicy: { // GuardrailSensitiveInformationPolicyAssessment
//             piiEntities: [ // GuardrailPiiEntityFilterList // required
//               { // GuardrailPiiEntityFilter
//                 match: "STRING_VALUE", // required
//                 type: "ADDRESS" || "AGE" || "AWS_ACCESS_KEY" || "AWS_SECRET_KEY" || "CA_HEALTH_NUMBER" || "CA_SOCIAL_INSURANCE_NUMBER" || "CREDIT_DEBIT_CARD_CVV" || "CREDIT_DEBIT_CARD_EXPIRY" || "CREDIT_DEBIT_CARD_NUMBER" || "DRIVER_ID" || "EMAIL" || "INTERNATIONAL_BANK_ACCOUNT_NUMBER" || "IP_ADDRESS" || "LICENSE_PLATE" || "MAC_ADDRESS" || "NAME" || "PASSWORD" || "PHONE" || "PIN" || "SWIFT_CODE" || "UK_NATIONAL_HEALTH_SERVICE_NUMBER" || "UK_NATIONAL_INSURANCE_NUMBER" || "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER" || "URL" || "USERNAME" || "US_BANK_ACCOUNT_NUMBER" || "US_BANK_ROUTING_NUMBER" || "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER" || "US_PASSPORT_NUMBER" || "US_SOCIAL_SECURITY_NUMBER" || "VEHICLE_IDENTIFICATION_NUMBER", // required
//                 action: "ANONYMIZED" || "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//             regexes: [ // GuardrailRegexFilterList // required
//               { // GuardrailRegexFilter
//                 name: "STRING_VALUE",
//                 match: "STRING_VALUE",
//                 regex: "STRING_VALUE",
//                 action: "ANONYMIZED" || "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//           },
//           contextualGroundingPolicy: { // GuardrailContextualGroundingPolicyAssessment
//             filters: [ // GuardrailContextualGroundingFilters
//               { // GuardrailContextualGroundingFilter
//                 type: "GROUNDING" || "RELEVANCE", // required
//                 threshold: Number("double"), // required
//                 score: Number("double"), // required
//                 action: "BLOCKED" || "NONE", // required
//                 detected: true || false,
//               },
//             ],
//           },
//           invocationMetrics: { // GuardrailInvocationMetrics
//             guardrailProcessingLatency: Number("long"),
//             usage: { // GuardrailUsage
//               topicPolicyUnits: Number("int"), // required
//               contentPolicyUnits: Number("int"), // required
//               wordPolicyUnits: Number("int"), // required
//               sensitiveInformationPolicyUnits: Number("int"), // required
//               sensitiveInformationPolicyFreeUnits: Number("int"), // required
//               contextualGroundingPolicyUnits: Number("int"), // required
//               contentPolicyImageUnits: Number("int"),
//             },
//             guardrailCoverage: { // GuardrailCoverage
//               textCharacters: { // GuardrailTextCharactersCoverage
//                 guarded: Number("int"),
//                 total: Number("int"),
//               },
//               images: { // GuardrailImageCoverage
//                 guarded: Number("int"),
//                 total: Number("int"),
//               },
//             },
//           },
//         },
//       },
//       outputAssessments: { // GuardrailAssessmentListMap
//         "<keys>": [ // GuardrailAssessmentList
//           {
//             topicPolicy: {
//               topics: [ // required
//                 {
//                   name: "STRING_VALUE", // required
//                   type: "DENY", // required
//                   action: "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//             },
//             contentPolicy: {
//               filters: [ // required
//                 {
//                   type: "INSULTS" || "HATE" || "SEXUAL" || "VIOLENCE" || "MISCONDUCT" || "PROMPT_ATTACK", // required
//                   confidence: "NONE" || "LOW" || "MEDIUM" || "HIGH", // required
//                   filterStrength: "NONE" || "LOW" || "MEDIUM" || "HIGH",
//                   action: "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//             },
//             wordPolicy: {
//               customWords: [ // required
//                 {
//                   match: "STRING_VALUE", // required
//                   action: "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//               managedWordLists: [ // required
//                 {
//                   match: "STRING_VALUE", // required
//                   type: "PROFANITY", // required
//                   action: "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//             },
//             sensitiveInformationPolicy: {
//               piiEntities: [ // required
//                 {
//                   match: "STRING_VALUE", // required
//                   type: "ADDRESS" || "AGE" || "AWS_ACCESS_KEY" || "AWS_SECRET_KEY" || "CA_HEALTH_NUMBER" || "CA_SOCIAL_INSURANCE_NUMBER" || "CREDIT_DEBIT_CARD_CVV" || "CREDIT_DEBIT_CARD_EXPIRY" || "CREDIT_DEBIT_CARD_NUMBER" || "DRIVER_ID" || "EMAIL" || "INTERNATIONAL_BANK_ACCOUNT_NUMBER" || "IP_ADDRESS" || "LICENSE_PLATE" || "MAC_ADDRESS" || "NAME" || "PASSWORD" || "PHONE" || "PIN" || "SWIFT_CODE" || "UK_NATIONAL_HEALTH_SERVICE_NUMBER" || "UK_NATIONAL_INSURANCE_NUMBER" || "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER" || "URL" || "USERNAME" || "US_BANK_ACCOUNT_NUMBER" || "US_BANK_ROUTING_NUMBER" || "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER" || "US_PASSPORT_NUMBER" || "US_SOCIAL_SECURITY_NUMBER" || "VEHICLE_IDENTIFICATION_NUMBER", // required
//                   action: "ANONYMIZED" || "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//               regexes: [ // required
//                 {
//                   name: "STRING_VALUE",
//                   match: "STRING_VALUE",
//                   regex: "STRING_VALUE",
//                   action: "ANONYMIZED" || "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//             },
//             contextualGroundingPolicy: {
//               filters: [
//                 {
//                   type: "GROUNDING" || "RELEVANCE", // required
//                   threshold: Number("double"), // required
//                   score: Number("double"), // required
//                   action: "BLOCKED" || "NONE", // required
//                   detected: true || false,
//                 },
//               ],
//             },
//             invocationMetrics: {
//               guardrailProcessingLatency: Number("long"),
//               usage: {
//                 topicPolicyUnits: Number("int"), // required
//                 contentPolicyUnits: Number("int"), // required
//                 wordPolicyUnits: Number("int"), // required
//                 sensitiveInformationPolicyUnits: Number("int"), // required
//                 sensitiveInformationPolicyFreeUnits: Number("int"), // required
//                 contextualGroundingPolicyUnits: Number("int"), // required
//                 contentPolicyImageUnits: Number("int"),
//               },
//               guardrailCoverage: {
//                 textCharacters: {
//                   guarded: Number("int"),
//                   total: Number("int"),
//                 },
//                 images: {
//                   guarded: Number("int"),
//                   total: Number("int"),
//                 },
//               },
//             },
//           },
//         ],
//       },
//       actionReason: "STRING_VALUE",
//     },
//     promptRouter: { // PromptRouterTrace
//       invokedModelId: "STRING_VALUE",
//     },
//   },
//   performanceConfig: { // PerformanceConfiguration
//     latency: "standard" || "optimized",
//   },
// };