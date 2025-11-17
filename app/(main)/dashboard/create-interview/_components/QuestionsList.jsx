import { useUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner'

function QuestionsList({formData,onCreateLink}) {
    const [loading,setLoading]=React.useState(false)
    const [questionList,setQuestionList]=React.useState()
    const [saveLoading,setsaveLoading]=React.useState(false)
    const {user}=useUser()
    useEffect(()=>{
        if(formData){
            GenerateQuestionList()
        }
    },[formData])
    const GenerateQuestionList=async()=>{
        setLoading(true)
        try{
            const result=await axios.post('/api/api-model',{
                ...formData
            })  
            const content=result.data.content
            const final_json=content.replace("```json","").replace("```","")
            setQuestionList(JSON.parse(final_json)?.InterviewQuestions)
            setLoading(false)
        }catch(e){
            toast('Server error while fetching')
            setLoading(false)
        }
    }
    const onFinish=async()=>{
        setsaveLoading(true)
        const interview_id=uuidv4()
        const { data, error } = await supabase
            .from('interviews')
            .insert([
                {...formData ,questionList:questionList,userEmail:user?.email,interview_id:interview_id},
            ])
            .select()
            setsaveLoading(false)
            onCreateLink(interview_id)
    }
  return (
    <div>
        {loading&& <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
            <Loader2Icon className='animate-spin'/>
                <div>
                   <h2 className='font-medium font-sans'>Generating Interview Questions</h2> 
                   <p className='text-primary font-medium font-sans'>AI is generating questions based on your description,skill set and duration</p>
                </div>
            </div>}
             {questionList?.length>0&&
             <div>
                <div className='flex justify-center items-center'>
                <h2 className='font-bold font-sans mb-2'>Generated AI Questions are: </h2>
                </div>
                <div className='p-5 border border-gray-300 rounded-xl bg-white'>
                    {questionList.map((name,index)=>(
                        <div key={index} className='p-3 border border-gray-200 rounded-xl mb-3'>
                            <h2 className='font-bold font-sans'>{name.question}</h2>
                            <h2 className='font-medium font-sans text-primary'>Type: {name.type}</h2>
                        </div>
                    ))}
                </div>
                </div>}
                <div className="flex justify-center sm:justify-end p-5">
                     {loading ? (
                        <Button disabled>
                            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                            Generating...
                        </Button>
                        ) : (
                        <Button onClick={() => onFinish()} disabled={saveLoading}>
                            {saveLoading&&<Loader2Icon className='animate-spin'/>}
                            Looks Fine and Proceed
                        </Button>
                        )}
                </div>
    </div>
  )
}

export default QuestionsList