import { useEffect, useRef, useState } from 'react';
//import juliu from './assets/image-juliusomo.png'
import Comment from './Comment';
import UserInput from './UserInput';
import initialData from'./data.json';
function App() {
   
  //const [userInput,setUserInput]=useState("")
  const [topLevelComments,setTopLevelComments]=useState([])
  const [data,setData]=useState(initialData)
  const [imageUrl,setImageURL] = useState(process.env.PUBLIC_URL +data.currentUser.image.png );
  const messageBottom=useRef(null)
   const scrollToBottom = () => {
    messageBottom.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(()=>{
    scrollToBottom()
  },[topLevelComments])
  useEffect(()=>{
    setTopLevelComments(data.comments)
  },[])
const handleSend=({userInput,setUserInput})=>{
    setTopLevelComments((prevCom)=>
      [...prevCom,{user:{
        image:{png:imageUrl},
        username:data.currentUser.username},
      content:userInput,
      replies:[]}]
    )
    
    setUserInput("")
  }

  return (
    <div className="h-screen flex justify-center items-center  bg-[#ffffff)]">
      <div className="bg-blue-500 w-full sm:w-2/5 h-[90%] relative">
        <div className="bg-red-500 w-full  h-[95%] overflow-auto p-5 relative">
          <div>
          {
            topLevelComments.map((comment)=>{
            return(
              <Comment username={comment.user.username} profilePic={comment.user.image.png} content={comment.content} replies={comment.replies} setTopLevelComments={setTopLevelComments}/>
            )
            })
          }
        </div>
        <div ref={messageBottom}></div>
        </div>

        <UserInput profilePic={imageUrl} buttonType={'SEND'} handleSubmit={handleSend} style="absolute bg-white p-1 w-full flex justify-evenly bottom-0 left-0"/>
          
      </div>
    </div>
  );
}

export default App;
