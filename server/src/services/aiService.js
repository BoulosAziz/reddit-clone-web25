// AI Service using Bytez.js
import Bytez from "bytez.js";

// Initialize Bytez SDK
const sdk = new Bytez(process.env.BYTEZ_API_KEY);
const model = sdk.model("Qwen/Qwen3-0.6B");

export async function summarizePost(title, content) {
    try {
        console.log('=== AI Summarization Request (Bytez) ===');
        console.log('API Key exists:', !!process.env.BYTEZ_API_KEY);

        if (!content || content.length < 100) {
            console.log('Content too short, skipping summarization');
            return null;
        }

        const prompt = `Summarize this post in 2-3 concise sentences:\n\nTitle: ${title}\n\nContent: ${content}`;

        console.log('Calling Bytez API...');
        const { error, output } = await model.run([
            {
                "role": "user",
                "content": prompt
            }
        ]);

        if (error) {
            console.error('Bytez API Error:', error);
            throw new Error(error);
        }

        console.log('Summary generated successfully');
        // Output seems to be the text response string based on user example
        return typeof output === 'string' ? output.trim() : JSON.stringify(output);

    } catch (error) {
        console.error('=== Error generating summary ===');
        console.error('Error message:', error.message);

        // Fallback
        console.log('Used fallback summary generation');
        if (content) {
            const sentences = content.match(/[^\.!\?]+[\.!\?]+/g) || [content];
            const localSummary = sentences.slice(0, 2).join(' ').trim();
            const finalSummary = localSummary.length > 0 ? localSummary : content.substring(0, 200);
            return "Note: AI API unavailable/failed. Preview: " + (finalSummary.length > 300 ? finalSummary.substring(0, 300) + '...' : finalSummary);
        }
        return null;
    }
}

export async function summarizeComments(comments) {
    try {
        if (!comments || comments.length === 0) return null;

        const commentsText = comments.map(c => c.content).join('\n\n');
        const prompt = `Summarize the main discussion points from these comments in 2-3 sentences:\n\n${commentsText}`;
        
        const { error, output } = await model.run([
            {
                "role": "user",
                "content": prompt
            }
        ]);

        if (error) throw new Error(error);
        return typeof output === 'string' ? output.trim() : JSON.stringify(output);
    } catch (error) {
        console.error('Error generating comment summary:', error);
        return null;
    }
}

export async function askQuestion(question) {
    try {
        console.log('=== AI Ask Request (Bytez) ===');
        if (!question) return null;

        const prompt = `You are a helpful Reddit assistant. Answer general knowledge questions and recommend real subreddits. 
        Question: "${question}"
        
        Respond in strict JSON format:
        {
            "answer": "Concise answer here.",
            "communities": ["r/Name1", "r/Name2"]
        }`;

        const { error, output } = await model.run([
            {
                "role": "user",
                "content": prompt
            }
        ]);

        if (error) {
            console.error('Bytez API Error:', error);
            throw new Error(error);
        }

        let text = typeof output === 'string' ? output : JSON.stringify(output);
        console.log('AI Response:', text);

        // Clean up markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(text);
            return data;
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            return {
                answer: text,
                communities: []
            };
        }
    } catch (error) {
        console.error('Error asking AI:', error);
        return {
            answer: "I'm having trouble connecting to the real AI brain right now (likely an API key issue). However, if I were working, I'd tell you that simulation is the key to testing! Here are some communities you might like.",
            communities: ["r/SimulationTheory", "r/programming", "r/AskReddit"]
        };
    }
}
