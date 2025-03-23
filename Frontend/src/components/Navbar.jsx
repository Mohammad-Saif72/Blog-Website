import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components for Navbar
const Nav = styled.nav`
  background-color:#29a329;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
   width: 100%; /* Full width */
  position: fixed; /* Fix at the top */
  top: 0; /* Stick to the top */
  left: 0; /* Stretch from the left */
  z-index: 1000; /* Ensure it's above other elements */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.2rem;

  &:hover {
    color: #f0a500;
  }
`;

const Navbar = () => {
  return (
    <>
    
    <Nav>
     <img src="../cheenta_academy_logo-removebg-preview.png" alt="Logo" width={'50px'} />
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      {/* </div>
      <div> */}
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </Nav>
    </>
  );
};

export default Navbar;

