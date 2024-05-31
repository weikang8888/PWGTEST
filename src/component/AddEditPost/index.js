import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const tagsOptions = [
  "history",
  "american",
  "crime",
  "science",
  "fiction",
  "fantasy",
  "space",
  "adventure",
  "nature",
  "environment",
  "philosophy",
  "psychology",
  "health",
];

const AddEditPost = ({ onClose, submit, initialValues, showPopup }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!showPopup) {
      setFormData({ title: "", body: "", tags: [] });
    } else if (initialValues) {
      setFormData(initialValues);
    }
  }, [showPopup, initialValues]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTagsChange = (selectedTags) => {
    setFormData({ ...formData, tags: selectedTags });
  };

  const getValidatedValue = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.body) newErrors.body = "Content is required";
    if (formData.tags.length === 0)
      newErrors.tags = "At least one tag is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? formData : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = getValidatedValue();
    if (values) {
      submit(values);
      console.log(values);
    }
  };

  return (
    <div className={`container popup-container ${showPopup ? "active" : ""}`}>
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card-body p-6">
            <h3 className="card-title text-center">
              {initialValues ? "Edit Post" : "Add A Post"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="form-group">
                <label className="label-text ms-2">Title</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <div className="text-danger ms-2 mt-1">{errors.title}</div>
                )}
              </div>
              <div className="form-group mt-4">
                <label className="label-text ms-2">Content</label>
                <textarea
                  className="form-control custom-input"
                  id="body"
                  value={formData.body}
                  onChange={handleChange}
                />
                {errors.body && (
                  <div className="text-danger ms-2 mt-1">{errors.body}</div>
                )}
              </div>
              <div className="form-group mt-4 ">
                <div>
                  <label className="label-text ms-2">Tags</label>
                </div>
                <Select
                  mode="multiple"
                  value={formData.tags}
                  onChange={handleTagsChange}
                  style={{ width: "100%" }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  dropdownStyle={{
                    zIndex: 10000,
                  }}
                >
                  {tagsOptions.map((tag) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
                {errors.tags && (
                  <div className="text-danger ms-2 mt-1">{errors.tags}</div>
                )}
              </div>
              <div className="d-flex p-4">
                <button
                  type="button"
                  className="custom-btn-cancel me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="custom-btn ms-2">
                  {initialValues ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditPost;
