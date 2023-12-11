import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface UserState {
  isLoggedIn: boolean;
  appIntro: boolean;
  guestUser: boolean;
  user: User
  userProfile:UserProfile|null
  
}

interface User{
  UID: string;
  fname: string;
  lname: string;
  email: string;
  isVerified: boolean;
  phone: string;
  username: string; 
  displayPicture:string,
  community:string,
  reuseType:string,
}

interface UserProfile{
   gender?: string
    preferences?: string[]
    reuser?: string
}

const initialState: UserState = {
  isLoggedIn: false,
  appIntro: false,
  user: {
    UID: '',
    fname: '',
    lname: '',
    email: '',
    username: '',
    community: '',
    displayPicture: '',
    reuseType:"",
    isVerified: false,
    phone:""

  },
  guestUser: true,
  userProfile: null
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    updateUserState: (state, action: PayloadAction<UserState>) => {
      
      state.isLoggedIn = action.payload?.isLoggedIn;
      state.appIntro = action.payload?.appIntro;
      state.user = action.payload?.user;
      state.guestUser = action.payload.guestUser;
    },

    logoutUser: state => {
      state.isLoggedIn = false;
      state.user =  {
        UID: '',
        fname: '',
        lname: '',
        email: '',
        username: '',
        community: '',
        displayPicture: '',
        reuseType:"",
        isVerified: false,
        phone:""
      }
    },
    setAppIntro: state => {
      state.appIntro = true;
    },
    loginUser: (state , action:PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.appIntro = true;
      state.user = action.payload;
      state.guestUser = false;
    },
    registerUser: (state , action:PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.appIntro = false;
      state.user = action.payload;
      state.guestUser = false;
    },
    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateAppIntro: (state, action: PayloadAction<boolean>) => {
      state.appIntro = action.payload;
    },
    
   
    guestLogin: state => {
      state.guestUser = true;
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload?.userProfile;
    },
    updateProfilePicture:(state, action:PayloadAction<string>)=>{
      
      if (state && state.user) {
        state.user.displayPicture = action.payload;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUserState,
  logoutUser,
  setAppIntro,
  loginUser,
  guestLogin,
  updateUserProfile,
  updateProfilePicture,
  registerUser,
  updateIsLoggedIn,
  updateAppIntro
} = userSlice.actions;

export default userSlice.reducer;
