import Svg, {
  Rect,
  Path,
  G,
  Mask,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface Props {
  width?: number;
  height?: number;
  gradient?: boolean;
  styles?: object;
}

export function Logo({ width = 50, height = 50, gradient = false, styles, }: Props) {
  // Retrieve Custom Theme-properties
  const {
    logo,
    colors: { primary },
  } = useAppTheme();

  const animatedWidth = useSharedValue(width);
  const animatedHeight = useSharedValue(height);

  const animatedProps = useAnimatedProps(() => {
    return {
      width: animatedWidth.value,
      height: animatedHeight.value,
    };
  });
  // Update shared values on prop change
  useEffect(() => {
    animatedWidth.value = withSpring(width);
    animatedHeight.value = withSpring(height);
  }, [width, height]);

  return gradient ?
      <View style={[logo, { ...styles }]} testID='Color Logo View'>
        <AnimatedSvg animatedProps={animatedProps} width={width} height={height} viewBox='0 0 849 849' fill='none'>
          <G clip-path='url(#clip0_669_3687)'>
            <Mask
              id='mask06693687'
              maskType='alpha'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='849'
              height='849'
            >
              <Rect
                id='crown-block-l'
                y='141.422'
                width='200'
                height='200'
                transform='rotate(-45 0 141.422)'
                fill='#FFFFFF'
              />
              <Rect
                id='crown-block-m'
                x='282.843'
                y='141.421'
                width='200'
                height='200'
                transform='rotate(-45 282.843 141.421)'
                fill='#FFFFFF'
              />
              <Rect
                id='crown-block-r'
                x='565.686'
                y='141.421'
                width='200'
                height='200'
                transform='rotate(-45 565.686 141.421)'
                fill='#FFFFFF'
              />
              <Path
                id='base-block-union'
                d='M848.528 424.264L707.107 565.686L424.265 848.528L141.5 565.764L141.421 565.843L0 424.421L141.421 283L282.764 424.343L424.265 282.843L565.686 424.263L707.106 282.843L848.528 424.264Z'
                fill='#FFFFFF'
              />
            </Mask>
            <G mask='url(#mask06693687)'>
              <Rect
                y='6.10352e-05'
                width='849'
                height='849'
                fill='url(#paint0linear6693687)'
              />
            </G>
          </G>
          <Defs>
            <LinearGradient
              id='paint0linear6693687'
              x1='424'
              y1='-34.4999'
              x2='424'
              y2='4041.5'
              gradientUnits='userSpaceOnUse'
            >
              <Stop offset='0.0769231' stopColor='#703CC3' />
              <Stop offset='0.230769' stopColor='#02DB81' />
            </LinearGradient>
            <ClipPath id='clip0_669_3687'>
              <Rect width='848.528' height='848.528' fill='white' />
            </ClipPath>
          </Defs>
        </AnimatedSvg>
      </View>
    : <View style={[logo, { ...styles }]} testID='Logo View'>
        <Svg width={width} height={height} viewBox='0 0 1046 849' fill='none'>
          <G id='wgq-logo-plain'>
            <Rect
              id='crown-block-l'
              x='99'
              y='141.422'
              width='200'
              height='200'
              transform='rotate(-45 99 141.422)'
              fill={primary}
            />
            <Rect
              id='crown-block-m'
              x='381.843'
              y='141.421'
              width='200'
              height='200'
              transform='rotate(-45 381.843 141.421)'
              fill={primary}
            />
            <Rect
              id='crown-block-r'
              x='664.686'
              y='141.421'
              width='200'
              height='200'
              transform='rotate(-45 664.686 141.421)'
              fill={primary}
            />
            <Path
              id='base-block-union'
              d='M806.106 565.686L523.264 848.528L240.422 565.686L523.264 282.843L806.106 565.686ZM381.843 424.265L240.421 565.686L99 424.265L240.421 282.843L381.843 424.265ZM947.528 424.264L806.106 565.686L664.686 424.264L806.106 282.843L947.528 424.264Z'
              fill={primary}
            />
          </G>
        </Svg>
      </View>;
}
