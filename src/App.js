import { useEffect, useRef, useState } from "react";
//import juliu from './assets/image-juliusomo.png'
import Comment from "./Comment";

import initialData from "./data.json";
function App() {
  //const [userInput,setUserInput]=useState("")
  const [target, setTarget] = useState(null);
  const [topLevelComments, setTopLevelComments] = useState([]);
  const commentId = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(initialData);
  const [isDelete, setIsDelete] = useState(false);
  const [imageUrl, setImageURL] = useState(
    process.env.PUBLIC_URL + data.currentUser.image.png
  );
  const messageBottom = useRef(null);
  const scrollToBottom = () => {
    messageBottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTopLevelComments((com) => com.sort((a, b) => b.score - a.score));
  }, [topLevelComments.score]);
  useEffect(() => {
    scrollToBottom();
  }, [topLevelComments]);
  useEffect(() => {
    setTopLevelComments(data.comments);
    commentId.current = data.comments[data.comments.length - 1].replies
      ? data.comments[data.comments.length - 1].replies[
          data.comments[data.comments.length - 1].replies.length - 1
        ].id
      : data.comments[data.comments.length - 1].id;
  }, []);
  const handleDelete = (commentId) => {
    console.log("clicked on:", commentId);
    setTopLevelComments((comments) =>
      comments.filter((com) => com.id !== commentId)
    );
    console.log(commentId);
    setIsDelete(false);
    //console.log(topLevelComments)
  };
  const handleSend = () => {
    commentId.current += 1;
    setTopLevelComments((prevCom) => [
      ...prevCom,
      {
        id: commentId.current,
        score: 0,
        user: {
          image: { png: imageUrl },
          username: data.currentUser.username,
        },
        content: userInput,
        replies: [],
      },
    ]);

    console.log(commentId);
    setUserInput("");
  };

  return (
    <div
      className={
        isDelete
          ? "h-screen flex justify-center items-center  bg-[rgb(0,0,0,0.2)]"
          : "h-screen flex justify-center items-center  bg-white"
      }
    >
      {isDelete && (
        <div className="fixed flex z-30 flex-col w-[65%] sm:w-1/4 gap-3 p-3 bg-white rounded-md top-60 left-[22%] sm:left-[37.5%]">
          <h2 className="font-semibold ">Delete comment</h2>
          <p className="text-[#67727e] text-sm">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="flex justify-evenly">
            <button
              className="bg-[#67727e] text-white font-semibold text-xs py-2 px-4 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              NO, CANCEL
            </button>

            <button
              onClick={() => handleDelete(target)}
              className="bg-[#ed6468] text-white font-semibold text-xs py-2 px-4 rounded-md"
            >
              YES, DELETE
            </button>
          </div>
        </div>
      )}
      <div className=" w-full sm:w-2/5 h-[90%] relative">
        <div className={isDelete?" w-full  h-[95%] overflow-hidden p-5 relative":" w-full  h-[95%] overflow-auto p-5 relative"}>
          <div>
            {topLevelComments.map((comment) => {
              return (
                <Comment
                  isDelete={isDelete}
                  setIsDelete={setIsDelete}
                  currentUser={data.currentUser.username}
                  topLevelComments={topLevelComments}
                  scoreValue={comment.score}
                  username={comment.user.username}
                  profilePic={comment.user.image.png}
                  content={comment.content}
                  replies={comment.replies}
                  setTopLevelComments={setTopLevelComments}
                  commentId={comment.id}
                  setTarget={setTarget}
                />
              );
            })}
          </div>
          <div ref={messageBottom}></div>
        </div>
        <div
          className={
            isDelete
              ? "absolute bg-[rgb(0,0,0,0.05)] p-1 w-full flex justify-evenly bottom-0 left-0"
              : "absolute bg-white p-1 w-full flex justify-evenly bottom-0 left-0"
          }
        >
          <img src={imageUrl} className="h-10" alt="juliu" />
          <textarea
            className={
              isDelete
                ? "w-[75%] bg-[rgb(0,0,0,0.01)] rounded-md inline-block p-2"
                : "w-[75%]  rounded-md inline-block p-2"
            }
            placeholder="Add a comment..."
            disabled={isDelete ? true : false}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="bg-[#5457b6] text-white rounded-md h-9 px-5  text-sm"
            onClick={handleSend}
          >
            SEND
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
