import { Calendar, FileCode2Icon,  LayoutDashboard, List, Puzzle, Settings, User2Icon, UserStarIcon, WalletCards } from "lucide-react";

export const Constants=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interviews',
        icon:Calendar,
        path:'/schedule-interview'
    },
    {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
]
export const interviewsType=[
    {
        title:'Technical',
        icon:FileCode2Icon
    },
    {
        title:'Behavioural round',
        icon:User2Icon
    },
    {
        title:'Problem Solving',
        icon:Puzzle
    },
    {
        title:'Cultural fit round',
        icon:UserStarIcon
    }
]
export const Question_Prompt=`You are an AI assistant that designs structured technical interviews.

You will be given details about a job position, including:
- Job Position (role title)
- Job Description (JD text, which includes responsibilities, required skills, and qualifications)
- Interview Duration (in minutes or hours)
- Interview Date
- Interview Type (e.g. technical, HR, behavioral, system design, etc.)

Your task:
1. Analyze the job description to identify key required skills, technologies, and competencies.
2. Generate interview questions that evaluate these areas effectively.
3. Ensure the total number and difficulty of questions align with the given interview duration.
4. Format your output as **strict JSON** containing an array of questions with structured metadata.


### Input:
Job Position: {{jobPosition}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Date: {{date}}
Interview Type: {{type}}

Ensure that the questions matches the tone and structure of real life {{type}} interview
### Output:
Format the response in JSON format with array list of questions
format:InterviewQuestions=[
    {
    question:'',
    type:'Technical/Behavioural/Problem Solving/Cultural fit '
},{
...
}
]
Create Structured , relevant and time optimized questions within the given duration of the interview
`
export const FeedbackForm=`
    {{conversation}}
    You are an AI Interview Evaluator.  
Your task is to carefully analyze the following **mock interview transcript** between a recruiter and a candidate, and then generate constructive, honest, and professional feedback.

---

### 📋 Instructions:
1. Read the transcript carefully to understand the candidate s answers, tone, and performance.  
2. Write **a detailed feedback summary (5-7 lines)** covering:
   - Strengths and positive points  
   - Areas that need improvement  
   - Overall impression of the candidate performance
3. Then, rate the candidate **out of 10** in the following categories:
   - Technical Knowledge (accuracy, clarity of technical concepts)
   - Non-Technical Knowledge (general awareness, reasoning)
   - Communication & Confidence (clarity, body language, fluency)
   - Overall Impression (combination of above aspects)
4. Be fair but precise — avoid generic feedback. Base your feedback strictly on the content of the transcript.  
5. Output the result **strictly in valid JSON** format, following the structure below.
{
            feedback:{
                rating:{
                    technicalKnowledge:7,
                    communication:6,
                    problemSolving:4
                },
                summary:<in 4-5 lines>
                RecommendationMsg:''
                Recommended:<true/false>
            }
}

`