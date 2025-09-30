import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/categoriesSlice";
import { type Widget as WidgetType } from "../types";
import { type AppDispatch } from "../store/store";
import { X } from "lucide-react";

interface Props {
  widget: WidgetType;
  categoryId: string;
}

const Widget: React.FC<Props> = ({ widget, categoryId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
     <div className="relative w-80 h-50 shrink-0 p-4 rounded-xl shadow bg-white">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <X color="gray" />
      </button>
      <h3 className="text-md font-bold truncate">{widget.name}</h3>
      <p className="text-sm text-gray-600 mt-1 overflow-y-auto max-h-24 pr-1">
        {widget.text}
      </p>
    </div>
  );
};

export default Widget;
