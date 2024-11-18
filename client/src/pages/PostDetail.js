import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './PostDetail.css';
import more from '../components/more.png';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // const [totalLikes, setTotalLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
        setCount(data.likeCount);
      }
    };

    // const fetchTotalLikes = async () => {
    //     const { data, error } = await supabase
    //       .from('Posts')
    //       .select('likeCount');
  
    //     if (error) {
    //       console.error('Error fetching total likes:', error);
    //     } else {
    //       const total = data.reduce((acc, post) => acc + post.likeCount, 0);
    //       setTotalLikes(total);
    //     }
    // };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .eq('postId', id);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    // fetchTotalLikes();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('Comments')
      .insert([{ postId: id, content: newComment }]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setComments([...comments, data[0]]);
      setNewComment('');
    }
  };

  const updateCount = async (event) => {
    event.preventDefault();
    // event.stopPropagation(); 

    await supabase
    .from('Posts')
    .update({ likeCount: count + 1})
    .eq('id', id)
    
    setCount((count) => count + 1);
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // const likePercentage = totalLikes > 0 ? ((post.likeCount / totalLikes) * 100).toFixed(2) : 0;
  // const isPopular = likePercentage > 20; // Set your threshold here

  return (
    <div className="post-detail">
      <h2>{post.name}</h2>
      <Link to={`/edit/${id}`} className="moreButton">
          <img alt="edit button" src={more} />
        </Link>
      <h3>Genre: {post.genre}</h3>
      {/* <p>This post was liked {post.likeCount} times</p>
      <p>Percentage of Total Likes: {likePercentage}%</p>
      {isPopular && <p>This post is really popular!</p>} */}
      <p>{post.personal_thoughts}</p>
      <button className="likeButton" onClick={updateCount} >👍 {count} upvotes</button>

      <div className="comments-section">
        <h4>Comments</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment.content}
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;