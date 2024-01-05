import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { ActivityIndicator } from './ActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS, FONTFAMILY } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'


const NotificationFlatList = () => {
  return (
    <View>
      <Text>NotificationFlatList</Text>
    </View>
  )
}

export default NotificationFlatList

const styles = StyleSheet.create({})