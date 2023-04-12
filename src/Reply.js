import { useState } from "react";
import initialData from './data.json'
const Reply = ({setRepl,username,profilePic,content,replyingTo,replies}) => {
    const [isReply,setIsReply]=useState(false)
    const [userInput,setUserInput]=useState("")
    const handleReply=()=>{
        setIsReply(true)
    }
    const handleSendReply=(username)=>{
       setRepl((prevRepl)=>[...prevRepl,
            {
                 content:userInput,
                 replyingTo:username,
            user:{
                image:{
                    png:initialData.currentUser.image.png
                },
                username:initialData.currentUser.username
            },
            }
        ])
        
        setIsReply(false)
        setUserInput("")
    }
  return (
    <div className="p-2 ml-2 border-l border-gray-400">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            className="h-7"
            src={process.env.PUBLIC_URL + profilePic}
            alt="profile pic"
          />
          <p className="font-semibold">{username}</p>
        </div>

        <button
          className=" text-[#5457b6] font-semibold hover:text-[#c3cce6]  text-sm"
          onClick={()=>{
           // setReplyingTo(username)    
            handleReply()
        }}
        >
          Reply
        </button>
      </div>
      <div className="pl-1 mt-1">
        <p className="text-[#67727e] break-words">
          {
            <span className="text-[#5457b6] font-semibold">
              {"@" + replyingTo}
            </span>
          }{" "}
          {content}
        </p>
      </div>
       {isReply&&
    //   <UserInput profilePic={juliu} buttonType={'Reply'} handleSubmit={handleSendReply} style="bg-white p-1 w-full flex justify-evenly"/>
      
      
      <div className="p-2 ml-2 bg-white">
         <img src={process.env.PUBLIC_URL+initialData.currentUser.image.png} className='h-10' alt="juliu" />
              <textarea className='w-[75%] bg-white rounded-md inline-block p-2' placeholder='Add a comment...' value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
              <button className='bg-[#5457b6] text-white rounded-md h-9 px-5  text-sm' onClick={()=>handleSendReply(username)}>REPLY</button>
      </div>                                                                                                //culprit above
      
      }
    </div>
  );
};

export default Reply;
