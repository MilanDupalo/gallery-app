import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";
import useFormattedDate from "../hooks/useFormattedDate";

function SingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getGallery(id);
      setGallery(data);
    };

    fetchGallery();
  }, [id]);

  return (
    <div>
      <h3>{gallery.title}</h3>

      {gallery.user && gallery.user.length ? (
        <p>{gallery.user.firstName} </p>
      ) : (
        "Nema, zasrali smo."
      )}

      <p>{gallery.description}</p>
      {gallery.images && gallery.images.length ? (
        <img src={gallery.images.length ? gallery.images[0].imageURL : ""} />
      ) : (
        "This post dosen't have image"
      )}
    </div>
  );
}

export default SingleGallery;
