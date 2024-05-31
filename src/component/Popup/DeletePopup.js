import React from "react";
import "./index.css";

const DeletePopup = ({ onClose, submit, showDeletePopup }) => {
  return (
    <div
      className={`popup col-md-8 col-lg-6 popup-container ${
        showDeletePopup ? "active" : ""
      }`}
    >
      <div className="popup-content">
        <div className="row justify-content-center">
          <div className="popup-body text-center">
            <span className="popup-title-delete">Post Title</span>
            <p className="popup-title-message my-4">
              Are you sure you want to delete this post ?
            </p>
            <div className="button-container d-flex justify-content-between mt-5 px-4">
              <button
                type="button"
                onClick={onClose}
                className="custom-btn-cancel me-2"
              >
                Cancel
              </button>
              <button type="submit" onClick={submit} className="button-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
