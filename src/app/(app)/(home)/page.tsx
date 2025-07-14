"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <Button variant="evo">Please Click</Button>
          </div>
          <div>
            <Input placeholder="I need a little custom" />
          </div>
          <div>
            <Progress value={50} />
          </div>
          {JSON.stringify(categories.data, null, 2)}
        </div>
      </div>
    </div>
  );
}
