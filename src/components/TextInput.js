import React, {forwardRef} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import {PrimaryColors} from '../theme/colors';
import {unitH, unitW, width} from '../utils/constant';
import {TextStyles, TextType} from '../theme/typography';
import Text from './Text';

const TextInput = forwardRef(
  ({placeholderTextColor, style, onChangeText, ...otherProps}, ref) => {
    return (
      <RNTextInput
        ref={ref}
        placeholderTextColor={PrimaryColors.Gray}
        onChangeText={text => {
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  },
);

export const TextInputWithTitle = forwardRef(
  (
    {
      title,
      placeholderTextColor,
      style,
      containerStyle,
      onChangeText,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <View style={{...styles.container, ...containerStyle}}>
        <Text>{title}</Text>
        <View style={{height: 5}} />
        <TextInput
          ref={ref}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          style={style}
          {...otherProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  textInput: {
    width: '100%',
    backgroundColor: PrimaryColors.White,
    borderRadius: 5,
    height: unitH * 40,
    ...TextStyles[TextType.TEXTINPUT],
    borderColor: PrimaryColors.Black,
  },
});

export default TextInput;
