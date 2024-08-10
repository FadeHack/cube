import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CustomerCardProps {
    name: string;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ name, title, isSelected, onClick }) => {
    return (
        <Card 
            onClick={onClick} 
            sx={{
                margin: 1,
                backgroundColor: isSelected ? '#f5f5f5' : '#fff', // Professional light gray background for selected
                border: isSelected ? '2px solid #333' : '1px solid #ddd', // Dark border for selected card
                cursor: 'pointer',
                transition: 'background-color 0.3s, border 0.3s',
                '&:hover': {
                    backgroundColor: '#f0f0f0' // Slightly darker on hover
                }
            }}
        >
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="textSecondary">{title}</Typography>
            </CardContent>
        </Card>
    );
};

export default CustomerCard;
