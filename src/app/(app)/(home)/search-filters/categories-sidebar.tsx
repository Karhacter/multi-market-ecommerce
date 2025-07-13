import { CustomCategory } from "../type";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSideBar = ({ open, onOpenChange, data }: Props) => {
  return <div>Testing</div>;
};
