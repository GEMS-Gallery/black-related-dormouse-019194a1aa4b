import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Divider, TextField, Button } from '@mui/material';
import { backend } from 'declarations/backend';
import { useForm, Controller } from 'react-hook-form';
import { formatDate } from '../utils/dateFormatter';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number | null;
}

interface Comment {
  id: bigint;
  postId: bigint;
  content: string;
  createdAt: number;
}

interface CommentFormData {
  content: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { control, handleSubmit, reset } = useForm<CommentFormData>();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        if (id) {
          const postResult = await backend.getBlogPost(BigInt(id));
          if (postResult) {
            setPost(postResult);
            const commentsResult = await backend.getComments(BigInt(id));
            setComments(commentsResult);
          }
        }
      } catch (error) {
        console.error('Error fetching blog post and comments:', error);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const onSubmit = async (data: CommentFormData) => {
    try {
      if (id) {
        const result = await backend.addComment(BigInt(id), data.content);
        if ('ok' in result) {
          const newComment = await backend.getComments(BigInt(id));
          setComments(newComment);
          reset();
        } else {
          console.error('Error adding comment:', result.err);
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h4" component="h1" gutterBottom color="text.primary">
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
          {formatDate(post.createdAt)}
        </Typography>
        <Typography variant="body1" paragraph color="text.primary">
          {post.content}
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom color="text.primary">
        Comments
      </Typography>

      {comments.map((comment) => (
        <Paper key={comment.id.toString()} elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
          <Typography variant="body1" color="text.primary">{comment.content}</Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
              fontStyle: 'italic',
              mt: 1,
              display: 'block'
            }}
          >
            {formatDate(comment.createdAt)}
          </Typography>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" component="h3" gutterBottom color="text.primary">
        Add a Comment
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: 'Comment is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              label="Your comment"
              error={!!error}
              helperText={error?.message}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Comment
        </Button>
      </form>
    </Box>
  );
};

export default BlogPostPage;
