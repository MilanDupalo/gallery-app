import HttpService from "./HttpService";

class GalleryService extends HttpService {
  getAll = async (number = 1, term = "") => {
    let endpoint = `/galleries/?page=${number}`;

    if (term) {
      endpoint += `&term=${term}`;
    }
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getGallery = async (id) => {
    const { data } = await this.client.get(`/galleries/${id}`);
    return data;
  };

  getMyGalleries = async (id) => {
    const { data } = await this.client.get(`/my-galleries/${id}`);

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

  addGallery = async (newGallery) => {
    const { data } = await this.client.post(`/create-galleries`, newGallery);
    return data;
  };

  deleteGallery = async (gallery) => {
    try {
      const { data } = await this.client.delete(`/galleries/${gallery}`);
      return { data };
    } catch (error) {}
  };

  edit = async (id, gallery) => {
    try {
      const { data } = await this.client.put(`/edit-galleries/${id}`, gallery);
      return data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
}

export default new GalleryService();
