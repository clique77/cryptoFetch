'use client';

import { useState } from 'react';
import { apiClient, ApiException } from '@/lib/api';
import { LocalStorageWorker } from '@/lib/localStorageWorker';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await apiClient.login({ email, password });
      LocalStorageWorker.setItem('token', response.token);
      LocalStorageWorker.setItem('user', response.user);
      router.push('/');
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

  return (
    <>
    </>
  )
}

export default LoginForm;