import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToRegistration = () => {
    navigate('SakuruSite/registration');
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザーのデータを取得
      const userData = await getUserData(user.uid);

      // ログイン後にユーザーのデータとともにPostコンポーネントに移動
      navigate('SakuruSite/post', { state: { userData } });
    } catch (error) {
      // Handle login errors
      alert('Login Error: ' + error.message);
    }
  };

  // Firestoreからユーザーのデータを取得する関数
  const getUserData = async (userId) => {
    try {
      const userQuery = query(collection(db, 'User'), where('UserID', '==', userId));
      const querySnapshot = await getDocs(userQuery);
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      return userData[0]; // 複数のドキュメントが見つかった場合、最初のものを返す
    } catch (error) {
      console.error('Error getting user data:', error.message);
      return null;
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <h2>ログイン画面</h2>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1%' }}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderWidth: 1, borderRadius: 5, width: '30%' }}
          />
        </div>
        <div style={{ marginTop: '1%' }}>
          <label>パスワード</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderWidth: 1, borderRadius: 5, width: '30%' }}
          />
        </div>
        <div style={{ marginTop: '2%', width: '15%', marginLeft:'45%' }}>
          <button onClick={handleLogin} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#C1191A', color: 'white' }}>
            ログイン
          </button>
          <button onClick={goToRegistration} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#C1191A', color: 'white', marginTop: '3%', marginLeft: '25%' }}>
            新規登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
