import {Platform} from 'react-native';

export const Fonts = {
  bold: Platform.OS == 'android' ? 'EuclidCircularABold' : 'Inter-Bold',
  light: Platform.OS == 'android' ? 'EuclidCircularALight' : 'Inter-Light',
  medium: Platform.OS == 'android' ? 'EuclidCircularAMedium' : 'Inter-Medium',
  regular: Platform.OS == 'android' ? 'EuclidCircularARegular' : 'Inter-Regular',
  semiBold:  Platform.OS == 'android' ? 'EuclidCircularAsemiBold' : 'Inter-SemiBold',
};
