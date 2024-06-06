import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Routerを使用
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // firebase.jsからauthとdbをインポート
import { collection, addDoc } from 'firebase/firestore'; // Firestore関連のメソッドをインポート

const Registration = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;

      // Firestoreにユーザーのデータを保存
      await addUserData(user.uid, username);

      // 登録が成功した場合の処理
      navigate('/post');
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert('正しく入力してください');
    }
  };

  // Firestoreにユーザーのデータを保存する関数
  const addUserData = async (userId, username) => {
    try {
      // 'User'コレクションにユーザーのデータを追加
      await addDoc(collection(db, 'User'), {
        UserID: userId,
        Username: username
      });
    } catch (error) {
      console.error('Error adding user data:', error.message);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <h2>新規登録</h2>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1%' }}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            style={{ borderWidth: 1, borderRadius: 5, width: '30%' }}
          />
        </div>
        <div style={{ marginTop: '1%' }}>
          <label>パスワード</label>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            style={{ borderWidth: 1, borderRadius: 5, width: '30%' }}
          />
        </div>
        <div style={{ marginTop: '1%' }}>
          <label>ユーザー名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderWidth: 1, borderRadius: 5, width: '30%' }}
          />
        </div>
        <div style={{ marginTop: '2%', width: '15%' }}>
          <button onClick={handleSubmit} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#C1191A', color: 'white' }}>
            登録する
          </button>
        </div>
        <div>
          <p>・パスワードは６文字以上で設定してください。</p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
