import React from "react";

const DeleteModal = ({ isDelete, target, setIsDelete, targetCommentArray }) => {
  const handleDelete = (commentId) => {
    console.log("clicked on:", commentId);

    targetCommentArray.setFunc((comments) => {
      let val = comments.filter((com) => com.id !== commentId);
      console.log("Filterder del:", val);
      return comments.filter((com) => com.id !== commentId);
    });

    //console.log(commentId);
    setIsDelete(false);
    //console.log(topLevelComments)
  };
  return (
    <div>
      {isDelete && (
        <div className="fixed font-Rubik flex z-30 flex-col w-[65%] sm:w-1/4 gap-3 p-3 bg-white rounded-md top-60 left-[22%] sm:left-[37.5%]">
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
    </div>
  );
};

export default DeleteModal;
