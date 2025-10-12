import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { useState } from 'react';
import { View, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { setCategory as setTempCategory } from '@features/tempMaterial/tempMaterialSlice';
import {
  selectTempCustomCategory,
  selectTempCustomMaterialArray,
} from '@features/tempMaterial/tempMaterialSelectors';

export function LoadMaterialCategory() {
  const [category, setCategory] = useState<string>('');
  const dispatch = useAppDispatch();
  const tempMaterial = useAppSelector(selectTempCustomMaterialArray);
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const handleSetCategory = () => {
    dispatch(setTempCategory(category));
    console.log('tempCategory (test selector)', tempCategory);
    console.log('tempMaterial (test selector)', tempMaterial);
  };
  return (
    <>
      <View
        style={{
          width: '100%',
          gap: 8,
          display: 'flex',
          // borderWidth: 3,
          // borderColor: 'red',
        }}
        testID='InputWrapper'
      >
        <TextInput
          label='Category'
          id='CategoryInput'
          placeholder='Category E.g., Marsupials'
          keyboardType='default'
          mode='outlined'
          autoCapitalize='words'
          autoCorrect={true}
          autoComplete={Platform.OS === 'ios' ? 'off' : 'off'}
          textContentType='none' // iOS only (dont use with autoComplete)
          value={category}
          onChangeText={category => setCategory(category)}
          spellCheck={false}
          style={{}}
          aria-label='Your email address'
          testID='EmailInput'
          returnKeyType='next'
          // onSubmitEditing={() => passwordFieldRef.current?.focus()}
          onFocus={() => {
            // handleScaleLogo(50);
          }}
          onBlur={() => {
            // handleScaleLogo();
          }}
        />
        <Button
          theme={{ roundness: 0.8 }}
          contentStyle={{ height: 50 }}
          style={{ marginTop: 6 }}
          mode='contained'
          onPress={handleSetCategory}
        >
          Continue
        </Button>
        <Button
          theme={{ roundness: 0.8 }}
          contentStyle={{ height: 50 }}
          style={{ marginTop: 6 }}
          mode='contained'
          // onPress={}
        >
          Cancel
        </Button>
      </View>
    </>
  );
}
