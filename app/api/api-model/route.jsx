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
        model:'openai/gpt-oss-20b:free',
        messages: [
            { role: "user", content: FINAL_PROMPT }
        ]
    })
    return NextResponse.json(completion.choices[0].message)
} catch(e){
    return NextResponse.json(e)
}
}