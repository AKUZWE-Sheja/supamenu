// src/components/CustomText.js
import { Text } from 'react-native';
import { useFont } from '../contexts/fontContext'; 

export const CustomText = ({ style, ...props }) => {
  const { fontsLoaded } = useFont();

  return (
    <Text
      style={[
        { fontFamily: fontsLoaded ? 'PlayfairDisplay_600SemiBold' : 'System' },
        style,
      ]}
      {...props}
    />
  );
};