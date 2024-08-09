// src/components/CustomerDetails.tsx

import React from 'react';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import { useCustomerStore } from '../store/useCustomerStore';
import NoCustomerSelected from './NoCustomerSelected'; 
import { fetchPhotos } from '../api';
import LazyLoad from 'react-lazyload'; 
import CustomAlert from '../components/common/CustomAlert';

// Component for displaying photo cards
const PhotoCard: React.FC<{ photo: any }> = ({ photo }) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3, transition: 'transform 0.3s' }}>
        <LazyLoad height={200} once> {/* Wrap CardMedia with LazyLoad */}
          <CardMedia
            component="img"
            image={photo.download_url}
            alt={photo.author}
            sx={{ height: 200, objectFit: 'cover' }}
          />
        </LazyLoad>
      </Card>
    </Grid>
  );

// Component for displaying customer details
const CustomerDetails: React.FC = () => {
    const { selectedCustomer, photos, setPhotos, selectedCustomerId } = useCustomerStore();
    const [error, setError] = React.useState<string | null>(null);


    React.useEffect(() => {
        if (selectedCustomerId) {
            const loadCustomerPhotos = async () => {
                try {
                    const newPhotos = await fetchPhotos(); // Assuming different photos for different customers
                    setPhotos(newPhotos);
                    setError(null); // Clear any previous error
                } catch (err) {
                    setError('Failed to fetch photos. Fetching Limit of 50 request has been exceeded.');
                }
            };

            loadCustomerPhotos();
        }
    }, [selectedCustomerId, setPhotos]);

    if (!selectedCustomer) return <NoCustomerSelected />;

    return (
        <Box sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
            {error && <CustomAlert message={error} onClose={() => setError(null)} />}

            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {selectedCustomer.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {selectedCustomer.description}
                </Typography>
            </Box>

            <Box sx={{ height: 'calc(100% - 120px)', overflowY: 'auto' }}> {/* Adjust height to avoid scrollbar */}
                <Grid container spacing={2}>
                    {photos.map((photo: any, index: number) => (
                        <PhotoCard key={photo.id || index} photo={photo} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CustomerDetails;
