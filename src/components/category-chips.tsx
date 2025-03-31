"use client";
import { useGame, type Category } from "./game-context";
import { Button } from "@/components/ui/button";

const CATEGORIES: Category[] = [
  "Football",
  "Hollywood Movies",
  "Shows",
  "Athletes",
  "Musicians",
  "Tech",
  "Cricket",
];

export default function CategoryChips() {
  const { category, setCategory } = useGame();

  const handleCategoryClick = (selectedCategory: Category) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant={category === cat ? "default" : "outline"}
          className="rounded-full"
          onClick={() => handleCategoryClick(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
