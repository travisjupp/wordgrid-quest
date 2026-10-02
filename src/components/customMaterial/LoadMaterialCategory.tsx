import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { useState } from 'react';
import { View, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { setTempCategory } from '@features/tempMaterial/tempMaterialSlice';
import { selectTempCustomCategory } from '@features/tempMaterial/tempMaterialSelectors';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';

export function LoadMaterialCategory() {
  const existingCategory = useAppSelector(selectTempCustomCategory);
  const [category, setCategory] = useState<string>(existingCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const handleSetCategory = () => {
    const hasChanged = category !== existingCategory;
    const isAnUpdate = existingCategory && existingCategory !== '';
    const messageVerb = isAnUpdate ? 'updated' : 'created';

    if (hasChanged && category !== '') {
      showSnackbar({
        message: `${category} category ${messageVerb}`,
      });
    }

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
