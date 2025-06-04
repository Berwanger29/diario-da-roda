import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import theme from "../theme/theme";
import { DefaultText } from './DefaultText';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : process.env.EXPO_PUBLIC_ADMOB_ID_BANNER as string;

export function CardAdBanner() {
    const [adLoaded, setAdLoaded] = useState(false);

    return (
        <View style={styles.container}>
            {
                adLoaded && <DefaultText
                    text="Anúncio"
                    fontSize="S"
                    weight="LIGHT"
                    color="LIGHT_400"
                    style={{ alignSelf: "center" }}
                />
            }

            <View style={[styles.adContainer, !adLoaded && { opacity: 0 }]}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => setAdLoaded(true)}
                    onAdFailedToLoad={(error) => {
                        console.warn("Falha ao carregar banner:", error);
                        setAdLoaded(false);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        width: "100%",
        // backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    adContainer: {
        width: "100%",
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
    }
})