// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   return (<>
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//       {/* Render Footer only on the Home page */}
//       {location.pathname === '/' && <Footer />}
//     </Router>
    
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styled from 'styled-components';

// Styled component for the App container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
`;

const MainContent = styled.div`
  flex: 1; /* Allow the main content to grow and push the footer to the bottom */
`;

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

// Separate component to use hooks
const AppWrapper = () => {
  const location = useLocation(); // Get the current route location

  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainContent>
      {/* Render Footer only on the Home page */}
      {location.pathname === '/' && <Footer />}
    </AppContainer>
  );
};

export default App;