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
        model:'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
            { role: "user", content: FINAL_PROMPT }
        ],
    })
    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
        console.error("Empty AI response:", completion);
        return NextResponse.json(
            { error: "AI failed to generate questions" },
            { status: 500 }
        );
    }

    // Parse JSON from the response (handle if model includes extra text)
    let parsedJSON;
    try {
        // First try parsing as-is
        parsedJSON = JSON.parse(content);
    } catch (e) {
        // Try to extract JSON from the content if it has `InterviewQuestions=` prefix
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            try {
                parsedJSON = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                console.error("Failed to parse extracted JSON:", content);
                return NextResponse.json(
                    { error: "Invalid JSON format from AI model", details: content },
                    { status: 500 }
                );
            }
        } else {
            console.error("Could not find JSON in response:", content);
            return NextResponse.json(
                { error: "No valid JSON found in AI response", details: content },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ content: parsedJSON });
} catch(e){
    console.error("API error:", e);
    return NextResponse.json(
        { error: "Server error while generating questions" },
        { status: 500 }
    );
  }
}