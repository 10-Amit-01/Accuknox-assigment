import React, { useState } from "react";
import { Modal, TextInput, Textarea, Button, Group } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addWidget, addCategory } from "../store/categoriesSlice";
import { type AppDispatch } from "../store/store";
import { type Category, type Widget } from "@/types";

interface Props {
  categoryId: string | null;
  title: string;
  opened: boolean;
  onClose: () => void;
}

const getShortName = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name; // keep full name if only one word
  return words.map(word => word[0].toUpperCase()).join("");
};


const AddWidgetModal: React.FC<Props> = ({
  categoryId,
  title,
  opened,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) return;

    if (categoryId) {
      const newWidget: Widget = {
        id: Date.now().toString(),
        name,
        text,
      };
      dispatch(addWidget({ categoryId, widget: newWidget }));
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
        ShortName: getShortName(name), // 👈 cleaner
        widgets: [],
      };

      dispatch(addCategory({ newCategory }));
    }

    setName("");
    setText("");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label={categoryId ? "Widget Name" : "Category Name"}
          placeholder={categoryId ? "Enter Widget Name" : "Enter Category Name"}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Textarea
          label={categoryId ? "Widget Text" : "Category Text"}
          placeholder={
            categoryId ? "Widget Name Description" : "Category Name Description"
          }
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          required
          autosize
          minRows={3}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddWidgetModal;
