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
            // Modern light mode palette - Flat colors, no gradients
            primary: {
              main: '#2563eb', // Modern blue
              light: '#60a5fa',
              dark: '#1e40af',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#8b5cf6', // Modern purple
              light: '#a78bfa',
              dark: '#7c3aed',
              contrastText: '#ffffff',
            },
            background: {
              default: '#f8fafc', // Softer white
              paper: '#ffffff',
            },
            error: {
              main: '#ef4444',
              light: '#f87171',
              dark: '#dc2626',
            },
            warning: {
              main: '#f59e0b',
              light: '#fbbf24',
              dark: '#d97706',
            },
            info: {
              main: '#06b6d4',
              light: '#22d3ee',
              dark: '#0891b2',
            },
            success: {
              main: '#10b981',
              light: '#34d399',
              dark: '#059669',
            },
            text: {
              primary: '#1e293b',
              secondary: '#64748b',
            },
            divider: '#e2e8f0',
          }
        : {
            // Modern dark mode palette - Flat colors
            primary: {
              main: '#60a5fa',
              light: '#93c5fd',
              dark: '#3b82f6',
              contrastText: '#000000',
            },
            secondary: {
              main: '#a78bfa',
              light: '#c4b5fd',
              dark: '#8b5cf6',
              contrastText: '#000000',
            },
            background: {
              default: '#0f172a', // Modern dark blue-gray
              paper: '#1e293b',
            },
            error: {
              main: '#f87171',
              light: '#fca5a5',
              dark: '#ef4444',
            },
            warning: {
              main: '#fbbf24',
              light: '#fcd34d',
              dark: '#f59e0b',
            },
            info: {
              main: '#22d3ee',
              light: '#67e8f9',
              dark: '#06b6d4',
            },
            success: {
              main: '#34d399',
              light: '#6ee7b7',
              dark: '#10b981',
            },
            text: {
              primary: '#f1f5f9',
              secondary: '#94a3b8',
            },
            divider: '#334155',
          }),
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: 10,
            padding: '10px 24px',
            fontWeight: 500,
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
            '@media (max-width:600px)': {
              fontSize: '0.875rem',
              padding: '10px 20px',
              minHeight: '44px',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: 'none',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
            borderRadius: 16,
            border: mode === 'light' ? '1px solid #f1f5f9' : '1px solid #334155',
            '@media (max-width:600px)': {
              borderRadius: 12,
            },
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                : '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: 12,
            '@media (max-width:600px)': {
              borderRadius: 10,
            },
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
              : '0 1px 2px 0 rgb(0 0 0 / 0.3)',
          },
          elevation2: {
            boxShadow: mode === 'light'
              ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
          },
          elevation3: {
            boxShadow: mode === 'light'
              ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: 'none',
            borderBottom: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              paddingLeft: '16px',
              paddingRight: '16px',
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
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              '&:hover fieldset': {
                borderWidth: '1.5px',
              },
              '&.Mui-focused fieldset': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
          input: {
            '@media (max-width:600px)': {
              fontSize: '1rem',
              padding: '14px',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            margin: '2px 8px',
            '@media (max-width:600px)': {
              minHeight: '48px',
              fontSize: '1rem',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: mode === 'light' ? '#e2e8f0' : '#334155',
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
          indicator: {
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            borderRadius: '8px 8px 0 0',
            '@media (max-width:600px)': {
              minHeight: '48px',
              fontSize: '0.875rem',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'light' 
              ? '1px solid #e2e8f0' 
              : '1px solid #334155',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
          },
        },
      },
    },
  };

  // Create theme with responsive typography
  return responsiveFontSizes(createTheme(themeOptions), {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    factor: 3 // Better responsiveness
  });
};

// Export createAppTheme function instead of a static theme
export default createAppTheme;
