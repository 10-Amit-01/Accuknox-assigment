import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import Category from "./Category";

const Dashboard: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className="mt-6 grid gap-6">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Dashboard;
