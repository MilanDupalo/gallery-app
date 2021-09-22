import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";
import useFormattedDate from "../hooks/useFormattedDate";
import { Link } from "react-router-dom";

function SingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  const dateFormat = useFormattedDate(gallery.created_at);

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getGallery(id);
      setGallery(data);
    };

    fetchGallery();
  }, [id]);

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

      {gallery.images && gallery.images.length
        ? gallery.images.map((image) => (
            <a target="_blank" href={image.imageURL}>
              <img className="single-page--img" src={image.imageURL} />
            </a>
          ))
        : "This post dosen't have image"}
    </div>
  );
}

export default SingleGallery;
