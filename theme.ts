import { createTheme } from '@mui/material/styles'; //i didn't like the blue focus thing

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#b09ecf',
        },
        secondary: {
            main: '#507551',
        },
        error: {
            main: '#af444f',
        },
    },

});
export default theme;