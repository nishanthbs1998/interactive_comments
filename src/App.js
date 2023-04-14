import { useEffect, useRef, useState } from "react";

import Comment from "./Comment";
import DeleteModal from "./DeleteModal";
import initialData from "./data.json";
function App() {

  const [target, setTarget] = useState(null);
  const [targetCommentArray, setTargetCommentArray] = useState({});
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
          ? "h-screen flex justify-center items-center font-Rubik bg-[rgb(0,0,0,0.2)]"
          : "h-screen flex justify-center items-center font-Rubik  bg-white"
      }
    >
      <DeleteModal
        isDelete={isDelete}
        target={target}
        targetCommentArray={targetCommentArray}
        setIsDelete={setIsDelete}
      />

      <div className=" w-full sm:w-2/5 h-[90%] relative">
        <div
          className={
            isDelete
              ? " w-full  h-[95%] overflow-hidden p-5 relative"
              : " w-full  h-[95%] overflow-auto p-5 relative"
          }
        >
          <div>
            {topLevelComments.map((comment) => {
              return (
                <Comment
                  createdAt={comment.createdAt}
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
                  commentIdRef={commentId}
                  setTargetCommentArray={setTargetCommentArray}
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
                : "w-[75%] hover:border hover:border-black rounded-md inline-block p-2"
            }
            placeholder="Add a comment..."
            disabled={isDelete ? true : false}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div>
            <button
              className="bg-[#5457b6] text-white rounded-md  px-4 hover:opacity-40 py-2 font-semibold text-xs"
              onClick={handleSend}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
