import { useEffect, useState } from "react";
import GalleryService from "../services/GalleryService";
import { useParams } from "react-router";

function Authors() {
  const [galleries, setGalleries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getMyGalleries(id);

      setGalleries(data);
    };

    fetchGallery();
  }, [id]);

  return (
    <div className="MyGalleryContainer">
      <h2>Author Gallery</h2>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div>
            <h2>{gallery.title}</h2>
            <h3>Description</h3>
            <p> {gallery.description}</p>
            {gallery.images.length ? (
              <img
                className="img"
                alt=""
                src={
                  gallery.images.length
                    ? gallery.images[0].imageURL
                    : "This post dosen't have image"
                }
              />
            ) : (
              "This post dosen't have image"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Authors;
