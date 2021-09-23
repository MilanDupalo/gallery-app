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
  getMyGalleries = async (id) => {
    try {
      const { data } = await this.client.get(`/my-galleries/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new GalleryService();
