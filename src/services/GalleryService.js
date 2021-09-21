import HttpService from "./HttpService";

class GalleryService extends HttpService {
  getGallery = async (id) => {
    const { data } = await this.client.get(`galleries`);
    return data;
  };
}

export default new GalleryService();
