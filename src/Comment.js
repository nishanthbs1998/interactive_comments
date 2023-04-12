import { useState } from "react";
//import juliu from './assets/image-juliusomo.png'
import UserInput from "./UserInput";
import Reply from "./Reply";
//import juliuImage from '../public/images/avatars/image-juliusomo.png'
import initialData from './data.json'
const Comment = ({ username,profilePic,content,replies}) => {
    console.log(username)
    const [isReply,setIsReply]=useState(false)
    const [userInput,setUserInput]=useState("")
    const [replyingTo,setReplyingTo]=useState("")
    const [repl,setRepl]=useState(replies)
    //const [replies,setReplies]=useState([])
    const handleReply=()=>{
        setIsReply(true)
        // setReplyingTo(username)
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
        // setTopLevelComments((com)=>[...com,{
        //     content:content,
        //     user:{
        //         image:{
        //             png:profilePic
        //         },
        //         username:username
        //     },
        //     replies:[...replies,userInput]
        // }])
        setIsReply(false)
        setUserInput("")
    }
  return (
    <div className="flex flex-col bg-white mb-10 p-2">
      <div className="flex justify-between">
        <div className="flex gap-3">
            <img className="h-7" src={process.env.PUBLIC_URL+profilePic} alt="profile pic" />
        <p className="font-semibold">{username}</p>
        </div>
        
            <button className=" text-[#5457b6] font-semibold hover:text-[#c3cce6]  text-sm" onClick={handleReply}>Reply</button>
        
        
      </div>
      <div className="pl-1 mt-1">
        <p className="text-[#67727e] break-words">{content}</p>
      </div>
      {isReply&&
    //   <UserInput profilePic={juliu} buttonType={'Reply'} handleSubmit={handleSendReply} style="bg-white p-1 w-full flex justify-evenly"/>
      
      
      <div className="p-2 ml-2 bg-white">
         <img src={process.env.PUBLIC_URL+initialData.currentUser.image.png} className='h-10' alt="juliu" />
              <textarea className='w-[75%] bg-white rounded-md inline-block p-2' placeholder='Add a comment...' value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
              <button className='bg-[#5457b6] text-white rounded-md h-9 px-5  text-sm' onClick={()=>handleSendReply(username)}>REPLY</button>
      </div>                                                                                                //culprit above
      
      }
        {repl.map((reply) => (
            <Reply setRepl={setRepl} profilePic={reply.user.image.png} username={reply.user.username} setReplyingTo={setReplyingTo} handleReply={handleReply} handleSendReply={handleSendReply} replyingTo={reply.replyingTo} content={reply.content} />
    //         <div className="p-2 ml-2 border-l border-gray-400">
    //               <div className="flex justify-between">
    //     <div className="flex gap-3">
    //         <img className="h-7" src={process.env.PUBLIC_URL+reply.user.image.png} alt="profile pic" />
    //     <p className="font-semibold">{reply.user.username}</p>
    //     </div>
        
    //         <button className=" text-[#5457b6] font-semibold hover:text-[#c3cce6]  text-sm" onClick={handleReply}>Reply</button>
        
        
    //   </div>
    //   <div className="pl-1 mt-1">
    //     <p className="text-[#67727e] break-words">{<span className="text-[#5457b6] font-semibold">{'@'+reply.replyingTo}</span>}{' '}{reply.content}</p>
    //   </div>
    //         </div>

        ))}
      
    </div>
  );
};

export default Comment;
