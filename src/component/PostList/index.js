import React from "react";
import PWG from "../../assets/pwg.png";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = (postId) => {
    onEdit(postId);
  };

  const handleDeleteClick = (postId, postTitle) => {
    onDelete(postId, postTitle);
  };

  const handleViewClick = (postId) => {
    navigate(`/view/${postId}`);
  };

  return (
    <div className="row">
      {posts.map((post, index) => (
        <div
          className="col-lg-4 mb-4 post-card-max-height"
          key={`${post.id}-${index}`}
        >
          <div className="post-card">
            <div className="d-flex justify-content-between align-items-center">
              <span className="post-date">
                {new Date(post.date).toISOString().split("T")[0]}
              </span>
              <img src={PWG} alt="PWG" className="pwg-image" />
            </div>
            <h5 className="post-title">{post.title}</h5>
            <div className="post-body">
              {post.body.length > 150
                ? `${post.body.slice(0, 150)}...`
                : post.body}
            </div>
            <div className="tag-container mt-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="button-container d-flex justify-content-between mt-4">
              <button
                className="button-edit"
                onClick={() => handleEditClick(post.id)}
              >
                Edit
              </button>
              <button
                className="button-view"
                onClick={() => handleViewClick(post.id)}
              >
                View
              </button>
              <button
                className="button-delete"
                onClick={() => handleDeleteClick(post.id, post.title)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
