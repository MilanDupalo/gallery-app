import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GalleryService from "../services/GalleryService";

function MyGalleries() {
  const [galleries, setGalleries] = useState([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!activeUser) {
        return;
      }
      console.log(activeUser);
      const data = await GalleryService.getMyGalleries(activeUser.id);

      setGalleries(data);
    };

    fetchGallery();
  }, [activeUser]);

  return (
    <div>
      <h2>My Galleries</h2>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div>
            <h2>Title:</h2>
            <p>{gallery.title}</p>
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
