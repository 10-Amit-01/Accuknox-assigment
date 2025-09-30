import React, { useRef } from "react";
import { Checkbox, Drawer, Tabs } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { setDrawer } from "../store/uiSlice";
import { X } from "lucide-react";
import { removeWidgets } from "../store/categoriesSlice";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<Props> = ({ children }) => {
  const manageWidget = useRef<{ catId: string; widId: string }[]>([]);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const isOpen = useSelector((state: RootState) => state.ui.drawerOpen);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex h-screen">
      {/* Mantine Drawer Sidebar */}
      <Drawer
        opened={isOpen}
        onClose={() => dispatch(setDrawer({ isOpen: false }))}
        withCloseButton={false}
        size="md"
        position="right"
        padding={0}
      >
        <div className="sticky top-0 z-10 bg-blue-900 text-white px-4 py-3  w-full flex justify-between items-center">
          <Drawer.Title>Add widget</Drawer.Title>
          <button
            onClick={() => {
              dispatch(setDrawer({ isOpen: false }));
            }}
          >
            <X />
          </button>
        </div>

        <p className="p-3 text-sm font-semibold">
          Personalise your dashboard by adding the following widget
        </p>
        <Tabs defaultValue={categories.at(0)?.id}>
          <Tabs.List>
            {categories.map((item) => (
              <Tabs.Tab key={item.id} value={item.id}>
                {item.ShortName}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {categories.map((item) => (
            <Tabs.Panel key={item.id} value={item.id}>
              {item.widgets.map((wid) => (
                <div
                  className="p-2 bg-white shadow m-2 flex items-center gap-2"
                  key={wid.id}
                >
                  <Checkbox
                    defaultChecked
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        manageWidget.current = manageWidget.current.filter(
                          (ele: { catId: string; widId: string }) =>
                            ele.widId !== wid.id
                        );
                      } else {
                        manageWidget.current.push({
                          catId: item.id,
                          widId: wid.id,
                        });
                      }
                    }}
                  />
                  {wid.name}
                </div>
              ))}
            </Tabs.Panel>
          ))}
        </Tabs>
        <div className="absolute bottom-0 z-10 px-4 py-3 w-full flex justify-end gap-3 items-center">
          <button
            onClick={() => {
              dispatch(setDrawer({ isOpen: false }));
            }}
            className="border px-8 border-blue-800 text-blue-800 py-1 rounded hover:shadow-sm hover:shadow-blue-900"
          >
            Cancel
          </button>
          <button
            className="px-8 bg-blue-800 text-white py-1 rounded hover:bg-blue-950"
            onClick={() => {
              dispatch(removeWidgets(manageWidget.current));
            }}
          >
            Confirm
          </button>
        </div>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default SidebarLayout;
