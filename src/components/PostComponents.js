import React, { useState, useEffect } from 'react';
import { getPlaceHolderData } from '../apis/GetData';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getPlaceHolderData().then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handlePostClick = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setComments([]);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
          setSelectedPostId(postId);
        });
    }
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    const post = { title: newPostTitle, body: newPostBody, userId: 1 };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        setNewPostTitle('');
        setNewPostBody('');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h2>Create a New Post</h2>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleNewPost}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <Button type="submit" variant="contained">Add Post</Button>
      </Box>

      <h2>Posts</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <React.Fragment key={post.id}>
                <TableRow hover onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>
                    {selectedPostId === post.id ? `${comments.length} comments` : 'View Comments'}
                  </TableCell>
                </TableRow>
                {selectedPostId === post.id && comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell colSpan={3}>
                      <strong>{comment.email}</strong>: {comment.body}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Post added successfully!"
      />
    </Box>
  );
};

export default PostComponent;
