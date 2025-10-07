"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { CiFilter } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Fade } from "react-awesome-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaPlus, FaTrash } from "react-icons/fa";
import EditTaskModal from "./EditTaskModal";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}

const MySwal = withReactContent(Swal);
const statuses: (Task["status"] | "All")[] = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
];

const getStatusBadge = (status: Task["status"]) => {
  switch (status) {
    case "Pending":
      return {
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        text: "Pending",
      };
    case "In Progress":
      return {
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        text: "In Progress",
      };
    case "Completed":
      return {
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        text: "Completed",
      };
    default:
      return {
        className:
          "bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300",
        text: status,
      };
  }
};

export default function TaskList() {
  const { tasks, deleteTask } = useTaskStore();
  const [filter, setFilter] = useState<Task["status"] | "All">("All");

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const handleDelete = (id: string, title: string) => {
    MySwal.fire({
      title: "Confirm Deletion",
      html: `Are you sure you want to delete the task: <strong>${title}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "dark:bg-gray-800 dark:text-white",
        title: "dark:text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        toast.success("Task deleted successfully!", {
          style: { backgroundColor: "#16A34A", color: "white" },
        });
      }
    });
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto my-10 px-4 mt-20 sm:px-6 lg:px-8">
      <Toaster />

      <div className="flex flex-col sm:flex-row sm:border sm:p-4 rounded-xl justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-teal-400">
          Task List
        </h2>
        <Link href={"/addTask"}>
          <Button>
            Add Task <FaPlus />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <CiFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Select
            value={filter}
            onValueChange={(value) =>
              setFilter(value as Task["status"] | "All")
            }
          >
            <SelectTrigger className="w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700 dark:text-white">
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-400 text-center py-12 text-lg italic">
          No tasks found under &apos;{filter}&apos; status.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Fade cascade damping={0.1} direction="up" triggerOnce>
            {" "}
            {filteredTasks.map((task) => {
              const badge = getStatusBadge(task.status);
              return (
                <Card
                  key={task.id}
                  className="shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <CardHeader className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold truncate max-w-[70%]">
                      {task.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {task.description || "No description"}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge className={badge.className}>{badge.text}</Badge>
                      <div className="flex gap-1 items-center justify">
                        <EditTaskModal task={task} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleDelete(task.id, task.title)}
                          title="Delete Task"
                        >
                          <FaTrash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Fade>
        </div>
      )}
    </div>
  );
}
