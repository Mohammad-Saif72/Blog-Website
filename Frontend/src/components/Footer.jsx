import React from 'react';
import styled from 'styled-components';

// Styled Components for Footer
const FooterContainer = styled.footer`
  background-color: #1f2e2e;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100vw;
  margin-top: auto; /* Push footer to the bottom of the content */
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const FooterLink = styled.a`
  color: #99ff33;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © 2025 Blog Platform. All rights reserved. |{' '}
        <FooterLink href="/">About</FooterLink> |{' '}
        <FooterLink href="/">Contact</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;