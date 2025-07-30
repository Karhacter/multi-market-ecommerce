"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSideBar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebabrOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSideBar
        open={isSidebarOpen}
        onOpenChange={setIsSidebabrOpen}
      />
      <div className="relative w-full">
        <Input
          className="p-2"
          placeholder="Search for More"
          disabled={disabled}
        />
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
      </div>
      <Button
        variant="evo"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebabrOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button asChild variant="evo">
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
      {/* {TODO: add categories view all button} */}
    </div>
  );
};
