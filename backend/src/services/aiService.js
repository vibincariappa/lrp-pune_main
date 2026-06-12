const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const extractMetrics = async (text) => {
    const prompt = `
You are a metrics extraction engine. Parse the following report text and extract all numerical and qualitative performance metrics grouped by the pillar they belong to.

Report Text:
${text}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        pillar: { 
                            type: "integer",
                            description: "The pillar number (e.g. 1, 2, 3, etc.) corresponding to the section of the report." 
                        },
                        key: { 
                            type: "string",
                            description: "The name of the metric (e.g., 'Households Supported', 'Schools Supported')." 
                        },
                        value: { 
                            type: "string",
                            description: "The value associated with the metric (e.g., '1200', '35'). Must be returned as a string." 
                        }
                    },
                    required: ["pillar", "key", "value"]
                }
            }
        }
    });

    return response.text;
};

module.exports = {
    extractMetrics
};