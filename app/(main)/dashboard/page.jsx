import React from 'react'
import CreateOptions from './_components/CreateOptions'
import PreviouslyInterviews from './_components/PreviouslyInterviews'

function Dashboard() {
  return (
    <div>
      {/* <WelcomeCotainer/> */}
      <h2 className='my-3 ml-2 font-semibold font-sans text-2xl mt-4'>Dashboard</h2>
      <CreateOptions/>
      <PreviouslyInterviews/>
    </div>
  )
}

export default Dashboard