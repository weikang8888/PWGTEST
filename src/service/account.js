import axios from "axios";

const API = "https://api-for-testing-gujp.onrender.com";

export const loginUser = async (params) => {
  try {
    return await axios.post(`${API}/api/account/login`, params);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (params) => {
  try {
    return await axios.post(`${API}/api/account/register`, params);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const getMyPosts = async (token, page, limit) => {
  try {
    return await axios.post(
      `${API}/api/posts/mypost`,
      { page, limit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Get my posts error:", error);
    throw error;
  }
};

export const getAllAccounts = async (token) => {
  try {
    return await axios.get(`${API}/api/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Get all accounts error:", error);
    throw error;
  }
};

export const getAllPosts = async (token, page, limit) => {
  try {
    return await axios.get(`${API}/api/posts`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Get all posts error:", error);
    throw error;
  }
};

export const createPost = async (token, params) => {
  try {
    return await axios.post(`${API}/api/posts/create`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Create post error:", error);
    throw error;
  }
};

export const editPost = async (token, postId, params) => {
  try {
    return await axios.put(`${API}/api/posts/edit/${postId}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Edit post error:", error);
    throw error;
  }
};

export const deletePost = async (token, postId) => {
  try {
    return await axios.delete(`${API}/api/posts/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Delete post error:", error);
    throw error;
  }
};

export const viewPost = async (token, postId) => {
  try {
    return await axios.get(`${API}/api/posts/view/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("View post error:", error);
    throw error;
  }
};
