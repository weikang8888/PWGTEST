import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewPost } from "../service/account";
import Logout from "../component/Logout";
import { Spin } from "antd";

const View = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await viewPost(token, postId);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleBackNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <Spin spinning={loading}>
      <div className="container">
        <header className="d-flex justify-content-between align-items-center pt-5">
          <button
            className="add-new-post-button"
            onClick={handleBackNavigation}
          >
            Back
          </button>
          <Logout />
        </header>
        <div className="text-center home-title mt-3 mb-4">View List</div>
        <div className="container view-container p-5">
          {post && (
            <div className="view-content ">
              <h2 className="view-title">{post.title}</h2>
              <p className="view-body my-4">{post.body}</p>
              <div className="tag-container ">
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default View;
