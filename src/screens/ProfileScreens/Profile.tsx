import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import HeadProfileCard from '../../components/HeadProfileCard';
import ProfileDetailsCard from '../../components/ProfileCardDetails';
import { COLORS } from '../../theme/theme';




const Profile = () => {




  const [profile_details,] = useState([
    {
      name: 'Edit Profile',
      screen: 'EditProfile',
    },
    {
      name: 'Verification',
      screen: 'Verification',
    },
    {
      name: 'Private Policy',
      screen: 'PrivatePolicy',
    },
    {
      name: "Share App",
      screen: "Share App"
    },


    {
      name: 'About Us',
      screen: 'AboutUs',
    },
    {
      name: 'Support',
      screen: 'Support',
    },
    {
      name: 'Sign Out',
      screen: 'Sign Out',
    },

  ]);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}
      >
        {/* header profile card */}
        <HeadProfileCard />
        {/* header profile card */}



        {/* profile details */}
        <ProfileDetailsCard
          details={profile_details}
          showSwitch={false}
        />
        {/* profile details */}



      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
