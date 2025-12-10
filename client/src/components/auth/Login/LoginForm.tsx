'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/features/auth/authThunks';
import { clearError } from '@/store/features/auth/authSlice';
import { 
  TextField,      
  Button, 
  Box,            
  Typography,     
  Alert,          
  CircularProgress 
} from '@mui/material';
import { formStyles } from '../AuthForms.module';
import { IMAGES } from '@/constants/images';
import Lottie from 'lottie-react';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      router.push('/');
    }
  }, [user, token, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearError());

    if (!email.trim() || !password.trim()) {
      return;
    }

    await dispatch(loginUser({
      email,
      password,
    }));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (error) dispatch(clearError());

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }

  return (
    <Box sx={formStyles.container}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={formStyles.motionWrapper}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={formStyles.form}>
          <Box sx={formStyles.leftSection}>
            <Typography variant="h3" component="h1" align="center" gutterBottom sx={formStyles.title}>
              Sign In
            </Typography>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Alert severity="error" sx={formStyles.alert} onClose={() => dispatch(clearError())}>
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
              sx={formStyles.textField}
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
              sx={formStyles.textField}
            />

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                sx={formStyles.button}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={24} sx={formStyles.circularProgress} />
                  </Box>
                ) : (
                  'Login'
                )}
              </Button>
            </motion.div>

            <Box sx={formStyles.linkContainer}>
              <Typography sx={formStyles.linkText}>
                Don't have an account?
              </Typography>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <Typography component="span" sx={formStyles.link}>
                  Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={formStyles.imageWrapper}
          >
            <Lottie
              animationData={IMAGES.CRYPTO_WALLET_ANIMATION}
              style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
              loop={true}
              autoplay={true}
            />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  )
}

export default LoginForm;