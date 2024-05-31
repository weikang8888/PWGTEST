import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/account";
import Popup from "../component/Popup";
import successIcon from "../assets/Vector.png";
import errorIcon from "../assets/Error.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role.toLowerCase(),
    };

    try {
      const response = await registerUser(requestData);
      setPopupImage(successIcon);
      setPopupMessage(response.data.message);
      setShowPopup(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Register failed:", error.response.data.message);
      setPopupImage(errorIcon);
      setPopupMessage(
        error.response.data.message || "Account registration failed"
      );
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card-body p-6">
            <h3 className="card-title text-center">Register User</h3>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="form-group">
                <label className="label-text ms-2">Username</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="text-danger">{errors.username}</div>
                )}
              </div>
              <div className="form-group mt-4">
                <label className="label-text ms-2">Email</label>
                <input
                  type="email"
                  className="form-control custom-input"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="form-group mt-4">
                <label className="label-text ms-2">Password</label>
                <input
                  type="password"
                  className="form-control custom-input"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
              <div className="form-group mt-4">
                <label className="label-text ms-2">Role</label>
                <select
                  className="form-control custom-input"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && (
                  <div className="text-danger">{errors.role}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-5 custom-btn"
              >
                Register
              </button>
            </form>
            <p
              className="text-center create-account mt-4"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Back to Login Page
            </p>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          onClose={handleClosePopup}
          imageSrc={popupImage}
          message={popupMessage}
        />
      )}
    </div>
  );
};

export default RegisterForm;
