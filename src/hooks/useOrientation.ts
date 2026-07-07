import { useWindowDimensions } from 'react-native';

export const useOrientation = () => {
  const { width, height } = useWindowDimensions();
  return {
    isLandscape: width > height,
    width,
    height,
  };
};
