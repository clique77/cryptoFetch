'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { restoreAuth } from '@/store/features/auth/authSlice';
import { LocalStorageWorker } from '@/lib/localStorageWorker';
import type { UserResponse } from '@/lib/api';

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = LocalStorageWorker.getItem<string>('token');
    const user = LocalStorageWorker.getItem<UserResponse>('user');

    if (token && user) {
      //dispatch(restoreAuth({ user, token }));
      // just for testing
    }
  }, [dispatch]);

  return null;
}

