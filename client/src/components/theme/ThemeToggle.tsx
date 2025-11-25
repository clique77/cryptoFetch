'use client';

import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@/provider/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(156, 39, 176, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(156, 39, 176, 0.2)',
            borderColor: 'rgba(156, 39, 176, 0.4)',
          },
        }}
      >
        {mode === 'dark' ? (
          <Brightness7 sx={{ color: '#9c27b0' }} />
        ) : (
          <Brightness4 sx={{ color: '#9c27b0' }} />
        )}
      </IconButton>
    </Tooltip>
  );
}