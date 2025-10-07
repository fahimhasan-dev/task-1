"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Task } from "@/types/task";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  task: Task;
}

export default function EditTaskModal({ task }: EditTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Edit
      </Button>

      <DialogContent className="sm:max-w-[625px]">
        <DialogTitle>Edit Task: {task.title}</DialogTitle>

        <TaskForm task={task} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
