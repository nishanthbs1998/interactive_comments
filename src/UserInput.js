import { useState } from "react"
const UserInput=({profilePic,buttonType,handleSubmit,style=""})=>{
const [userInput,setUserInput]=useState("")

    return(
        <div className={style}>
              <img src={profilePic} className='h-10' alt="juliu" />
              <textarea className='w-[75%] bg-white rounded-md inline-block p-2' placeholder='Add a comment...' value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
              <button className='bg-[#5457b6] text-white rounded-md h-9 px-5  text-sm' onClick={()=>handleSubmit({userInput,setUserInput})}>{buttonType}</button>
          </div>
    )

}

export default UserInput