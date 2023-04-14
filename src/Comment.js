import { useState, useEffect } from "react";
//import juliu from './assets/image-juliusomo.png'

import Reply from "./Reply";
import replyIcon from "./assets/icon-reply.svg";
import plusIcon from "./assets/icon-plus.svg";
import deleteIcon from "./assets/icon-delete.svg";
import editIcon from "./assets/icon-edit.svg";
import minusIcon from "./assets/icon-minus.svg";
//import juliuImage from '../public/images/avatars/image-juliusomo.png'
import initialData from "./data.json";
const Comment = ({
  commentId,
  currentUser,
  topLevelComments,
  isDelete,
  setIsDelete,
  username,
  profilePic,
  content,
  replies,
  scoreValue,
  setTopLevelComments,
  setTarget,
  setTargetCommentArray,
  commentIdRef
}) => {
  const [editValue, setEditValue] = useState(content);
  const [isReply, setIsReply] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [replyingTo, setReplyingTo] = useState("");
  const [repl, setRepl] = useState(replies);
  const [score, setScore] = useState(scoreValue);
  const [isEdit, setIsEdit] = useState(false);
  const [replTarget,setReplTarget]=useState(null)
  // useEffect(() => {
  //   console.log(topLevelComments);
  // }, [topLevelComments]);

  // const handleReplDelete = (commentId) => {
  //   console.log("clicked on:", commentId);
  //   setRepl((comments) =>
  //     comments.filter((com) => com.id !== commentId)
  //   );
  //   console.log(commentId);
  //   setIsDelete(false);
  //   //console.log(topLevelComments)
  // };
  //const [replies,setReplies]=useState([])
  const handleReply = () => {
    setIsReply(true);
    // setReplyingTo(username)
  };

  const handleEdit=(commentId,editValue)=>{
    
   const obj= topLevelComments.filter((com)=>com.id===commentId).map((val)=>({...val,content:editValue}))
   setTopLevelComments((com)=>com.filter(val=>val.id!==commentId))
    setTopLevelComments((topCom)=>[...topCom,...obj])
    setIsEdit(false)
  }
  const handleSendReply = () => {
    commentIdRef.current+=1
    setRepl((prevRepl) => [
      ...prevRepl,
      {
        id: commentIdRef.current,
        score: 0,
        content: userInput,
        replyingTo: username,
        user: {
          image: {
            png: initialData.currentUser.image.png,
          },
          username: initialData.currentUser.username,
        },
      },
    ]);

    setIsReply(false);
    setUserInput("");
  };
  return (
    <div className="flex flex-col mb-10 pt-8 pr-1 pl-8">
      <div className="flex">
        <div className="flex text-[#5457b6] font-semibold items-center pr-3 gap-2 flex-col">
          <button onClick={() => setScore((score) => score + 1)}>
            <img src={plusIcon} alt="upvote icon" />
          </button>
          <p>{score}</p>
          <button onClick={() => setScore((score) => score - 1)}>
            <img src={minusIcon} alt="downvote icon" />
          </button>
        </div>
        <div className="flex flex-col w-full  ">
          <div className="flex justify-between  ">
            <div className="flex gap-3  self-start h-fit ">
              <img
                className="h-7"
                src={process.env.PUBLIC_URL + profilePic}
                alt="profile pic"
              />
              <p className="font-semibold">{username}</p>

              {currentUser === username ? (
                <p className="px-2 rounded-sm self-center text-sm text-white bg-[#5457b6]">
                  you
                </p>
              ) : null}
            </div>
            {currentUser === username ? (
              <div>
                <div className=" flex gap-3 p-2 ml-2 items-center font-semibold  text-sm">
                  <div
                    className="flex gap-1  hover:opacity-40"
                    onClick={() => {
                      setIsDelete(true);
                      setTarget(commentId);
                      console.log(commentId);
                      setTargetCommentArray({setFunc:setTopLevelComments})
                    }}
                  >
                    <img
                      src={deleteIcon}
                      className="hover:cursor-pointer h-4 w-3 self-center"
                      alt="delete icon"
                    />
                    <button className="text-[#ed6468] self-center">
                      Delete
                    </button>
                  </div>
                  <div
                    className="flex gap-1  hover:opacity-40"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    <img
                      src={editIcon}
                      className="hover:cursor-pointer h-3 w-3 self-center"
                      alt="edit icon"
                    />
                    <button className=" text-[#5457b6] self-center">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" text-[#5457b6] flex gap-1  items-center font-semibold hover:opacity-40  text-sm">
                <img src={replyIcon} alt="replyIcon" />
                <button onClick={handleReply}>Reply</button>
              </div>
            )}
          </div>
          {isEdit ? (
            <div className="p-2 flex flex-col gap-2 mt-1">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full rounded-md inline-block px-2 py-1 hover:border hover:border-black"
              />
              <button className="self-end bg-[#5457b6] px-3 py-2 rounded-md font-semibold text-xs text-white" onClick={()=>handleEdit(commentId,editValue)}>UPDATE</button>
            </div>
          ) : (
            <div className="p-2  mt-1">
              <p className="text-[#67727e] break-words">{content}</p>
            </div>
          )}
        </div>
      </div>

      {
        isReply && (
          //   <UserInput profilePic={juliu} buttonType={'Reply'} handleSubmit={handleSendReply} style="bg-white p-1 w-full flex justify-evenly"/>

          <div className="p-2 flex gap-3 ml-2 bg-white">
            <img
              src={process.env.PUBLIC_URL + initialData.currentUser.image.png}
              className="h-10 "
              alt="juliu"
            />
            <textarea
              className="w-[75%] bg-white rounded-md inline-block p-2"
              placeholder="Add a comment..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="bg-[#5457b6] text-white rounded-md h-9 px-5  text-sm"
              onClick={handleSendReply}
            >
              REPLY
            </button>
          </div>
        ) //culprit above
      }
      {repl.map((reply) => (
  //       <Comment
  //          commentId={reply.id}
  // currentUser={currentUser}
  // topLevelComments={topLevelComments}
  // isDelete={isDelete}
  // setIsDelete={setIsDelete}
  // username={reply.user.username}
  // profilePic={reply.user.image.png}
  // content={reply.content}
  // replies={[]}
  // scoreValue={reply.score}
  // setTopLevelComments={setTopLevelComments}
  // setTarget={setTarget}
  //       />
        <Reply
          repl={repl}
          setRepl={setRepl}
          profilePic={reply.user.image.png}
          username={reply.user.username}
          setReplyingTo={setReplyingTo}
          handleReply={handleReply}
          handleSendReply={handleSendReply}
          replyingTo={reply.replyingTo}
          content={reply.content}
          scoreVal={reply.score}
          currentUser={currentUser}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          setTarget={setTarget}
          commentId={reply.id}
          setTargetCommentArray={setTargetCommentArray}
          commentIdRef={commentIdRef}
        />
      ))}
    </div>
  );
};

export default Comment;
