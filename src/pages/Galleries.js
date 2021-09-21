import { useEffect, useState } from "react";
import GalleryService from "../services/GalleryService";

export default function Galeries() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await GalleryService.getGallery();
      setGalleries(data);
    };
    fetchGalleries();
  }, {});

  return (
    <div>
      <h1>All Galleries</h1>

      <div>
        <ul></ul>
      </div>
    </div>
  );
}
