import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";
import useFormattedDate from "../hooks/useFormattedDate";

function SingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  const dateFormat = useFormattedDate(gallery.created_at);

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getGallery(id);
      setGallery(data);
      console.log("ovde je test", data);
      console.log("ovde je test", data.user);
    };

    fetchGallery();
  }, [id]);

  return (
    <div>
      <h3>{gallery.title}</h3>

      <p className="date">{dateFormat}</p>

      {gallery.images || gallery.user ? (
        <p>{gallery.user.firstName} </p>
      ) : (
        "Nema imena testeru."
      )}

      <p>{gallery.description}</p>

      {gallery.images && gallery.images.length
        ? gallery.images.map((image) => <img src={image.imageURL} />)
        : "This post dosen't have image"}
    </div>
  );
}

export default SingleGallery;
