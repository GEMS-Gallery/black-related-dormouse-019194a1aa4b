import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import CreatePostPage from './pages/CreatePostPage';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<BlogPostPage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
