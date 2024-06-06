import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import './styles.css';

const Research = ({ selectedUniversity }) => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'Post'),
          where('college', '==', selectedUniversity),
          where('Field.field', '==', '研究系')
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts = [];

        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const postData = doc.data();
            const imageRef = ref(storage, `images/${postData.userID}/${postData.Field.Content.imageRandomId}`);
            const imageUrl = await getDownloadURL(imageRef);
            postData.imageUrl = imageUrl;
            fetchedPosts.push({ id: doc.id, ...postData });
          })
        );

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('投稿の取得エラー:', error.message);
      }
    };

    fetchPosts();
  }, [selectedUniversity]);

  const nextPosts = () => {
    if (currentIndex + 4 < posts.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const prevPosts = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {posts.slice(currentIndex, currentIndex + 2).map((post) => (
          <div key={post.id} className="postContainer">
            <div className="postContent">
              {post.imageUrl && <img src={post.imageUrl} className="image" alt="Post" />}
              <div className="textContainer">
                <p>ユーザー名: {post.username}</p>
                <p>投稿内容: {post.Field.Content.contents}</p>
                <p>活動場所: {post.Field.Content.actplace}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {posts.slice(currentIndex + 2, currentIndex + 4).map((post) => (
          <div key={post.id} className="postContainer">
            <div className="postContent">
              {post.imageUrl && <img src={post.imageUrl} className="image" alt="Post" />}
              <div className="textContainer">
                <p>ユーザー名: {post.username}</p>
                <p>投稿内容: {post.Field.Content.contents}</p>
                <p>活動場所: {post.Field.Content.actplace}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button onClick={prevPosts} className="button">前へ</button>
        <button onClick={nextPosts} className="button">次へ</button>
      </div>
    </div>
  );
};

export default Research;
