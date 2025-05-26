import React, { useRef, useState } from 'react';
import { View, Platform, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import theme from "../theme/theme";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : process.env.EXPO_PUBLIC_ADMOB_ID_BANNER as string;

export function CardAdBanner() {

    return (
        <View
            style={styles.container}
        >
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    networkExtras: {
                        collapsible: 'bottom',
                    },
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
    },
})