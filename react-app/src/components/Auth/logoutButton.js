import React from "react";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    await dispatch(logout());
    navigate('/');
  };

  return <button id="logout" onClick={handleSubmit}>Log Out</button>;
}

export default LogoutButton;
