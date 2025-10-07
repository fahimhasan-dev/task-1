"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore, Task } from "@/store/taskStore";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed"]),
});

type TaskFormValues = z.infer<typeof schema>;

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const isEditMode = !!task;
  const { addTask, updateTask } = useTaskStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "Pending",
    },
  });

  const onSubmit = async (values: TaskFormValues) => {
    try {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (isEditMode && task?.id) {
        updateTask(task.id, values);
        toast.success("Task updated successfully!");
      } else {
        addTask({
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          ...values,
        });
        toast.success("Task added successfully!");
        form.reset();
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Task title"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Task description"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          variant={isEditMode ? "outline" : "default"}
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
            ? "Save Changes"
            : "Add Task"}
        </Button>
      </form>
    </Form>
  );
}
