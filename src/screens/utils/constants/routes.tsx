export const BASE_URL = "https://reuse.risidev.com/api/v1";

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;
export const LOGOUT = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/auth/requestPasswordReset`;
export const RESET_PASSWORD = `${BASE_URL}/auth/resetPassword`;
export const RESEND_OTP = `${BASE_URL}/auth/resendOTP`
export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyEmail`
export const SAVE_DEVICE_INFO = `${BASE_URL}/auth/saveDeviceInfo`
export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/auth/setUpUserWalletAccount`;
export const UPDATEWALLETBALANCE = `${BASE_URL}/auth/updateShowWalletBalance`

//payments
export const PROCESSORDER = `${BASE_URL}/processOrder`;
export const USERPAYMENTS = `${BASE_URL}/getUserPayments`;
export const USERPRODUCTS = `${BASE_URL}/getUserProducts`
export const USERDELIVERIES = `${BASE_URL}/getUserDelivries`
export const USERNOTIFICATIONS = `${BASE_URL}/getUserNotifications`



//community 
export const GET_COMMUNITY_DETAILS = `${BASE_URL}/getCommunityDetails`
export const GET_COMMUNITY_TOTALS = `${BASE_URL}/getCommunityTotals`
export const GET_COMMUNITIES = `${BASE_URL}/getCommunitysByPage`
export const GET_ALL_COMMUNITIES = `${BASE_URL}/getAllAvailableCommunities`


//donor
export const GET_DONORS = `${BASE_URL}/getDonorsByPage`
export const GET_DONOR_DETAILS = `${BASE_URL}/getDonorDetails`
export const GET_DONOR_TOTALS = `${BASE_URL}/getDonorTotals`


//produucts 
export const CREATE_PRODUCT = `${BASE_URL}/createProduct`


//categories
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllProductCategories`
