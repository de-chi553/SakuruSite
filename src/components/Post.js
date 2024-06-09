import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Post = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [college, setCollege] = useState('');
  const [content, setContent] = useState('');
  const [field, setField] = useState('');
  const [actplace, setActplace] = useState('');
  const [message, setMessage] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const generateRandomID = () => Math.floor(Math.random() * 1000000).toString();

  const uploadImage = async (file, randomId) => {
    try {
      const storageRef = ref(storage, `images/${userData.UserID}/${randomId}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('画像のアップロードエラー:', error.message);
      throw error;
    }
  };

  const addPost = async (userId, username, collegeName, fieldName, postContent, actplaceValue, imageRandomId) => {
    try {
      const postRef = collection(db, 'Post');
      await addDoc(postRef, {
        userID: userId,
        username: username,
        college: collegeName,
        Field: {
          field: fieldName,
          Content: {
            contents: postContent,
            actplace: actplaceValue,
            imageRandomId: imageRandomId,
          },
        },
      });
      setMessage('投稿が送信されました');
    } catch (error) {
      console.error('Error adding post:', error.message);
      setMessage('投稿の送信中にエラーが発生しました');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedImageFile) {
        throw new Error('画像を選択してください');
      }
      const randomId = generateRandomID();
      // eslint-disable-next-line no-unused-vars
      const imageUrl = await uploadImage(selectedImageFile, randomId);
      await addPost(userData.UserID, userData.Username, college, field, content, actplace, randomId);
      setMessage('投稿が送信されました');
    } catch (error) {
      console.error('Error handling submit:', error.message);
      setMessage('投稿の送信中にエラーが発生しました');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImageFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>{userData?.Username}</h2>
      <div style={{ marginTop: '1%' }}>
        <select value={college} onChange={(e) => setCollege(e.target.value)} style={{ width: 200 }}>
          <option value="">大学を選択してください</option>
          <option value="立命館大学">立命館大学</option>
          <option value="同志社大学">同志社大学</option>
          <option value="関西大学">関西大学</option>
          <option value="関西学院大学">関西学院大学</option>
        </select>
      </div>
      <div style={{ marginTop: '1%' }}>
        <select value={field} onChange={(e) => setField(e.target.value)} style={{ width: 200 }}>
          <option value="">分野を選択してください</option>
          <option value="体育系">体育系</option>
          <option value="文化系">文化系</option>
          <option value="研究系">研究系</option>
        </select>
      </div>
      <div style={{ marginTop: '1%' }}>
        <select value={actplace} onChange={(e) => setActplace(e.target.value)} style={{ width: 200 }}>
          <option value="">活動場所を選択してください</option>
          <option value="衣笠">衣笠</option>
          <option value="BKC">BKC</option>
          <option value="OIC">OIC</option>
        </select>
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="投稿内容を入力してください"
        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, width: 200, height: 100, marginVertical: 10, marginLeft:'42.7%', marginTop:'2%' }}
      />
      {selectedImageFile && <img src={URL.createObjectURL(selectedImageFile)} alt="Selected" style={{ width: 200, height: 200, marginVertical: 10 }} />}
      <input type="file" onChange={handleImageChange} accept="image/*" style={{marginLeft: '42.7%', marginTop:'3%'}}/>
      {message && <p style={{ color: message.includes('成功') ? 'green' : 'red' }}>{message}</p>}
      <button onClick={handleSubmit} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#C1191A', color: '#fff', marginTop: '1%', marginLeft: '46%',width:'6%' }}>
        投稿
      </button>
      </div>
    </div>
  );
};

export default Post;
