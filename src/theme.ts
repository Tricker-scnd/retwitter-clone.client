import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette:{
        background: {
            default: "#fff"
        },
        primary:{
            light:'rgb(106, 167, 156)',
            main: 'rgb(60, 101, 101)',
            dark: 'rgb(49, 76, 76)',
            contrastText: '#fff',
        },
        secondary: {
          main: '#fff',
          dark: '#eee',
          contrastText: 'rgb(49, 76, 76)',
        },
        text:{
          primary:'#333',
          secondary:'rgb(91,113,131)',
        }

    },
    spacing: 4,
    overrides:{
      MuiButton:{
        root:{
          borderRadius: 30,
          backgroundColor: 'rgb(60, 101, 101)',
        },
        textPrimary:{
          color: '#fff'
        },
        outlinedPrimary:{
          backgroundColor: '#fff',
          border: '1px solid rgb(60, 101, 101)',
          '&:hover':{
            backgroundColor: 'rgb(60, 101, 101)',
            color: '#fff'
          }
        }
      }
    }
  });

export default theme