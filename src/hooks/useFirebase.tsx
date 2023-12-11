import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, registerUser, setAppIntro, updateAppIntro, updateIsLoggedIn, updateUserProfile } from '../redux/store/slices/UserSlice';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { APP_USERS, PAYMENT_STATUS, PRODUCT_COLLECTION } from '../screens/utils/constants/constants';
// import { WEB_CLIENT_ID } from '@env';

const USER_COLLECTION = "users";
const CATEGORY_COLLECTION = "categories";
const PAYMENT_COLLECTION = "payments";
const DELIVERY_COLLECTION = "delivery";
//notification
const NOTIFICATION_COLLECTION = "notifications";

const notificationStatus = {
  UNREAD: 'unread',
  READ: 'read',
}




export const useFirebase = () => {
  const dispatch = useDispatch<any>();

  // Function to get the current logged-in user
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth().onAuthStateChanged(async (user) => {
        if (!user) {
          unsubscribe();
          resolve(null);
        }
        else {
          let userUid = user.uid;
          const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
          if (userDoc.exists) {
            const user = userDoc.data();
            dispatch(setAppIntro());
            dispatch(loginUser({
              UID: userUid,
              fname: user?.firstName,
              lname: user?.lastName,
              email: user?.email,
              username: user?.username,
              community: user?.community,
              isVerified: false,
              phone: '',
              displayPicture: '',
              reuseType: ''
            }))

          }
          unsubscribe();
          resolve(user);
        }

      });
    });
  };


  /**
   * Registers a new user with the given email, password, username, first name, last name, user type, community name, and phone number.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} username - The username of the user.
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} userType - The type of the user.
   * @param {string} communityName - The name of the community.
   * @param {string} phoneNumber - The phone number of the user.
   * @return {Promise<UserCredential | Error>} The registered user credential or an error if registration fails.
   */
  const register = async (email: string, password: string, username: string, firstName: string, lastName: string, userType: String, communityName: string, phoneNumber: string) => {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const userUid = userCredentials.user.uid;

      // Store additional user details in the "users" collection
      if (userType == APP_USERS.RECEIVER) {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          communityName: communityName,
          firstName: "",
          lastName: "",
          isVerified: false,
          phone: phoneNumber,
          displayPicture: '',
          reuseType: ''
        });
        dispatch(registerUser({
          UID: userUid,
          fname: "",
          lname: "",
          email: email,
          username: username,
          community: communityName,
          isVerified: false,
          phone: phoneNumber,
          displayPicture: '',
          reuseType: ''
        }))
      }
      else {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          firstName: firstName,
          lastName: lastName,
          community: "",
          isVerified: false,
          phone: phoneNumber,
          displayPicture: '',
          reuseType: ''
        });
        dispatch(registerUser({
          UID: userUid,
          fname: firstName,
          lname: lastName,
          email: email,
          username: username,
          community: "",
          isVerified: false,
          phone: phoneNumber,
          displayPicture: '',
          reuseType: ''
        }))
      }

      dispatch(updateIsLoggedIn(true));



      return userCredentials.user;

    } catch (error) {
      return error;
    }
  }


  const signUpWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId: "51604544208-6on9b4pi6cir1intl430m18u6v70ije6.apps.googleusercontent.com",
      // offlineAccess: true,
      forceCodeForRefreshToken: true
    })

    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredentials = await auth().signInWithCredential(googleCredential);
      const userUid = userCredentials.user.uid;
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();


      if (userDoc.exists) {
        const user = userDoc.data();
        dispatch(setAppIntro());
        dispatch(loginUser({
          UID: userUid,
          fname: user?.firstName,
          lname: user?.lastName,
          email: user?.email,
          username: user?.username,
          community: user?.communityName,
          isVerified: false,
          phone: user?.phoneNumber,
          displayPicture: user?.displayPicture,
          reuseType: user?.userType

        }))
      }
      // setState({ userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const registerUserWithGoogle = async (userType: String) => {
    GoogleSignin.configure({
      webClientId: "51604544208-6on9b4pi6cir1intl430m18u6v70ije6.apps.googleusercontent.com",
      // offlineAccess: true,
      forceCodeForRefreshToken: true
    })
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredentials = await auth().signInWithCredential(googleCredential);
      const userUid = userCredentials.user.uid;

      if (userType == APP_USERS.RECEIVER) {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: userCredentials.user.email,
          username: userCredentials.user.displayName,
          userType: userType,
          communityName: "",
          firstName: userCredentials?.user?.displayName?.split(" ")[0],
          lastName: userCredentials?.user?.displayName?.split(" ")[1],
          phone: userCredentials.user.phoneNumber,
          displayPicture: userCredentials.user.photoURL,
          reuseType: userType
        });
      }
      else {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: userCredentials.user.email,
          username: userCredentials.user.displayName,
          userType: userType,
          firstName: userCredentials?.user?.displayName?.split(" ")[0],
          lastName: userCredentials?.user?.displayName?.split(" ")[1],
          community: "",
          phone: userCredentials.user.phoneNumber,
          displayPicture: userCredentials.user.photoURL,
          reuseType: userType
        });
      }


      // setState({ userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  }



  const login = async (email: string, password: string) => {
    try {
      let userCredentails = await auth().signInWithEmailAndPassword(email, password);
      const userUid = userCredentails.user.uid;
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        dispatch(setAppIntro());
        dispatch(loginUser({
          UID: userUid,
          fname: user?.firstName,
          lname: user?.lastName,
          email: user?.email,
          username: user?.username,
          community: user?.communityName,
          isVerified: false,
          phone: user?.phoneNumber,
          displayPicture: user?.displayPicture,
          reuseType: user?.reuseType
        }))
        dispatch(updateIsLoggedIn(true));

      }
      return { user: userCredentails.user };

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const logout = async () => {
    try {
      await auth().signOut();
      dispatch(logoutUser());
    } catch (error) {

    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      // Handle successful password reset request
      // For example:
      // dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });

    } catch (error) {
      console.log(error);
    }
  }

  const getUserDetails = async (userId: string) => {
    try {
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log("User not found.");
        return null;
      }

    } catch (error) {

      return error;
    }
  }

  const updateUserLocation = async (userId: string, latitude: string, longitude: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {

      return error;
    }
  }

  const updateUserDeviceId = async (userId: string, deviceId: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        deviceId: deviceId,
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserDeviceId = async (userId: string) => {
    try {
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const deviceId = userData?.deviceId; // Replace 'deviceId' with the actual field name
        return deviceId;
      } else {
        console.error('User document not found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting user device ID:', error);
      throw error;
    }
  };




  const updateUserProfilePreferences = async (userId: string, reuser: string, gender: string, preferences: string[]): Promise<boolean | null> => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        gender: gender,
        reuser: reuser,
        preferences: preferences,
      });
      dispatch(updateUserProfile({
        gender,
        preferences,
        reuser
      }))

      return true;


    } catch (error) {

      return null;
    }
  };

  const createDonationProduct = async (userId: string, product: any) => {
    try {
      await firestore().collection(PRODUCT_COLLECTION).add({
        ...product,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        rating: 4,
        userId: userId,
        paymentStatus: PAYMENT_STATUS.UNPAID
      });
    } catch (error) {
      console.log("Error updating user credentials:", error);
      return error;
    }
  };

  const getAllProducts = async () => {
    try {
      const querySnapshot = await firestore().collection(PRODUCT_COLLECTION).get();
      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });


      return products;
    } catch (error) {
      throw error;
    }
  };

  //update product payment status
  const updateProductPaymentStatus = async (productId: string, status: string, paymentId: string) => {
    try {
      await firestore().collection(PRODUCT_COLLECTION).doc(productId).update({
        paymentStatus: status,
        paymentId: paymentId
      });
    } catch (error) {
      console.error('Error updating product payment status:', error);
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const querySnapshot = await firestore().collection(CATEGORY_COLLECTION).get();
      const categories: any = [];
      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const data = documentSnapshot.data();
        // Include the document ID as part of the product data
        categories.push({ id: documentSnapshot.id, ...data });
      });
      return categories;

    } catch (error) {
      throw error;

    }
  }


  //get category by id
  const getCategoryById = async (categoryId: string) => {
    try {
      const categoryDoc = await firestore().collection(CATEGORY_COLLECTION).doc(categoryId).get();
      if (categoryDoc.exists) {
        return categoryDoc.data();
      } else {
        console.log("Category not found.");
        return null;
      }

      //return category;
    }

    catch (error) {
      throw error;
    }
  }


  const getAllUsers = async () => {
    try {
      const querySnapshot = await firestore().collection(USER_COLLECTION).get();
      const users: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the product data
        users.push({ id: documentSnapshot.id, ...userData });
      });

      return users;
    } catch (error) {
      throw error;
    }
  };

  const getAllDonors = async () => {
    try {
      const querySnapshot = await firestore()
        .collection(USER_COLLECTION)
        .where('userType', '==', APP_USERS.DONOR)
        .get();

      const donors: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each user document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the user data
        donors.push({ id: documentSnapshot.id, ...userData });
      });

      return donors;
    } catch (error) {

      throw error;
    }
  };



  /**
   * Retrieves all communities from the firestore database.
   *
   * @return {Array} An array of community objects.
   */
  /**
   * Retrieves all communities from the firestore database.
   *
   * @return {Array} An array of community objects.
   */
  const getAllCommunities = async (): Promise<any[]> => {
    try {
      const querySnapshot = await firestore()
        .collection(USER_COLLECTION)
        .where('userType', '==', APP_USERS.RECEIVER)
        .get();

      const communities: any[] | PromiseLike<any[]> = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each community document
        const communityData = documentSnapshot.data();
        // Include the document ID as part of the community data
        communities.push({ id: documentSnapshot.id, ...communityData });
      });

      return communities;
    } catch (error) {
      throw error;
    }
  };







  const getUserByUid = async (uid: any): Promise<any> => {
    try {
      const userDoc = await firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .get();

      if (userDoc.exists) {
        // User document found, return its data
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        // User document not found
        return null;
      }
    } catch (error) {
      throw error;
    }
  };



  const getProductsByUserId = async (userId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId) // Replace 'userId' with the actual field name
        .get();

      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });

      return products;
    } catch (error) {
      console.error('Error getting products by user ID:', error);
      throw error;
    }
  };

  const getProductByProductId = async (productId: string) => {
    try {
      const productDoc = await firestore()
        .collection(PRODUCT_COLLECTION)
        .doc(productId)
        .get();

      if (productDoc.exists) {
        return { id: productDoc.id, ...productDoc.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw error
    }
  };

  const getPaymentByPaymentId = async (paymentId: string) => {
    try {
      const paymentDoc = await firestore()
        .collection(PAYMENT_COLLECTION)
        .doc(paymentId)
        .get();

      if (paymentDoc.exists) {
        return { id: paymentDoc.id, ...paymentDoc.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw error
    }
  };

  //get products by user id and status
  const getProductsByUserIdAndStatus = async (userId: string, status: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', status)
        .get();

      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });

      return products;
    } catch (error) {
      console.error('Error getting products by user ID and status:', error);
      throw error;
    }
  };

  //get payments by user id and status
  const getPaymentsByUserIdAndStatus = async (userId: string, status: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PAYMENT_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', status)
        .get();

      const payments: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each payment document
        const paymentData = documentSnapshot.data();
        // Include the document ID as part of the payment data
        payments.push({ id: documentSnapshot.id, ...paymentData });
      });

      return payments;
    } catch (error) {
      console.error('Error getting payments by user ID and status:', error);
      throw error;
    }
  };

  //store the payment details
  const storePaymentDetails = async (paymentDetails: any, transactionRef: string) => {
    try {
      await firestore().collection(PAYMENT_COLLECTION).doc(transactionRef).set({
        ...paymentDetails,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    } catch (error) {
      console.error('Error storing payment details:', error);
      throw error;
    }
  };

  //update payment status
  const updatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      await firestore().collection(PAYMENT_COLLECTION).doc(paymentId).update({
        status: status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  };

  //create a notification
  const createNotification = async (userId: string, notification: any) => {
    try {
      await firestore().collection(NOTIFICATION_COLLECTION).add({
        ...notification,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId,
        isRead: false,
        status: notificationStatus.UNREAD,
        isAdminRead: false
      });
    } catch (error) {
      console.log("Error creating notification:", error);
    }
  }

  //get all notifications for a user
  const getAllNotifications = async (userId: string) => {

    try {
      const querySnapshot = await firestore()
        .collection(NOTIFICATION_COLLECTION)
        .where('userId', '==', userId)
        .get();

      const notifications: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each notification document
        const deliveryData = documentSnapshot.data();


        // Include the document ID as part of the notification data
        notifications.push({ id: documentSnapshot.id, ...deliveryData });
      });

      return notifications;
    } catch (error) {
      throw error;
    }
  }

  const getDeliveryDetails = async (userId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(DELIVERY_COLLECTION)
        .where('userId', '==', userId)
        .get();

      let deliveries: any = [];

      // Use map to create an array of promises
      const deliveryPromises = querySnapshot.docs.map(async (documentSnapshot) => {
        const deliveryData = documentSnapshot.data();
        // Await getProductByProductId and add it to the deliveryData
        const productDetails = await getProductByProductId(documentSnapshot.id);

        return {
          id: documentSnapshot.id,
          ...deliveryData,
          product: productDetails,
        };
      });

      // Wait for all promises to resolve
      deliveries = await Promise.all(deliveryPromises);


      return deliveries;
    } catch (error) {
      throw error;
    }
  };

  const getDeliveryDetailsByStatus = async (userId: string, status: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(DELIVERY_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', status)
        .get();


      let deliveries: any = [];

      const deliveryPromises = querySnapshot.docs.map(async (documentSnapshot) => {
        const deliveryData = documentSnapshot.data();

        // Fetch product details
        const productDetails = await getProductByProductId(deliveryData?.productId);


        // Fetch receiver details
        const receiverDetails = await getUserByUid(deliveryData.receiverCommunity);
        if (productDetails?.paymentId) {
          const paymentDetails = await getPaymentByPaymentId(productDetails?.paymentId);
          // console.log("payment details")
          // console.log(paymentDetails)
          return {
            id: documentSnapshot.id,
            ...deliveryData,
            product: productDetails,
            receiver: receiverDetails,
            payments: paymentDetails
            // Add other properties as needed
          };
        }

        return {
          id: documentSnapshot.id,
          ...deliveryData,
          product: productDetails,
          receiver: receiverDetails,
          payments: null
          // Add other properties as needed
        };
      });

      deliveries = await Promise.all(deliveryPromises);
      return deliveries;
    } catch (error) {
      throw error;
    }
  }


  const getConfirmedOrUnconfirmedDeliveryDetails = async (userId: string, isConfirmed: boolean) => {
    try {
      const querySnapshot = await firestore()
        .collection(DELIVERY_COLLECTION)
        .where('userId', '==', userId)
        .where('isConfirmed', '==', isConfirmed)
        .get();

      let deliveries: any = [];

      const deliveryPromises = querySnapshot.docs.map(async (documentSnapshot) => {
        const deliveryData = documentSnapshot.data();

        // Fetch product details
        const productDetails = await getProductByProductId(deliveryData?.productId);





        // Fetch receiver details
        const receiverDetails = await getUserByUid(deliveryData.receiverCommunity);

        const paymentDetails = await getPaymentByPaymentId(productDetails?.paymentId);

        return {
          id: documentSnapshot.id,
          ...deliveryData,
          product: productDetails,
          receiver: receiverDetails,
          payments: paymentDetails
        };
      });

      deliveries = await Promise.all(deliveryPromises);
      return deliveries;
    } catch (error) {
      console.error('Error fetching delivery details:', error);
      throw error;
    }
  }
  const confirmDelivery = async (deliveryId: string) => {
    try {
      await firestore().collection(DELIVERY_COLLECTION).doc(deliveryId).update({
        isConfirmed: true
      });
    } catch (error) {
      throw error;
    }
  }





  // const getSpecificDeliveryDetailsById()

  //get all unread notifications
  const getAllUnreadNotifications = async (userId: string) => {

    try {
      const querySnapshot = await firestore()
        .collection(NOTIFICATION_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', notificationStatus.UNREAD)
        .get();

      const notifications: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each notification document
        const notificationData = documentSnapshot.data();
        // Include the document ID as part of the notification data
        notifications.push({ id: documentSnapshot.id, ...notificationData });
      });

      return notifications;
    } catch (error) {
      throw error;
    }
  }

  //update notification
  const updateNotification = async (notificationId: string, status: string) => {

    try {
      await firestore().collection(NOTIFICATION_COLLECTION).doc(notificationId).update({
        status: notificationStatus.READ,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: true
      });
    } catch (error) {
      throw error;
    }
  }


  const getUserTotals = async (userId: string) => {
    try {
      // Query payments
      const paymentSnapshot = await firestore()
        .collection(PAYMENT_COLLECTION)
        .where('userId', '==', userId)
        .get();

      const totalPaymentDocuments = paymentSnapshot.size;

      // Query delivery
      const deliverySnapshot = await firestore()
        .collection(DELIVERY_COLLECTION)
        .where('userId', '==', userId)
        .get();

      const totalDeliveryDocuments = deliverySnapshot.size;

      // Query products
      const productsSnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId)
        .get();

      const totalProductDocuments = productsSnapshot.size;





      // Return an object with document counts
      return {
        totalPaymentDocuments,
        totalDeliveryDocuments,
        totalProductDocuments,
      };
    } catch (error) {
      console.log("Error getting user document counts:", error);
      throw error;
    }
  };



  return {
    register,
    login,
    forgotPassword,
    getUserDetails,
    getCurrentUser,
    updateUserProfilePreferences,
    logout,
    updateUserLocation,
    createDonationProduct,
    getAllProducts,
    getProductsByUserId,
    getAllUsers,
    getUserByUid,
    getAllDonors,
    getAllCategories,
    getUserDeviceId,
    updateUserDeviceId,
    getAllCommunities,
    //notifications
    createNotification,
    updateNotification,
    getAllNotifications,
    getAllUnreadNotifications,
    getProductsByUserIdAndStatus,
    getPaymentsByUserIdAndStatus,
    updateProductPaymentStatus,
    storePaymentDetails,
    updatePaymentStatus,
    //notifications
    signUpWithGoogle,
    registerUserWithGoogle,
    getCategoryById,
    getDeliveryDetails,
    getDeliveryDetailsByStatus,
    getConfirmedOrUnconfirmedDeliveryDetails,
    getUserTotals,
    confirmDelivery


    // Export other auth functions here if needed
  };
}
