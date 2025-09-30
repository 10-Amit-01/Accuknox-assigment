import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "./store/categoriesSlice";
import data from "./data/dashboardData.json";
import { type AppDispatch } from "./store/store";
import Dashboard from "./components/Dashboard";
import SidebarLayout from "./components/SidebarLayout";
import { setDrawer } from "./store/uiSlice";
import { EllipsisVertical } from "lucide-react";
import AddWidgetModal from "./components/AddWidgetModal";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  useEffect(() => {
    dispatch(setCategories(data.categories));
  }, [dispatch]);

  return (
    <SidebarLayout>
      <div className="p-10 bg-gray-100 min-h-screen">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">CNAAP Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAddCategoryModal(true);
              }}
              className="bg-white text-gray-600 border border-gray-400 px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              + Add Category
            </button>
            <button
              onClick={() => {
                dispatch(setDrawer({ isOpen: true }));
              }}
              className="bg-white border border-gray-400 px-1 py-1 h-8 rounded-md hover:bg-gray-100"
            >
              <EllipsisVertical size={15} />
            </button>
          </div>
        </div>
        <Dashboard />
        <AddWidgetModal
          categoryId={null}
          title="Add New Category"
          opened={addCategoryModal}
          onClose={() => {
            setAddCategoryModal(false);
          }}
        />
      </div>
    </SidebarLayout>
  );
};

export default App;
