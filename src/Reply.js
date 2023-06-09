import { useEffect, useState } from "react";
import initialData from "./data.json";
import replyIcon from "./assets/icon-reply.svg";
import deleteIcon from "./assets/icon-delete.svg";
import editIcon from "./assets/icon-edit.svg";

const Reply = ({
  createdAt,
  repl,
  setRepl,
  username,
  profilePic,
  content,
  replyingTo,
  scoreVal,
  currentUser,
  isDelete,
  setIsDelete,
  setTarget,
  commentId,
  setTargetCommentArray,
  commentIdRef,
}) => {
  const [isReply, setIsReply] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(scoreVal);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const handleReply = () => {
    setIsReply(true);
  };
  useEffect(() => {
    setEditValue(content);
  }, [isDelete]);
  const handleEdit = (commentId, editValue) => {
    const obj = repl
      .filter((com) => com.id === commentId)
      .map((val) => ({ ...val, content: editValue }));
    setRepl((com) => com.filter((val) => val.id !== commentId));
    setRepl((topCom) => [...topCom, ...obj]);
    setIsEdit(false);
  };
  const handleSendReply = () => {
    console.log("Inside handle send reply", (commentIdRef.current += 1));
    commentIdRef.current += 1;
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
    <div className="   pt-8 pl-1  pr-2 ml-2 border-l border-gray-200 sm:pl-8">
      <div className="flex">
        <div className="hidden sm:flex sm:gap-1 sm:items-center sm:text-[#5457b6] sm:font-semibold sm:pr-3 sm:flex-col">
          <button
            className="opacity-40 hover:opacity-100 font-semibold"
            onClick={() => setScore((score) => score + 1)}
          >
            +
          </button>
          <p>{score}</p>
          <button
            className="opacity-40 hover:opacity-100 font-semibold"
            onClick={() => setScore((score) => score - 1)}
          >
            -
          </button>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex  justify-between">
            <div className="flex gap-3 w-full">
              <img
                className="h-7 self-center"
                src={process.env.PUBLIC_URL + profilePic}
                alt="profile pic"
              />
              <p className="font-semibold self-center">{username}</p>
              {currentUser === username ? (
                <p className="px-2 rounded-sm self-center text-sm text-white bg-[#5457b6]">
                  you
                </p>
              ) : null}
              <p className="text-[#67727e] text-sm self-center  font-normal">
                {createdAt}
              </p>
            </div>
            {currentUser === username ? (
              
              <div className=" hidden sm:flex sm:gap-8  sm:p-2 sm:ml-2 sm:items-center sm:font-semibold  sm:text-sm">
                <div
                  className=" flex gap-1  hover:opacity-40"
                  onClick={() => {
                    setIsDelete(true);
                    setTarget(commentId);
                    setTargetCommentArray({ setFunc: setRepl });
                    
                  }}
                >
                  <img
                    src={deleteIcon}
                    className="hover:cursor-pointer h-4 w-3 self-center"
                    alt="delete icon"
                  />
                  <button className="text-[#ed6468] self-center">Delete</button>
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
                  <button className=" text-[#5457b6] self-center">Edit</button>
                </div>
              </div>
            ) : (
              // </div>
              <div className=" hidden sm:text-[#5457b6] sm:flex sm:gap-1  sm:items-center sm:font-semibold sm:hover:opacity-40  sm:text-sm">
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
              <button
                className="self-end bg-[#5457b6] px-3 py-2 rounded-md font-semibold text-xs text-white"
                onClick={() => handleEdit(commentId, editValue)}
              >
                UPDATE
              </button>
            </div>
          ) : (
            <div className="p-2  mt-1">
              <p className="text-[#67727e] break-words">
                {
                  <span className="text-[#5457b6] font-semibold">
                    {"@" + replyingTo}
                  </span>
                }{" "}
                {content}
              </p>
            </div>
          )}
          <div className="flex justify-between items-center sm:hidden">
            <div className="flex gap-4 text-[#5457b6] font-semibold pr-3">
              <button onClick={() => setScore((score) => score + 1)}>+</button>
              <p>{score}</p>
              <button onClick={() => setScore((score) => score - 1)}>-</button>
            </div>
            {currentUser === username ? (
              <div className=" sm:hidden flex gap-3 p-2 ml-2 items-center font-semibold  text-sm">
                <div
                  className=" flex gap-1 items-center hover:opacity-40"
                  onClick={() => {
                    setIsDelete(true);
                    setTarget(commentId);
                    setTargetCommentArray({ setFunc: setRepl });
                    //console.log("clicked reply on:",commentId);
                  }}
                >
                  <img
                    src={deleteIcon}
                    className="hover:cursor-pointer h-4 w-3 self-center"
                    alt="delete icon"
                  />
                  <button className="text-[#ed6468] self-center">Delete</button>
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
                  <button className=" text-[#5457b6] self-center">Edit</button>
                </div>
              </div>
            ) : (
              <div className=" text-[#5457b6] flex gap-1 items-center font-semibold hover:opacity-40  text-sm">
                <img src={replyIcon} alt="replyIcon" />
                <button onClick={handleReply}>Reply</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {
        isReply && (
        
          <div className="p-2 ml-2 mt-4 flex gap-3 bg-white">
            <img
              src={process.env.PUBLIC_URL + initialData.currentUser.image.png}
              className="h-10"
              alt="juliu"
            />
            <textarea
              className="w-[75%] hover:border hover:border-black bg-white rounded-md inline-block p-2"
              placeholder="Add a comment..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="self-start hover:opacity-40 bg-[#5457b6] px-3 py-2 rounded-md font-semibold text-xs text-white"
              onClick={handleSendReply}
            >
              REPLY
            </button>
          </div>
        ) 
      }
    </div>
  );
};

export default Reply;
