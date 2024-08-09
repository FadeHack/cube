import { createTheme, ThemeOptions } from '@mui/material/styles';
import { blue, green, grey } from '@mui/material/colors';

// Define a custom theme
const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: blue[500],  // Primary color
            dark: grey[800],
        },
        secondary: {
            main: green[500],  // Secondary color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
    },
};

// Create the theme
const theme = createTheme(themeOptions);

export default theme;
