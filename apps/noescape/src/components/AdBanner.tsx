import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import BannerAd, { BannerAdSize } from 'react-native-google-mobile-ads';

// Replace with your actual AdMob ad unit IDs
const AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2934735716', // Test ID
  android: 'ca-app-pub-3940256099942544/6300978111', // Test ID
});

const AdBanner: React.FC = () => {
  const [canShowAds, setCanShowAds] = useState(false);

  useEffect(() => {
    initializeAds();
  }, []);

  const initializeAds = async () => {
    try {
      // Check consent status (required for GDPR)
      const consentInfo = await AdsConsent.requestInfoUpdate();
      if (consentInfo.isConsentFormAvailable) {
        const status = await AdsConsent.loadAndShowConsentFormIfRequired();
        if (status === AdsConsentStatus.OBTAINED || status === AdsConsentStatus.NOT_REQUIRED) {
          setCanShowAds(true);
        }
      } else {
        setCanShowAds(true);
      }
    } catch (error) {
      console.error('Error initializing ads:', error);
      setCanShowAds(true); // Show ads anyway on error
    }
  };

  if (!canShowAds) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_ID!}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.log('Ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

export default AdBanner;
