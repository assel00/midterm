import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postsData } from './data';
import styled from 'styled-components';

const PostContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
`;

const EditPostButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const SavePostButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const foundPost = postsData.find((p) => p.id === parseInt(postId, 10));
    setPost(foundPost);
  }, [postId]);

  const handleEdit = () => {
    setEditing(true);
    setEditedText(post.text);
  };

  const handleSaveEdit = () => {
    setEditing(false);
    // Здесь вы можете отправить запрос к API для обновления текста поста
  };

  return (
    <PostContainer>
      <h1>Пост</h1>
      {post ? (
        <div>
          {editing ? (
            <div>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <SavePostButton onClick={handleSaveEdit}>Сохранить</SavePostButton>
            </div>
          ) : (
            <p>{post.text}</p>
          )}
          <div>
            <EditPostButton onClick={handleEdit}>Редактировать</EditPostButton>
          </div>
        </div>
      ) : (
        <p>Пост не найден</p>
      )}
    </PostContainer>
  );
};

export default PostPage;
