import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import userAPI from '../../ api/user';

export const signIn = createAsyncThunk(
  'usersSlice/signIn',
  async ({ email, password }) => {
    try {
      const result = await userAPI.signIn(email, password);
      if (!result.data) {
        return Promise.reject(result.response.data.errors[0]);
      }
      const accessToken = result.data.token;
      localStorage.setItem('accessToken', accessToken);

      // Get information of current user after getting token
      const currentDoctor = await userAPI.getOne();
      localStorage.setItem(
        'currentDoctor',
        JSON.stringify(currentDoctor.data.data)
      );
      return currentDoctor.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateInformation = createAsyncThunk(
  'usersSlice/updateInformation',
  async (newInformation) => {
    try {
      const result = await userAPI.update(newInformation);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getIdentity = createAsyncThunk(
  'usersSlice/getIdentity',
  async () => {
    try {
      const result = await userAPI.getOne();
      return result.data.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const changePassword = createAsyncThunk(
  'usersSlice/changePassword',
  async (password) => {
    try {
      const result = await userAPI.changePassword(password);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: {
    users: [],
    userNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    changeUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar[0] = action.payload;
    },
    deleteUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar = [];
    },
  },
  extraReducers: {
    // Sign In
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [signIn.fulfilled]: (state, action) => {
      message.success('Signed In successfully!', 3);
      state.userNeedUpdate = action.payload;
      setTimeout(() => {
        window.location.href = '/profile/user-form';
      }, 1000);
      state.isLoading = false;
      state.hasError = false;
    },
    [signIn.rejected]: (state, action) => {
      message.error(`${action.error.message}, Please try again!`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Get identity
    [getIdentity.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getIdentity.fulfilled]: (state, action) => {
      action.payload.avatar = [{ url: action.payload.avatar }];
      state.userNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [getIdentity.rejected]: (state, action) => {
      message.error(`${action.error.message}, Please try again!`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update
    [updateInformation.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateInformation.fulfilled]: (state, action) => {
      message.success('Updated your information successfully!', 3);
      let currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));
      currentDoctor = action.payload;
      localStorage.setItem('currentDoctor', JSON.stringify(currentDoctor));
      action.payload.avatar = [{ url: action.payload.avatar }];
      state.userNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [updateInformation.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Change password
    [changePassword.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      message.success('Changed your password successfully!', 3);
      state.isLoading = false;
      state.hasError = false;
    },
    [changePassword.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const { changeUserNeedUpdateAvatar, deleteUserNeedUpdateAvatar } =
  usersSlice.actions;

// Selectors
export const selectUserIsLoading = (state) => state.users.isLoading;

export const selectUserNeedUpdate = (state) => state.users.userNeedUpdate;

export default usersSlice.reducer;
