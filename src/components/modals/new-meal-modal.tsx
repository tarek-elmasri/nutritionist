"use client";

import { FC, useState } from "react";
import Modal from "@/components/ui/modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Separator from "../ui/separator";

interface NewMealModalProps {
  initialLabel?: string;
  onSubmit: (label: string) => void;
  isOpen: boolean;
  onClose: () => void;
}
const NewMealModal: FC<NewMealModalProps> = ({
  initialLabel,
  onSubmit,
  isOpen,
  onClose,
}) => {
  const [label, setLabel] = useState(initialLabel ?? "");

  const handleSubmit = () => {
    onSubmit(label);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{initialLabel ? "Edit Meal" : "Add New Meal"}</DialogTitle>
        <Separator className="py-3" />
      </DialogHeader>

      <div className="px-3 space-y-9">
        <div>
          <Label htmlFor="mealLabel">Meal Label:</Label>
          <Input
            id="mealLabel"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-6 items-center">
          <Button size={"sm"} className="w-20" onClick={handleSubmit}>
            {initialLabel ? "Save" : "Add"}
          </Button>
          <Button
            size={"sm"}
            className="w-20"
            variant={"ghost"}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewMealModal;
