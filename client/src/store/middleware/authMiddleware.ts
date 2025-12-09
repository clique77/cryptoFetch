import { Middleware } from "@reduxjs/toolkit";
import { LocalStorageWorker } from "@/lib/localStorageWorker";
import { loginUser, registerUser } from "../features/auth/authThunks";
import { logout } from "../features/auth/authSlice";

export const authMiddleware: Middleware = (store) => (next) => async (action) => {
  if (loginUser.fulfilled.match(action) || registerUser.fulfilled.match(action)) {
    const { user, token } = action.payload;
    LocalStorageWorker.setItem('token', token);
    LocalStorageWorker.setItem('user', user);
  }
  if (logout.match(action)) {
    LocalStorageWorker.removeItem('token');
    LocalStorageWorker.removeItem('user');
  }
  return next(action);
}