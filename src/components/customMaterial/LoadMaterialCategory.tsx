import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { setCategory as setTempCategory } from '@features/tempMaterial/tempMaterialSlice';
import {
  selectTempCustomCategory,
  // selectTempCustomMaterialArray,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useSnackbar } from '@hooks/useSnackbar';

export function LoadMaterialCategory() {
  const [category, setCategory] = useState<string>('');
  const dispatch = useAppDispatch();
  // const tempMaterial = useAppSelector(selectTempCustomMaterialArray);
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (tempCategory) {
      showSnackbar({ message: `${tempCategory} category created` });
    }
    /* Configure React Compiler then re-enable the showSnackbar
     * dependency to verify RC injected useCallback to memoize
     * the function in OverlayProvider
     *
     * Confirm with React DevTools; should display a "Memo" badge
     * next to optimized components. Remove linter ignore comment */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempCategory /*, showSnackbar */]);
  const handleSetCategory = () => {
    dispatch(setTempCategory(category));
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
