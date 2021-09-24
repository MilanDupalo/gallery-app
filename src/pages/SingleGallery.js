import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";
import useFormattedDate from "../hooks/useFormattedDate";
import AddComment from "../components/AddComment";
import { useSelector } from "react-redux";
import { selectActiveUser, selectIsAuthenticated } from "../store/auth";
import React from "react";
import { Carousel } from "react-bootstrap";

function SingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const dateFormat = useFormattedDate(gallery.created_at);

  const handleAddNewComment = (comment) => {
    setGallery({ ...gallery, comments: [...gallery.comments, comment] });
  };

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getGallery(id);
      setGallery(data);
    };

    fetchGallery();
  }, [id]);

  const handleDeleteComment = async (id) => {
    const response = prompt("To delete this comment, type yes. ");
    if (response !== "yes") {
      return;
    }
    const data = await GalleryService.deleteComment(id);
    setGallery({
      ...gallery,
      comments: gallery.comments.filter((comment) => comment.id !== id),
    });
  };

  return (
    <div className="singleBox">
      <h3 className="singleBox-title">{gallery.title}</h3>
      <p className="date">{dateFormat}</p>

      {gallery.images || gallery.user ? (
        <p className="single-user">
          {gallery.user.firstName} {gallery.user.lastName}{" "}
        </p>
      ) : (
        "Nema imena testeru."
      )}
      <p>{gallery.description}</p>
      <Carousel>
        {gallery.images && gallery.images.length
          ? gallery.images.map((image, index) => (
              <Carousel.Item key={image.id}>
                <a key={index} target="_blank" href={image.imageURL}>
                  <img
                    className="single-page--img"
                    src={image.imageURL}
                    alt={image.imageURL}
                    key={image.id}
                  />
                </a>
              </Carousel.Item>
            ))
          : "This post dosen't have image"}
      </Carousel>
      <div>
        <p>
          <span className="comments-tittle">Comments: </span>
        </p>

        {gallery.comments ? (
          <ul>
            {gallery.comments.map((comment) => (
              <li className="commentsContainer" key={comment.id}>
                <p>
                  <i>
                    {comment.user.firstName} {comment.user.lastName}
                  </i>{" "}
                  <span className="dateComments">{dateFormat}</span>
                </p>
                <p>{comment.body}</p>

                {activeUser ? (
                  <span>
                    {activeUser.id === comment.user.id ? (
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </span>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        {isAuthenticated ? (
          <AddComment
            galleryId={id}
            addNewCommentCallback={handleAddNewComment}
            addDeleteCommentCallback={handleDeleteComment}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SingleGallery;
