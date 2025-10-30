import { FeedbackForm } from "@/services/Constants"
import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req){
    const {conversation}=await req.json()
    const Final_prompt=FeedbackForm.replace('{{conversation}}',JSON.stringify(conversation))
    try{
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPENROUTE_API_KEY,
            })
        const completion = await openai.chat.completions.create({
            model:'openai/gpt-oss-20b:free',
            messages: [
                { role: "user", content: Final_prompt }
            ]
        })
        return NextResponse.json(completion.choices[0].message)
    }
    catch(e){

    }
}