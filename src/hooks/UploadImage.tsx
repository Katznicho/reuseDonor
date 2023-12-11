import storage from '@react-native-firebase/storage';
import { showMessage } from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import { USER_COLLECTION } from '../screens/utils/constants/constants';



export const UploadImage = async (uid: any, imagePicked: any, folder_name: string, isProfileImage: boolean = false) => {
  let image: any = '';
  let error: any = '';

  try {
    const fileExtension = imagePicked?.split('.').pop();
    //generate a random name for the image
    const imageName = Math.random().toString(36).substring(7);
    //append the extension to the image name
    const imageFileName = uid + imageName + '.' + fileExtension;
    //create a reference for the file
    const imageRef = storage().ref(`${folder_name}/` + imageFileName);
    //upload the file
    const uploadTask = imageRef.putFile(imagePicked);
    //check the progress of the upload
    showMessage({
      message: 'success',
      description: `please wait...`,
      type: 'success',
      icon: 'success',
      autoHide: true,
      duration: 5000,
    });
    //wait for the upload to finish
    await uploadTask;
    //get the download url
    const url = await imageRef.getDownloadURL();
    //update the user document with the new photoURL
    if (isProfileImage) {
      await firestore().collection(USER_COLLECTION).doc(uid).update({
        displayPicture: url,
      });
    }
    //set image to the url
    image = url;
  } catch (e) {
    error = e;
  }

  return { image, error };
}
