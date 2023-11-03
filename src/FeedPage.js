import React, { useState } from 'react';
import { postsData } from './data';
import styled from 'styled-components';

const FeedContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const PostContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const FeedPage = () => {
  const [posts, setPosts] = useState(postsData);
  const [newPostText, setNewPostText] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  const handleNewPostChange = (e) => {
    setNewPostText(e.target.value);
  };

  const handleAddPost = () => {
    if (newPostText.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        text: newPostText,
        userId: 1,
      };
      setPosts([...posts, newPost]);
      setNewPostText('');
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
  };

  const handleSaveEdit = (postId, newText) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, text: newText } : post
    );
    setPosts(updatedPosts);
    setEditingPostId(null);
  };

  return (
    <FeedContainer>
      <h1>Лента</h1>
      <div>
        <input
          type="text"
          placeholder="Что у вас нового?"
          value={newPostText}
          onChange={handleNewPostChange}
        />
        <button onClick={handleAddPost}>Добавить пост</button>
      </div>
      <div>
        {posts.map((post) => (
          <PostContainer key={post.id}>
            {editingPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={post.text}
                  onChange={(e) => handleSaveEdit(post.id, e.target.value)}
                />
                <button onClick={() => handleSaveEdit(post.id, post.text)}>Сохранить</button>
              </div>
            ) : (
              <p>{post.text}</p>
            )}
            <div>
              {editingPostId === post.id ? (
                <button onClick={() => handleSaveEdit(post.id, post.text)}>Сохранить</button>
              ) : (
                <EditButton onClick={() => handleEditPost(post.id)}>Редактировать</EditButton>
              )}
              <DeleteButton onClick={() => handleDeletePost(post.id)}>Удалить</DeleteButton>
            </div>
          </PostContainer>
        ))}
      </div>
    </FeedContainer>
  );
};

export default FeedPage;
