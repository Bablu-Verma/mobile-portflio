import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'social';
type ButtonSize = 'sm' | 'md' | 'lg';
type RoundedSize = 'md' | 'lg' | 'xl' | 'full';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  fullWidth?: boolean;
  rounded?: RoundedSize;
};

const sizeMap: Record<ButtonSize, { px: number; py: number; iconSize: number; fontSize: number }> = {
  sm: { px: 12, py: 8, iconSize: 16, fontSize: 14 },
  md: { px: 16, py: 12, iconSize: 18, fontSize: 16 },
  lg: { px: 24, py: 16, iconSize: 20, fontSize: 18 },
};

const radiusMap: Record<RoundedSize, number> = {
  md: 8,
  lg: 10,
  xl: 12,
  full: 999,
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onPress,
  children,
  className = '',
  style,
  fullWidth = false,
  rounded = 'xl',
}: ButtonProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const s = sizeMap[size];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,
      tension: 120,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 40,
    }).start();
  };

  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const iconOnly = !children && !!icon;

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: radiusMap[rounded],
      opacity: isDisabled ? 0.5 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (iconOnly) {
      base.padding = s.py;
    } else {
      base.paddingHorizontal = s.px;
      base.paddingVertical = s.py;
    }

    if (fullWidth) {
      base.alignSelf = 'stretch';
    }

    switch (variant) {
      case 'primary':
        base.backgroundColor = colors.primary;
        if (!isDisabled) {
          base.shadowColor = colors.primary;
          base.shadowOffset = { width: 0, height: 4 };
          base.shadowOpacity = 0.35;
          base.shadowRadius = 8;
          base.elevation = 6;
        }
        break;
      case 'outline':
        base.backgroundColor = 'transparent';
        base.borderWidth = 1;
        base.borderColor = colors.border;
        break;
      case 'ghost':
        base.backgroundColor = 'transparent';
        break;
      case 'social':
        base.backgroundColor = colors.card;
        base.borderWidth = 1;
        base.borderColor = colors.border;
        if (!isDisabled) {
          base.shadowColor = '#000';
          base.shadowOffset = { width: 0, height: 2 };
          base.shadowOpacity = 0.1;
          base.shadowRadius = 4;
          base.elevation = 3;
        }
        break;
    }

    return base;
  };

  const contentColor = isPrimary ? '#ffffff' : variant === 'outline' ? colors.primary : colors.foreground;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && { alignSelf: 'stretch' }]}>
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={className}
        style={[getContainerStyle(), style]}
      >
        {loading ? (
          <ActivityIndicator color={contentColor} size={s.iconSize} />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <Ionicons name={icon as any} size={s.iconSize} color={contentColor} style={children ? { marginRight: 6 } : undefined} />
            )}
            {children && (
              <Text
                style={{
                  color: contentColor,
                  fontSize: s.fontSize,
                  fontWeight: '600',
                }}
              >
                {children}
              </Text>
            )}
            {icon && iconPosition === 'right' && (
              <Ionicons name={icon as any} size={s.iconSize} color={contentColor} style={children ? { marginLeft: 6 } : undefined} />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}
