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

  getGalleries = async (number = 1, title = "") => {
    let endpoint = `/galleries/?page=${number}`;
    if (title) {
      endpoint += `&title={title}`;
    }
    const { data } = await this.client.get(endpoint);
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
  addComment = async (comment, galleryId) => {
    const { data } = await this.client.post(
      `/galleries/${galleryId}/comments`,
      comment
    );

    return data;
  };

  deleteComment = async (id) => {
    const { data } = await this.client.delete(`/comments/${id}`);
    return data;
  };
}

export default new GalleryService();
