import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  People, 
  Message, 
  ThumbUp, 
  Share,
  ChatBubble,
  Groups,
  TrendingUp,
  EmojiEmotions,
  PhotoCamera,
  Send,
  Close
} from '@mui/icons-material';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Rahul Sharma',
      avatar: '👨',
      workout: 'Full Body HIIT',
      time: '2 hours ago',
      content: 'Just completed my first full body HIIT workout! Feeling amazing! 💪',
      likes: 24,
      comments: 8,
      liked: false,
      image: null
    },
    {
      id: 2,
      user: 'Priya Patel',
      avatar: '👩',
      workout: 'Yoga Flow',
      time: '4 hours ago',
      content: '20 minutes of yoga this morning and I feel so calm and centered. 🧘',
      likes: 18,
      comments: 5,
      liked: false,
      image: null
    },
    {
      id: 3,
      user: 'Amit Kumar',
      avatar: '👨',
      workout: 'Strength Training',
      time: '6 hours ago',
      content: 'New personal best on deadlifts today! 180kg! 💪 #fitnessfit #gains',
      likes: 32,
      comments: 12,
      liked: false,
      image: null
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        user: 'You',
        avatar: '👤',
        workout: 'Custom Workout',
        time: 'Just now',
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false,
        image: null
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
    }
  };

  const handleAddComment = (postId) => {
    const comment = newComment[postId];
    if (comment && comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const trendingTopics = [
    { tag: '#HIITWorkout', posts: 234 },
    { tag: '#YogaForLife', posts: 189 },
    { tag: '#StrengthTraining', posts: 156 },
    { tag: '#WeightLossJourney', posts: 143 },
    { tag: '#HealthyEating', posts: 98 }
  ];

  return (
    <section className="community" id="community">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <People /> Community
        </motion.h2>

        <div className="community-container">
          <motion.div 
            className="community-sidebar glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="sidebar-section">
              <h3 className="sidebar-title"><Groups /> Active Members</h3>
              <div className="member-list">
                <div className="member-item">
                  <span className="member-avatar">👨</span>
                  <span className="member-name">Rahul S.</span>
                  <span className="member-status online"></span>
                </div>
                <div className="member-item">
                  <span className="member-avatar">👩</span>
                  <span className="member-name">Priya P.</span>
                  <span className="member-status online"></span>
                </div>
                <div className="member-item">
                  <span className="member-avatar">👨</span>
                  <span className="member-name">Amit K.</span>
                  <span className="member-status offline"></span>
                </div>
                <div className="member-item">
                  <span className="member-avatar">👩</span>
                  <span className="member-name">Sneha R.</span>
                  <span className="member-status online"></span>
                </div>
                <div className="member-item">
                  <span className="member-avatar">👨</span>
                  <span className="member-name">Vikram S.</span>
                  <span className="member-status offline"></span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title"><TrendingUp /> Trending Topics</h3>
              <div className="trending-list">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="trending-item">
                    <span className="trending-tag">{topic.tag}</span>
                    <span className="trending-count">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="community-stats">
              <div className="stat-item">
                <span className="stat-number">2.5K</span>
                <span className="stat-label">Members</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">450</span>
                <span className="stat-label">Online Now</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="community-feed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="create-post glass-card">
              <div className="post-input-wrapper">
                <span className="user-avatar">👤</span>
                <input
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your workout progress..."
                  className="post-input"
                />
              </div>
              <div className="post-actions-wrapper">
                <label className="image-upload-btn">
                  <PhotoCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <motion.button
                  className="post-btn"
                  onClick={handleAddPost}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newPost.trim()}
                >
                  <Send /> Post
                </motion.button>
              </div>
              {selectedImage && (
                <div className="selected-image-preview">
                  <img src={selectedImage} alt="Selected" />
                  <button onClick={() => setSelectedImage(null)} className="remove-image">
                    <Close />
                  </button>
                </div>
              )}
            </div>

            <div className="posts-feed">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="post-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="post-header">
                    <span className="post-avatar">{post.avatar}</span>
                    <div className="post-user-info">
                      <span className="post-user">{post.user}</span>
                      <span className="post-workout">{post.workout}</span>
                    </div>
                    <span className="post-time">{post.time}</span>
                  </div>
                  
                  <p className="post-content">{post.content}</p>
                  
                  {post.image && (
                    <div className="post-image">
                      <img src={post.image} alt="Post" />
                    </div>
                  )}
                  
                  <div className="post-actions">
                    <button 
                      className={`action-btn ${post.liked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbUp /> {post.likes}
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => toggleComments(post.id)}
                    >
                      <ChatBubble /> {post.comments}
                    </button>
                    <button className="action-btn">
                      <Share /> Share
                    </button>
                  </div>

                  <AnimatePresence>
                    {showComments[post.id] && (
                      <motion.div 
                        className="comments-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="comment-input-wrapper">
                          <input
                            type="text"
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            placeholder="Write a comment..."
                            className="comment-input"
                          />
                          <button 
                            className="comment-btn"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment[post.id] || !newComment[post.id].trim()}
                          >
                            Comment
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community;