import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { backend } from 'declarations/backend';
import { formatDate } from '../utils/dateFormatter';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  category: string;
  createdAt: bigint;
  updatedAt: bigint | null;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await backend.getAllBlogPosts();
        setPosts(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const result = await backend.getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      if (selectedCategory) {
        try {
          const result = await backend.getPostsByCategory(selectedCategory);
          setPosts(result);
        } catch (error) {
          console.error('Error fetching posts by category:', error);
        }
      } else {
        const result = await backend.getAllBlogPosts();
        setPosts(result);
      }
    };

    fetchPostsByCategory();
  }, [selectedCategory]);

  return (
    <Box display="flex">
      <Box width="200px" mr={4}>
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <List>
          <ListItem button onClick={() => setSelectedCategory(null)}>
            <ListItemText primary="All" />
          </ListItem>
          {categories.map((category) => (
            <ListItem button key={category} onClick={() => setSelectedCategory(category)}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div" color="text.primary">
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                    mb: 1
                  }}
                >
                  {formatDate(post.createdAt)} | Category: {post.category}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mt: 2, mb: 2 }}>
                  {post.content.substring(0, 100)}...
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/post/${post.id.toString()}`}
                  variant="outlined"
                  color="primary"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
