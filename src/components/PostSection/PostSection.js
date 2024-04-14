import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import CreatePost from '../CreatePost/CreatePost';
import './PostSection.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PostsSection = ({movie_id}) => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the DB
  const fetchPosts = () => {
    // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
    axios
      .get(`${SERVER_URL}/posts/${movie_id}`, { withCredentials: true })
      .then((posts) => {
        // Update state with fetched posts
        setPosts(posts.data);
      })
      .catch((err) => {
        console.log('Error fetching posts:', err);
      });
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="posts-section">
      <h1 className='posts-section__title'>Comments</h1>

      {/*
        Create new post component.
        Note the passed prop that allows it to re-fetch the posts after new one is created
      */}
      <CreatePost onPostCreate={fetchPosts} movie_id={movie_id}/>

      {/* Render a list of Post components */}
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </section>
  );
};

export default PostsSection;