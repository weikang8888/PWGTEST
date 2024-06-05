import React, { Component } from "react";
import PostList from "../component/PostList";
import AddEditPost from "../component/AddEditPost";
import {
  getMyPosts,
  createPost,
  editPost,
  deletePost,
  getAllAccounts,
  getAllPosts,
} from "../service/account";
import DeletePopup from "../component/Popup/DeletePopup";
import TotalPost from "../component/TotalPost";
import Logout from "../component/Logout";
import { jwtDecode } from "jwt-decode";
import { Spin } from "antd";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      showPopup: false,
      showDeletePopup: false,
      posts: [],
      mode: "add",
      postId: null,
      myTotalPosts: 0,
      totalAccount: 0,
      totalPosts: 0,
      userRole: null,
      page: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.fetchMyPosts();
    this.updateUserRole();
  }

  updateUserRole = () => {
    const { token } = this.state;
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      this.setState({ userRole }, () => {
        if (userRole === "admin") {
          this.fetchAllAccounts();
          this.fetchAllPosts();
        }
      });
    }
  };

  handleAddPost = () => {
    this.setState({ showPopup: true, mode: "add" });
    const rootElement = document.getElementById("overlay");
    if (rootElement) {
      rootElement.classList.add("overlay");
    }
  };

  handleEditPost = async (postId) => {
    this.setState({ showPopup: true, mode: "edit", postId: postId });
    const rootElement = document.getElementById("overlay");
    if (rootElement) {
      rootElement.classList.add("overlay");
    }
  };

  handleDeletePost = (postId, postTitle) => {
    const rootElement = document.getElementById("overlay");
    if (rootElement) {
      rootElement.classList.add("overlay");
    }
    this.setState({ showDeletePopup: true, postId: postId, title: postTitle });
  };

  handleClosePopup = () => {
    this.setState({ showPopup: false, postId: null });
    const rootElement = document.getElementById("overlay");
    if (rootElement) {
      rootElement.classList.remove("overlay");
    }
  };

  handleCloseDeletePopup = () => {
    this.setState({ showDeletePopup: false });
    const rootElement = document.getElementById("overlay");
    if (rootElement) {
      rootElement.classList.remove("overlay");
    }
  };

  handleAddSubmit = async (formData) => {
    try {
      const response = await createPost(this.state.token, formData);
      this.fetchMyPosts();
      this.handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  handleEditSubmit = async (formData) => {
    const { postId, token } = this.state;
    try {
      await editPost(token, postId, formData);
      this.fetchMyPosts();
      this.handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmitDelete = async () => {
    const { postId, token } = this.state;
    try {
      await deletePost(token, postId);
      this.fetchMyPosts();
      this.fetchAllPosts();
      this.handleCloseDeletePopup();
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = async (formData) => {
    const { mode } = this.state;
    try {
      if (mode === "add") {
        await this.handleAddSubmit(formData);
      } else if (mode === "edit") {
        await this.handleEditSubmit(formData);
      }
      this.handleClosePopup();
      this.setState({ showPopup: false });
    } catch (error) {
      console.error(error);
    }
  };

  fetchMyPosts = async () => {
    this.setState({ loading: true });
    const { token, page, limit } = this.state;
    try {
      const response = await getMyPosts(token, page, limit);
      this.setState({
        posts: response.data.data,
        myTotalPosts: response.data.totalPosts,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      this.setState({ loading: false });
    }
  };

  fetchAllAccounts = async () => {
    const { token } = this.state;
    try {
      const response = await getAllAccounts(token);
      this.setState({
        totalAccount: response.data.accounts.length,
      });
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  fetchAllPosts = async () => {
    const { token } = this.state;
    try {
      const response = await getAllPosts(token, 1, 10);
      this.setState({
        totalPosts: response.data.totalPosts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  handlePageChange = (newPage) => {
    this.setState({ page: newPage }, this.fetchMyPosts);
  };

  renderPaginationButtons = () => {
    const { myTotalPosts, page, limit } = this.state;
    const totalPages = Math.ceil(myTotalPosts / limit);

    const buttons = [];
    for (let i = 1; i <= totalPages || i === 1; i++) {
      buttons.push(
        <button
          key={i}
          className="pagination-button ms-3"
          onClick={() => this.handlePageChange(i)}
          style={{
            backgroundColor: page === i ? "#F8B959" : "white",
          }}
        >
          {i}
        </button>
      );
    }

    return <div className="pagination-container">{buttons}</div>;
  };

  render() {
    const {
      token,
      showPopup,
      posts,
      mode,
      postId,
      showDeletePopup,
      myTotalPosts,
      userRole,
      totalAccount,
      totalPosts,
      loading,
      title,
    } = this.state;

    return (
      <Spin spinning={loading}>
        <div className="container">
          <div id="overlay"> </div>
          <header className="d-flex justify-content-between align-items-center pt-5">
            <button
              type="button"
              className="add-new-post-button"
              onClick={this.handleAddPost}
            >
              Add New Post
            </button>
            <Logout />
          </header>
          <div className="text-center home-title mt-3 mb-4">Post List</div>
          {userRole === "admin" && (
            <TotalPost
              myTotalPosts={myTotalPosts}
              totalAccount={totalAccount}
              totalPosts={totalPosts}
            />
          )}
          <div>
            {token && (
              <PostList
                token={token}
                posts={posts}
                onEdit={this.handleEditPost}
                onDelete={this.handleDeletePost}
              />
            )}
          </div>
          <AddEditPost
            onClose={this.handleClosePopup}
            submit={this.handleSubmit}
            mode={mode}
            initialValues={
              postId ? posts.find((post) => post.id === postId) : null
            }
            showPopup={showPopup}
          />
          <DeletePopup
            onClose={this.handleCloseDeletePopup}
            submit={this.handleSubmitDelete}
            showDeletePopup={showDeletePopup}
            title={title}
          />
          {this.renderPaginationButtons()}
        </div>
      </Spin>
    );
  }
}

export default Homepage;
