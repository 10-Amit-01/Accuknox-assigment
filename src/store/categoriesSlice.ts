import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Category, type Widget } from '../types'

interface DashboardState {
  categories: Category[];
}

const initialState: DashboardState = {
  categories: [] // we’ll load JSON into this later
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    addWidget(
      state,
      action: PayloadAction<{ categoryId: string; widget: Widget }>
    ) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget(
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
    removeWidgets(state, action: PayloadAction<{ catId: string; widId: string }[]>) {
      const removals = action.payload;

      removals.forEach(({ catId, widId }) => {
        const category = state.categories.find((c) => c.id === catId);
        if (category) {
          category.widgets = category.widgets.filter((w) => w.id !== widId);
        }
      });
    },
    addCategory(state, action:PayloadAction<{newCategory: Category}>){
      state.categories.push(action.payload.newCategory);
    }
  }
});

export const { setCategories, addWidget, removeWidget,removeWidgets, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
