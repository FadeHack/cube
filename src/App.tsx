// src/App.tsx

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/index';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    );
};

export default App;
