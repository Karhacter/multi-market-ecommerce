"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilters } from "./price-filters";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilters } from "./tags-filters";

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const hasAnyFilters = Object.entries(filters).some(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "string") {
      return value !== "";
    }
    return value !== null;
  });

  const onClear = () => {
    // setFilters({
    //   minPrice: "",
    //   maxPrice: "",
    //   tags: [],
    // });
    setFilters(null);
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Product Filters</p>
        {hasAnyFilters && (
          <button
            className="underline cursor-pointer"
            onClick={() => onClear()}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <ProductFilter title="Price">
        <PriceFilters
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Tags" className="border-b-0">
        <TagsFilters
          value={filters.tags}
          onChange={(value) => onChange("tags", value)}
        />
      </ProductFilter>
    </div>
  );
};
