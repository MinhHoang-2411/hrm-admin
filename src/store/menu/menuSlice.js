// types
import {createSlice} from '@reduxjs/toolkit';

// initial state
const initialState = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  subMenu: [],
  countMenu: {},
};

// ==============================|| SLICE - MENU ||============================== //

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    activeSubMenu(state, action) {
      const newSubMenu = [...state?.subMenu];
      const idx = newSubMenu?.indexOf(action.payload);
      if (idx > -1) {
        newSubMenu.splice(idx, 1);
      } else newSubMenu.push(action.payload);

      state.subMenu = newSubMenu;
    },

    // COUNT LEAVE PENDING
    getCountMenu(state, action) {},
    getCountMenuSuccess(state, action) {
      state.countMenu = action?.payload || 0;
    },
    getCountMenuFalse(state, action) {
      console.error(action.payload);
    },

    minusCountMenu(state, action) {
      if (state.countMenu[action.payload] > 0) {
        state.countMenu[action.payload] = state.countMenu[action.payload] - 1;
      }
    },
  },
});

// Actions
export const menuActions = menuSlice.actions;

// Reducer
const menuReducer = menuSlice.reducer;
export default menuReducer;
