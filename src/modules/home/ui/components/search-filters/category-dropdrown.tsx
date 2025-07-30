"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { SubcategoryMenu } from "./subcategoy-menu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsopen] = useState(false);
  const dropdrownref = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsopen(true);
    }
  };

  const onMouseLeave = () => setIsopen(false);

  // const toggleDrop = () => {
  //   if (category.subcategories?.length) {
  //     setIsopen(!isOpen);
  //   }
  // };
  return (
    <div
      className="relative"
      ref={dropdrownref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={toggleDrop}
    >
      <div className="relative">
        <Button
          variant="evo"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            // make an effect that if one of category is have selected
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen &&
              "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -trasnlate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>

      <SubcategoryMenu category={category} isOpen={isOpen} />
    </div>
  );
};
