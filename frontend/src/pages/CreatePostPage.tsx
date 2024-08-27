import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface PostFormData {
  title: string;
  content: string;
}

const CreatePostPage: React.FC = () => {
  const { control, handleSubmit } = useForm<PostFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: PostFormData) => {
    try {
      const result = await backend.createBlogPost(data.title, data.content);
      if ('ok' in result) {
        navigate(`/post/${result.ok.toString()}`);
      } else {
        console.error('Error creating blog post:', result.err);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Blog Post
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
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
