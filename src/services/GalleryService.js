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
}

export default new GalleryService();
