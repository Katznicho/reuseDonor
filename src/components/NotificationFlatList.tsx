import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import NotificationCard from './NotificationCard'




const NotificationFlatList = ({ notificationData, loadMoreData, isFetching }: any) => {
  return (
    <FlatList
      data={notificationData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => String(item?.id)}
      style={{ marginHorizontal: 10 }}
      renderItem={({ item, index }: any) => (
        <NotificationCard
          type={item?.title}
          time={item?.created_at}
          description={item?.message}
        />
      )}

      onEndReached={() => {
        loadMoreData()
      }}
      onEndReachedThreshold={0.5}
      // ListFooterComponent={isFetching && <ActivityIndicator />}
      // refreshControl={isFetching && <ActivityIndicator />}
      onRefresh={loadMoreData}
      refreshing={isFetching}
      contentContainerStyle={{ paddingBottom: 50 }}
    />
  )
}

export default NotificationFlatList

const styles = StyleSheet.create({})