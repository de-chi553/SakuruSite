import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import './styles.css';
import 'firebase/firestore';
import 'firebase/storage';

const All = ({ selectedUniversity }) => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      

      try {

        const q = query(
          collection(db, 'Post'),
          where('college', '==', selectedUniversity),
          where('Field.field', 'in', ['体育系', '研究系', '文化系'])
        );

        const querySnapshot = await getDocs(q);

        

        const fetchedPosts = [];

        for (const doc of querySnapshot.docs) {
          const postData = doc.data();

          let imageUrl = null;
          if (postData.Field?.Content?.imageRandomId) {
            try {
              const imageRef = ref(storage, `images/${postData.userID}/${postData.Field.Content.imageRandomId}`);
              imageUrl = await getDownloadURL(imageRef);
              console.log('Image URL:', imageUrl);
            } catch (imageError) {
              console.error('Error fetching image URL:', imageError.message);
            }
          }

          fetchedPosts.push({ id: doc.id, ...postData, imageUrl });
        }

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
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

  const PostItem = ({ post }) => (
    <div className="postContainer" style={{ flex: 1 }}>
      <div className="postContent">
        {post.imageUrl && <img src={post.imageUrl} className="image" alt="Post" />}
        <div className="textContainer" style={{ flex: 1 }}>
          <p>ユーザー名: {post.username}</p>
          <p>投稿内容: {post.Field?.Content?.contents}</p>
          <p>活動場所: {post.Field?.Content?.actplace}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        {posts.slice(currentIndex, currentIndex + 2).map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <div className="row">
        {posts.slice(currentIndex + 2, currentIndex + 4).map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <div className="buttonContainer">
        <button onClick={prevPosts} className="button" disabled={currentIndex === 0}>前へ</button>
        <button onClick={nextPosts} className="button" disabled={currentIndex + 4 >= posts.length}>次へ</button>
      </div>
    </div>
  );
};

export default All;
