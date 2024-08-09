// src/components/common/CustomAlert.tsx

import React, { useEffect } from 'react';
import { Alert, AlertProps } from '@mui/material';

interface CustomAlertProps extends AlertProps {
    message: string;
    onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose, ...props }) => {
    useEffect(() => {
        // Automatically close the alert after 6 seconds
        const timer = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 4000);

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [onClose]);

    return (
        <Alert
            severity="error"
            onClose={onClose}
            sx={{ marginBottom: 2 }}
            {...props}
        >
            {message}
        </Alert>
    );
};

export default CustomAlert;
