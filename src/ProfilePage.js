import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersData } from './data';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const EditProfileButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const SaveProfileButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    const foundUser = usersData.find((u) => u.id === userId);
    setUser(foundUser);
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
    setEditedName(user.name);
    setEditedBio(user.bio);
  };

  const handleSaveEdit = () => {
    setEditing(false);
    // Здесь вы можете отправить запрос к API для обновления информации о пользователе
  };

  return (
    <ProfileContainer>
      <h1>Профиль пользователя</h1>
      {user ? (
        <div>
          {editing ? (
            <div>
              <input
                type="text"
                placeholder="Имя пользователя"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <textarea
                placeholder="Биография"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <SaveProfileButton onClick={handleSaveEdit}>Сохранить</SaveProfileButton>
            </div>
          ) : (
            <div>
              <p>Имя пользователя: {user.name}</p>
              <p>Биография: {user.bio}</p>
            </div>
          )}
          <div>
            <EditProfileButton onClick={handleEdit}>Редактировать профиль</EditProfileButton>
          </div>
        </div>
      ) : (
        <p>Профиль не найден</p>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
