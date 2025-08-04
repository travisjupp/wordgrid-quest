import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiscoveryTermObject {
  dt: string;
  def: string;
};

interface CustomMaterialArray {
 [key:string]: DiscoveryTermObject[]; 
};

interface InitialState {
  category: CustomMaterialArray;
  activeCategory: string;
};

const initialState: InitialState = {
  category: {
    Marsupials: [
      { dt: 'Koala', def: 'A tree-dwelling marsupial native to Australia.' },
      { dt: 'Wombat', def: 'A burrowing marsupial with a stubby tail.' },
      { dt: 'Kangaroo', def: 'A large marsupial that hops and carries young in pouch.' }
    ],
    // User-Defined Custom-Material here
  },
  activeCategory: 'Marsupials',
};

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    addCustomCategory: (state, action: PayloadAction<{
      category: string, discoveryTerms: DiscoveryTermObject[] }>) => {
      state.category[action.payload.category] = action.payload.discoveryTerms;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    }
  }
});

export const { addCustomCategory, setActiveCategory } = materialSlice.actions;
export default materialSlice.reducer;

