// src/components/NoCustomerSelected.tsx

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const NoCustomerSelected: React.FC = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InfoIcon sx={{ fontSize: 60, color: 'primary.dark', marginBottom: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    Select a customer to view details
                </Typography>
            </Box>
        </Container>
    );
};

export default NoCustomerSelected;
