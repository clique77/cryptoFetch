'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/lib/api';
import { ApiException } from '@/lib/api';
import { LocalStorageWorker } from '@/lib/localStorageWorker';
import { 
  TextField,      
  Button, 
  Box,            
  Typography,     
  Alert,          
  CircularProgress 
} from '@mui/material';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    if (!email.trim() || !accountName.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await apiClient.register({ email, password, accountName });
      LocalStorageWorker.setItem('token', response.token);
      LocalStorageWorker.setItem('user', response.user);
      router.push('/login');
    } catch (error) {
      if (error instanceof ApiException || error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'accountName':
        setAccountName(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 50, 
          scale: 0.9 
        }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1 
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.1
        }}
        style={{ 
          width: '100%',
          maxWidth: 500,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(156, 39, 176, 0.2)',
            boxShadow: '0 8px 32px rgba(156, 39, 176, 0.1)',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(156, 39, 176, 0.4)',
              boxShadow: '0 12px 40px rgba(156, 39, 176, 0.2), 0 0 0 1px rgba(156, 39, 176, 0.3)'
            }
          }}
        >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Sign Up
        </Typography>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 30 
              }}
            >
              <Alert
                severity="error"
                onClose={() => setError('')}
                sx={{
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
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  },
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <TextField
          label="Email"               
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          fullWidth
          required
          disabled={isLoading}
          sx={{
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem',
            },
            '& .MuiOutlinedInput-input': {
              padding: '16px 14px',
              fontSize: '1.1rem',
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
          }}
        />

        <TextField
          label="Account Name"
          name="accountName"
          value={accountName}
          onChange={handleChange}
          fullWidth
          required
          disabled={isLoading}
          sx={{
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem',
            },
            '& .MuiOutlinedInput-input': {
              padding: '16px 14px',
              fontSize: '1.1rem',
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
          }}
        /> 

        <TextField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          fullWidth
          required
          disabled={isLoading}
          sx={{
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem',
            },
            '& .MuiOutlinedInput-input': {
              padding: '16px 14px',
              fontSize: '1.1rem',
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
          }}
        />

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 17 
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              py: 2,
              background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
              boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
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
            }}
          >
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress 
                size={24} 
                sx={{ 
                  color: '#ffffff',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }} 
              />
            </Box>
          ) : (
            'Register'
          )}
        </Button>
        </motion.div>
        </Box>
      </motion.div>
    </Box>
  )
}

export default RegisterForm;