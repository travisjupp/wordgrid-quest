import * as React from 'react';
import Svg, { Rect, Path, G} from 'react-native-svg';
import { View } from 'react-native';
import { useAppTheme } from '@/theme/themeConfig';

interface Props {
  width?:number; 
  height?:number;
}

const Logo = ({width=50, height=50}: Props) => {
  // Retrieve Custom Theme-properties
  const { logo, colors: { primary } } = useAppTheme();

  return (
    <View style={logo}>
      <Svg width={width} height={height} viewBox="0 0 1046 849" fill="none" >
        <G id="wgq-logo-plain">
          <Rect id="crown-block-r" x="664.686" y="141.421" width="200" height="200" 
            transform="rotate(-45 664.686 141.421)" fill={primary}/>
          <Rect id="crown-block-m" x="381.843" y="141.421" width="200" height="200" 
            transform="rotate(-45 381.843 141.421)" fill={primary}/>
          <Rect id="crown-block-m" x="381.843" y="141.421" width="200" height="200" 
            transform="rotate(-45 381.843 141.421)" fill={primary}/>
          <Rect id="crown-block-l" x="99" y="141.422" width="200" height="200" 
            transform="rotate(-45 99 141.422)" fill={primary}/>
          <Path id="base-block-union" 
            d="M806.106 565.686L523.264 848.528L240.422 565.686L523.264 
            282.843L806.106 565.686ZM381.843 424.265L240.421 565.686L99 
            424.265L240.421 282.843L381.843 424.265ZM947.528 424.264L806.106 
            565.686L664.686 424.264L806.106 282.843L947.528 424.264Z"
            fill={primary}
          />
        </G>
      </Svg>
    </View>
  );
}

export default Logo;

