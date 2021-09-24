import GalleryService from "../services/GalleryService";
import { useEffect, useHistory } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

function AppGaleries() {
  const [galleries, setGalleries] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      const data = await GalleryService.getGalleries(page);
      setTotalPages(data.last_page);
      setGalleries([...galleries, ...data.data]);
      setLoading(false);
    };
    fetchGalleries();
  }, [page]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await GalleryService.getAll();
      setGalleries(data.data);
    };

    fetchGalleries();
  }, []);

  return (
    <div>
      {galleries.length ? (
        <div className="card-container">
          {galleries.map((gallery) => (
            <figure className="card-box" key={gallery.id}>
              <Link className="card-title" to={`/galleries/${gallery.id}`}>
                {gallery.title}{" "}
              </Link>

              {gallery.images.length ? (
                <img
                  className="img"
                  src={
                    gallery.images.length
                      ? gallery.images[0].imageURL
                      : "there is no Image"
                  }
                />
              ) : (
                <p className="nullImagesMessage">"I DONT HAVE IMAGES YET!"</p>
              )}
              <div>
                <p className="authorName">
                  <Link to={`/authors/${gallery.user.id}`}>
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
      {totalPages !== page && (
        <button className="pagination-btn" onClick={() => setPage(page + 1)}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default AppGaleries;
