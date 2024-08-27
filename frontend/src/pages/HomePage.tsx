import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { backend } from 'declarations/backend';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  createdAt: bigint;
  updatedAt: bigint | null;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await backend.getAllBlogPosts();
        setPosts(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(Number(post.createdAt) / 1000000).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                {post.content.substring(0, 100)}...
              </Typography>
              <Button
                component={RouterLink}
                to={`/post/${post.id.toString()}`}
                variant="contained"
                color="primary"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
