import { selectActiveUser, selectIsAuthenticated } from "../store/auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GalleryService from "../services/GalleryService";
import { Link } from "react-router-dom";

function MyGalleries() {
  const [galleries, setGalleries] = useState([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!activeUser) {
        return;
      }
      const data = await GalleryService.getMyGalleries(activeUser.id);

      setGalleries(data);
    };

    fetchGallery();
  }, [activeUser]);

  return (
    <div className="MyGalleryContainer">
      <h2>My Galleries</h2>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div>
            <Link className="card-title" to={`/galleries/${gallery.id}`}>
              <h2>{gallery.title}</h2>
            </Link>
            <h3>Description</h3>
            <p> {gallery.description}</p>
            {gallery.images.length ? (
              <img
                className="img"
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

export default MyGalleries;
