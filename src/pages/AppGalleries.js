import GalleryService from "../services/GalleryService";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

function AppGaleries() {
  const [galleries, setGalleries] = useState([]);

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await GalleryService.getAll();
      setGalleries(data);
    };

    fetchGalleries();
  }, []);

  return (
    <div>
      {galleries.length ? (
        <div className="card-container">
          {galleries.map((gallery) => (
            <figure className="card-box" key={gallery.id}>
              <Link to={`/galleries/${gallery.id}`}>{gallery.title} </Link>

              <img
                className="img"
                src={gallery.images.length ? gallery.images[0].imageURL : ""}
              />
              <div>
                <p className="authorName">
                  <Link to={`/author/${gallery.user.id}`}>
                    {gallery.user.firstName} {gallery.user.lastName}
                  </Link>
                </p>
                <p className="date">{dateFormat}</p>
              </div>
            </figure>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AppGaleries;
