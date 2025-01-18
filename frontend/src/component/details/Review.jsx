import { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../../context/DataProvider';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const user = useSelector(s=>s.user.user?.username)
    const [review, setReview] = useState({ user: user, rating: 0, comment: '' });


    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8000/product/${productId}/reviews`);
            setReviews(response.data.reviews);
        } catch (err) {
            setError('Failed to fetch reviews. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async () => {
        if (!review.user || review.rating <= 0 || !review.comment) {
            setError('All fields are required, and rating must be greater than 0.');
            return;
        }
        setError('');
        try {
            const response = await axios.post(`http://localhost:8000/product/${productId}/review`, review);
            setReviews([...reviews, response.data.review]);
            setReview({ user: user, rating: 0, comment: '' });
        } catch (err) {
            setError('Failed to submit review. Please try again.');
        }
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Reviews
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            ) : (
                reviews.map((rev, index) => (
                    <Box
                        key={index}
                        mb={2}
                        p={2}
                        sx={{ 
                            backgroundColor: '#f9f9f9', 
                            borderRadius: '8px', 
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
                        }}
                    >
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            {rev.user}
                        </Typography>
                        <Rating value={rev.rating} readOnly size="small" />
                        <Typography variant="body1" mt={1}>
                            {rev.comment}
                        </Typography>
                    </Box>
                ))
            )}

            <Typography variant="h6" mt={4}>
                Add a Review
            </Typography>
            <TextField
                variant="outlined"
                label="User"
                name="user"
                value={review.user}
                onChange={(e) => setReview({ ...review, user: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <Typography variant="body1">Rating:</Typography>
                <Rating
                    name="rating"
                    value={review.rating}
                    onChange={(e, newValue) => setReview({ ...review, rating: newValue })}
                />
            </Box>
            <TextField
                variant="outlined"
                label="Comment"
                name="comment"
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                fullWidth
                margin="normal"
                multiline
                rows={3}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={submitReview}
                sx={{ marginTop: '10px' }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default Reviews;
