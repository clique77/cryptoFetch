import { SxProps, Theme } from '@mui/material';

//TODO: Use these styles for login form aswell, move it to the shared folder

export const formStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 2,
    position: 'relative',
    overflow: 'hidden',
  } as SxProps<Theme>,

  form: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    width: '100%',
    maxWidth: 900,
    padding: 4,
    borderRadius: 3,
    backgroundColor: (theme: Theme) => 
      theme.palette.mode === 'dark' 
        ? 'rgba(30, 30, 30, 0.8)' 
        : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(156, 39, 176, 0.2)',
    boxShadow: '0 8px 32px rgba(156, 39, 176, 0.1)',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(156, 39, 176, 0.4)',
      boxShadow: '0 12px 40px rgba(156, 39, 176, 0.2), 0 0 0 1px rgba(156, 39, 176, 0.3)'
    }
  } as SxProps<Theme>,

  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flex: '3 1 0%',
    minWidth: 0,
    borderRight: (theme: Theme) => 
      theme.palette.mode === 'dark' 
        ? '2px solid rgba(44, 44, 44, 0.9)' 
        : '2px solid rgba(200, 200, 200, 0.5)',
    paddingRight: 4,
  } as SxProps<Theme>,

  title: {
    background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    mb: 2,
    fontSize: { xs: '2rem', sm: '2.5rem' },
  } as SxProps<Theme>,

  textField: {
    '& .MuiInputLabel-root': {
      fontSize: '1.1rem',
    },
    '& .MuiOutlinedInput-input': {
      padding: '16px 14px',
      fontSize: '1.1rem',
      '&:-webkit-autofill': {
        WebkitBoxShadow: (theme: Theme) => 
          theme.palette.mode === 'dark'
            ? '0 0 0 1000px rgba(15, 15, 15, 0.9) inset'
            : '0 0 0 1000px rgba(255, 255, 255, 0.9) inset',
      }
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(156, 39, 176, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9c27b0',
        borderWidth: 2,
      },
    },
  } as SxProps<Theme>,

  button: {
    mt: 3,
    py: 2,
    background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1.1rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%)',
      boxShadow: '0 6px 20px rgba(156, 39, 176, 0.6)',
    },
    '&:disabled': {
      background: 'rgba(156, 39, 176, 0.3)',
    },
  } as SxProps<Theme>,

  alert: {
    width: '100%',
    backgroundColor: 'rgba(211, 47, 47, 0.2)',
    border: '2px solid rgba(211, 47, 47, 0.8)',
    borderRadius: 2,
    position: 'relative',
    zIndex: 10,
    mb: 1,
    '& .MuiAlert-icon': {
      color: '#ff5252',
    },
    '& .MuiAlert-message': {
      color: (theme: Theme) => 
        theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
  } as SxProps<Theme>,

  motionWrapper: {
    width: '100%',
    maxWidth: 900,
    position: 'relative' as const,
    zIndex: 1,
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '2 1 0%',
    paddingLeft: '2rem',
  },

  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    opacity: 0.9,
  },

  circularProgress: {
    color: (theme: Theme) => 
      theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  } as SxProps<Theme>,
};