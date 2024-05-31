import React from "react";
import "./index.css";
import errorIcon from "../../assets/Error.png";

const Popup = ({ onClose, imageSrc, message }) => {
  return (
    <div className="popup col-md-8 col-lg-6">
      <div className="popup-content">
        <div className="row justify-content-center">
          <div className="popup-body text-center">
            <span className="image-container">
              <img src={imageSrc} alt="icon" className="image" />
            </span>
            <p className="message my-4">{message}</p>
            {imageSrc === errorIcon && (
              <button onClick={onClose} className="button-ok">
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
