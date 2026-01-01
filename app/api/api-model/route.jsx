import { Question_Prompt } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
    const {jobPosition,jobdescription,duration,date,type}=await req.json()
    const FINAL_PROMPT=Question_Prompt.replace('{{jobPosition}}',jobPosition).replace('{{jobDescription}}',jobdescription).replace('{{duration}}',duration).replace('{{date}}',date).replace('{{type}}',type)
    try{
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTE_API_KEY,
        })
    const completion = await openai.chat.completions.create({
        model:'mistralai/mistral-7b-instruct',
        messages: [
            { role: "user", content: FINAL_PROMPT }
        ]
    })
    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
        console.error("Empty AI response:", completion);
        return NextResponse.json(
            { error: "AI failed to generate questions" },
            { status: 500 }
        );
    }

    return NextResponse.json({ content });
} catch(e){
    console.error("API error:", err);
    return NextResponse.json(
        { error: "Server error while generating questions" },
        { status: 500 }
    );
  }
}