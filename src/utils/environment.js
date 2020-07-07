import Constants from 'expo-constants';

const isProduction = !!(
    Constants.manifest.id === '@m_adnan_93/enategafull' && Constants.manifest.publishedTime
);

export default {
    isProduction
  };