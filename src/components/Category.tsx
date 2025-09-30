import React, { useRef, useState } from "react";
import Widget from "./Widget";
import { type Category as CategoryType } from "../types";
import { Plus } from "lucide-react";
import AddWidgetModal from "./AddWidgetModal";
import { Group } from "@mantine/core";

interface Props {
  category: CategoryType;
}

const Category: React.FC<Props> = ({ category }) => {
  const [addWidgetModal, setAddWidgetModal] = useState(false);
  const categoryId = useRef<string>("");
  return (
    <div className="rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{category.name}</h2>
      </div>

      <Group className=" gap-4 pb-2">
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
        <div className="relative w-80 h-50 shrink-0 p-4 rounded-xl shadow bg-gray-100">
          <button
            className="absolute flex gap-2 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 border rounded p-2 border-gray-500 text-gray-500 hover:shadow-md"
            onClick={() => {
              categoryId.current = category.id;
              setAddWidgetModal(true);
            }}
          >
            <Plus /> Add Widget
          </button>
        </div>
      </Group>

      <AddWidgetModal
        title="Add New Widget"
        categoryId={categoryId.current}
        opened={addWidgetModal}
        onClose={() => {
          setAddWidgetModal(false);
        }}
      />
    </div>
  );
};

export default Category;
