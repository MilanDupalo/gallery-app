import HttpService from "./HttpService";

class GalleryService extends HttpService {
  getAll = async () => {
    const { data } = await this.client.get(`/galleries`);
    return data;
  };

  getGallery = async (id) => {
    const { data } = await this.client.get(`/galleries/${id}`);
    return data;
  };

  getGalleries = async (number = 1) => {
    const { data } = await this.client.get(`/galleries?page=${number}`);
    return data;
  };
}

export default new GalleryService();
