import React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface IDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SelectSeatDialog(props: IDialog) {
  const { open, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={() => setOpen && setOpen(!open)} >
      <DialogContent className="max-w-[600px] tablet:max-w-[700px] laptop:max-w-[900px]">DMC</DialogContent>
    </Dialog>
  );
}
