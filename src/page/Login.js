import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/account";
import Popup from "../component/Popup";
import successIcon from "../assets/Vector.png";
import errorIcon from "../assets/Error.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      setPopupImage(successIcon);
      setPopupMessage(response.data.message || "Successfully logged in");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      setPopupImage(errorIcon);
      setPopupMessage(error.response?.data?.message || "Invalid credentials");
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card-body p-6">
            <h3 className="card-title text-center">Login Page</h3>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="form-group">
                <label htmlFor="email" className="label-text ms-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control custom-input"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger ms-2 mt-1">{errors.email}</div>
                )}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="password" className="label-text ms-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control custom-input"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-danger ms-2 mt-1">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-5 custom-btn"
              >
                Login
              </button>
            </form>
            <p
              className="text-center create-account mt-4"
              onClick={handleRegisterNavigation}
              style={{ cursor: "pointer" }}
            >
              Create an account
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

export default LoginForm;
