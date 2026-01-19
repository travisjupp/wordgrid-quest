import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { setTempCategory } from '@features/tempMaterial/tempMaterialSlice';
import { selectTempCustomCategory } from '@features/tempMaterial/tempMaterialSelectors';
import { useSnackbar } from '@hooks/useSnackbar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';

export function LoadMaterialCategory() {
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const [category, setCategory] = useState<string>(tempCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { currentCategory } = useLocalSearchParams();

  useEffect(() => {
    if (tempCategory && tempCategory !== currentCategory) {
      showSnackbar({
        message: `${tempCategory} category ${currentCategory ? 'updated' : 'created'}`,
      });
    }
    /* TODO Configure React Compiler then re-enable the showSnackbar
     * dependency to verify RC injected useCallback to memoize
     * the function in OverlayProvider
     *
     * Confirm with React DevTools; should display a "Memo" badge
     * next to optimized components. Remove linter ignore comment */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempCategory /*, showSnackbar */]);
  const handleSetCategory = () => {
    dispatch(setTempCategory(category));
    router.navigate('/loaditems');
  };

  // Retrieve Custom Theme-properties
  const {
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <TextInput
          label='Category'
          id='CategoryInput'
          placeholder='Category E.g., Marsupials'
          keyboardType='default'
          mode='outlined'
          autoCapitalize='words'
          autoCorrect={true}
          autoComplete={Platform.OS === 'ios' ? 'off' : 'off'}
          maxLength={25}
          textContentType='none' // iOS only (dont use with autoComplete)
          value={category}
          onChangeText={category => setCategory(category)}
          spellCheck={false}
          aria-label='Your material category'
          testID='EmailInput'
          returnKeyType='next'
          onSubmitEditing={handleSetCategory}
        />
        <Button
          contentStyle={{ height: 50 }}
          mode='contained'
          onPress={handleSetCategory}
          disabled={!category}
        >
          Continue
        </Button>
        <Button contentStyle={{ height: 50 }} mode='contained'>
          Cancel
        </Button>
      </View>
    </>
  );
}
