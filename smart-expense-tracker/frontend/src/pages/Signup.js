
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = createClient();
      const res = await client.post('/auth/register', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;
