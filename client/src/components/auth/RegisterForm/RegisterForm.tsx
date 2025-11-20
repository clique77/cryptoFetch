'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    try {
      setIsLoading(true);
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

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
    </>
  )
}

export default RegisterForm;