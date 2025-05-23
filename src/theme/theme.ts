import { createTheme, responsiveFontSizes, Theme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Create theme based on mode (light/dark)
const createAppTheme = (mode: PaletteMode): Theme => {
  const themeOptions: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode palette
            primary: {
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0',
            },
            secondary: {
              main: '#9c27b0',
              light: '#ba68c8',
              dark: '#7b1fa2',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            error: {
              main: '#d32f2f',
            },
            warning: {
              main: '#ff9800',
            },
            info: {
              main: '#03a9f4',
            },
            success: {
              main: '#4caf50',
            },
            text: {
              primary: '#212121',
              secondary: '#757575',
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5',
            },
            secondary: {
              main: '#ce93d8',
              light: '#f3e5f5',
              dark: '#ab47bc',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            error: {
              main: '#f44336',
              light: '#e57373',
            },
            warning: {
              main: '#ff9800',
              light: '#ffb74d',
            },
            info: {
              main: '#29b6f6',
              light: '#4fc3f7',
            },
            success: {
              main: '#66bb6a',
              light: '#81c784',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
          }),
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
            '@media (max-width:600px)': {
              fontSize: '0.875rem',
              padding: '8px 16px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 1px 10px 0px rgba(0,0,0,0.05)',
            borderRadius: 12,
            '@media (max-width:600px)': {
              borderRadius: 8,
            },
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 12,
            '@media (max-width:600px)': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              padding: '0 12px',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              minWidth: '100%',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '@media (max-width:600px)': {
              fontSize: '0.95rem',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              minHeight: '48px',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              minHeight: '48px',
            },
          },
        },
      },
      // Dark mode specific overrides
      ...(mode === 'dark' && {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
          },
        },
      }),
    },
  };

  // Create theme with responsive typography
  return responsiveFontSizes(createTheme(themeOptions), {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    factor: 2 // Increase responsiveness factor
  });
};

// Export createAppTheme function instead of a static theme
export default createAppTheme;
