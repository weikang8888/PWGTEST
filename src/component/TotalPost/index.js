import React from "react";

const TotalPost = ({ myTotalPosts, totalAccount, totalPosts }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 mb-5 ">
          <div className="post-card p-4 total-account-container">
            <div className="text-center">
              <h5 className="total-title my-3">Total Account</h5>
              <span className="total-number">{totalAccount}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-5 ">
          <div className="post-card p-4 total-post-container">
            <div className="text-center">
              <h5 className="total-title my-3">Total Post</h5>
              <span className="total-number">{totalPosts}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-5 ">
          <div className="post-card p-4 my-post-container">
            <div className="text-center">
              <h5 className="total-title my-3">My Post </h5>
              <span className="total-number">{myTotalPosts}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalPost;
