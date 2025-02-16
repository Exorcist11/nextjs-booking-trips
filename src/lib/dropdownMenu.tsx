import { Send, SquarePen, Trash2 } from "lucide-react";
import { ReactElement } from "react";

interface DropdownMenuItem {
  title: string;
  icon: ReactElement;
}

export const dropDownMenus: DropdownMenuItem[] = [
  { title: "View", icon: <Send /> },
  { title: "Edit", icon: <SquarePen /> },
  { title: "Delete", icon: <Trash2 /> },
];
