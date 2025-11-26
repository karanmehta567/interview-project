'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect, useState } from 'react'
import { ArrowRight, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { interviewsType } from '@/services/Constants'
import { Button } from '@/components/ui/button'

function CreateBoxInterview({onHandleInputChange,GoToNext}) {
    const [date, setDate] = useState(new Date())
    const handleDateChange = (date) => {
    setDate(date)
    onHandleInputChange('date', date)
  }
  const [open,setOpen]=useState(false)
  const [interviewType,setInterviewType]=useState([])
  useEffect(()=>{
    if(interviewType){
        onHandleInputChange('type',interviewType)
    }
  },[interviewType])
  const AddInterviewType=(type)=>{
    const data=interviewType.includes(type)
    if(!data){
        setInterviewType(prev=>[...prev,type])
    }else{
        const result=interviewType.filter(item=>item!=type)
        setInterviewType(result)
    }
  }
  return (
    <div className='p-5 bg-white rounded-xl space-y-5'>
        <div>
            <h2 className='text-sm font-medium font-sans'>Job Position</h2>
            <Input placeholder='e.g Cloud Engineer' className='mt-2' onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}/>
        </div>
        <div>
            <h2 className='text-sm font-medium font-sans'>Job Description</h2>
            <Textarea placeholder='Enter detailed JD' className='mt-2 min-h-[160px]' onChange={(event)=>onHandleInputChange('jobdescription',event.target.value)}/>
        </div>
        <div>
            <h2 className='text-sm font-medium font-sans'>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
        <h2 className='text-sm mb-2 font-sans font-medium'>Interview Date</h2>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                className="flex w-full items-center justify-between border rounded-md px-3 py-2 text-sm"
                onClick={()=>setOpen(!open)}
                >
                <span>
                    {date ? format(date, "PPP") : "Pick a date"}
                </span>
                <CalendarIcon className="h-4 w-4 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={date}
                onSelect={(d)=>{
                    handleDateChange(d)
                    setOpen(false)
                }}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </div>
        <div>
    <h2 className="text-sm font-sans font-medium">Interview Type</h2>
    <div className="flex flex-wrap gap-3 mt-2 font-sans font-medium">
        {interviewsType.map((type, index) => {
        const isSelected = interviewType.includes(type.title);
        return (
            <div
            key={index}
            onClick={() => AddInterviewType(type.title)}
            className={`flex items-center gap-2 px-3 py-1 cursor-pointer border rounded-2xl transition-all 
                ${isSelected ? "bg-blue-100 text-blue-600 border-blue-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
            `}
            >
            <type.icon className="h-4 w-4" />
            <span>{type.title}</span>
            </div>
        );
        })}
    </div>
    </div>
        <div className='flex justify-center sm:justify-end'>
        <Button onClick={()=>GoToNext()} className='w-full sm:w-auto'><ArrowRight/>Click to Generate Questions</Button>
        </div>
    </div>
)
}

export default CreateBoxInterview