import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface PostFormData {
  title: string;
  content: string;
  category: string;
}

const CreatePostPage: React.FC = () => {
  const { control, handleSubmit } = useForm<PostFormData>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await backend.getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: PostFormData) => {
    try {
      const result = await backend.createBlogPost(data.title, data.content, data.category);
      if ('ok' in result) {
        const newPost = result.ok;
        navigate(`/post/${newPost.id.toString()}`);
      } else {
        console.error('Error creating blog post:', result.err);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom color="text.primary">
        Create New Blog Post
      </Typography>
      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {error && <Typography color="error">{error.message}</Typography>}
              </FormControl>
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: 'Content is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                multiline
                rows={10}
                fullWidth
                label="Content"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePostPage;
