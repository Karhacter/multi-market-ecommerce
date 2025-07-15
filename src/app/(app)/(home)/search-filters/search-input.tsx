"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSideBar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebabrOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSideBar
        open={isSidebarOpen}
        onOpenChange={setIsSidebabrOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search for More"
          disabled={disabled}
        />
      </div>
      <Button
        variant="evo"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebabrOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* {TODO: add categories view all button} */}
    </div>
  );
};
