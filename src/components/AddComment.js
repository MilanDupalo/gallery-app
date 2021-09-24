import { useState } from "react";
import { useParams } from "react-router";
import GalleryService from "../services/GalleryService";

function AddComment({ galleryId, addNewCommentCallback }) {
  const [newComment, setNewComment] = useState({
    body: "",
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const data = await GalleryService.addComment(newComment, galleryId);

    if (data) {
      addNewCommentCallback(data);
    }

    setNewComment({ body: "" });
  };

  const handleContentChange = (e) => {
    setNewComment({
      ...newComment,
      body: e.target.value,
    });
  };

  return (
    <form className="form-comments-add" onSubmit={handleCommentSubmit}>
      <textarea
        className="comments-content"
        onChange={handleContentChange}
        placeholder="Write your comment"
        id=""
        value={newComment.body}
      />

      <button className="btn comment-btn-submit">Post</button>
    </form>
  );
}

export default AddComment;
