import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import Logo from "../../favicon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const errors = [];

    if (firstName.length === 0) {
      errors.push('Please provide a first name.');
    } else if (firstName.length > 35) {
      errors.push('First name cannot be more than 35 characters long.');
    }

    if (lastName.length === 0) {
      errors.push('Please provide a last name.');
    } else if (lastName.length > 35) {
      errors.push('Last name cannot be more than 35 characters long.');
    }

    if (email.length === 0) {
      errors.push('Please provide an email.');
    } else if (email.length > 255) {
      errors.push('Email cannot be more than 255 characters long.');
    } else if (!email.includes('@')) {
      errors.push('Please provide a valid email.');
    }

    if (!password.length) {
      errors.push('Please provide a password.');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters.');
    } else if (confirmPassword !== password) {
      errors.push('Confirm password must match password.');
    }

    setValidationErrors(errors);
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  }
}

export default Signup;
