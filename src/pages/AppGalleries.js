import GalleryService from "../services/GalleryService";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

function AppGaleries() {
  const [galleries, setGalleries] = useState([]);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      console.log(term, "term");
      const data = await GalleryService.getAll(page);
      setTotalPages(data.last_page);
      setGalleries([...galleries, ...data.data]);
      setLoading(false);
    };
    fetchGalleries();
  }, [page]);

  const handleSearchCallback = async (searchTerm) => {
    setPage(1);
    setTerm(searchTerm);
    setLoading(true);
    const data = await GalleryService.getAll(page, term);
    setMaxPage(data.last_page);
    setGalleries(data.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  };

  return (
    <div>
      <div className="search-box">
        <input
          className="search-box-input"
          type="text"
          onChange={handleChange}
        />
        <button
          className="search-box-btn"
          onClick={() => handleSearchCallback(term)}
        >
          Search...
        </button>
      </div>
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
            {loading ? "Loading..." : "--- Load More ---"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AppGaleries;
