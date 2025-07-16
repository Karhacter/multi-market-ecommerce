"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BreadcrumbNav } from "./breadcrumb-nav";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const cateParams = params.category as string | undefined;
  const activeCategory = cateParams || "all";

  const activeCateData = data.find(
    (category) => category.slug === activeCategory
  );

  const activeCateColor = activeCateData?.color || "#F5F5F5";
  const activeCateName = activeCateData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCateData?.subcategories?.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCateColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNav
        activeCateName={activeCateName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategory}
      />
    </div>
  );
};

//  an action for loading to search filters
// export const SearchFiltersLoading = () => {
// const trpc = useTRPC();
// const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
//   return (
//     <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
//       <SearchInput data={data} disabled />
//       <div className="hidden lg:block">
//         <div className="h-10" />
//       </div>
//     </div>
//   );
// };
