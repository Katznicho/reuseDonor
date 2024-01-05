import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../theme/theme';
import NotificationFlatList from '../../components/NotificationFlatList';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const All = (): JSX.Element => {



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            <NotificationFlatList />
        </SafeAreaView>
    )
}

export default All
