import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedPage from './FeedPage';
import PostPage from './PostPage';
import ProfilePage from './ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
