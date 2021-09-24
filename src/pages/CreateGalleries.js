import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectActiveUser } from "../store/auth";
import { useHistory, useParams } from "react-router-dom";
import GalleryService from "../services/GalleryService";

function CreateGalleries() {
  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const activeUser = useSelector(selectActiveUser);
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;

    if (!activeUser) {
      return;
    }

    if (id) {
      data = await GalleryService.edit(id, newGallery);
    } else {
      data = await GalleryService.addGallery(newGallery);
    }

    history.push("/my-galleries");
  };

  const handleTitleChange = (e) => {
    setNewGallery({
      ...newGallery,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setNewGallery({
      ...newGallery,
      description: e.target.value,
    });
  };

  const handleImageURLChange = (e) => {
    setNewGallery({
      ...newGallery,
      imageURL: e.target.value,
    });
  };

  useEffect(() => {
    const fetchGallery = async () => {
      const {
        id: _,
        created_at,
        ...data
      } = await GalleryService.getGallery(id);
      setNewGallery(data);
    };

    if (id) {
      fetchGallery();
    }
  }, [id]);

  return (
    <div>
      <form className="formRegistarAndLogin" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="loginField"
            id="title"
            placeholder="title"
            value={newGallery.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="loginField"
            id="description"
            placeholder="description"
            value={newGallery.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="loginField"
            id="imageURL"
            placeholder="Image url"
            value={newGallery.imageURL}
            onChange={handleImageURLChange}
          />
        </div>
        <button className="form-btn">{id ? "Edit" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateGalleries;
