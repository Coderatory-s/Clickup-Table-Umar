


"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem"; // Import SortableItem component
import tasksData from "../todosData/todosData"; // Import tasks data

const statuses = ["Todo", "In Progress", "Pending", "Parking Lot"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(tasksData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Return early if no drop target is found
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);

    // Check if over container is a valid status or an item
    const overContainer = statuses.includes(over.id)
      ? over.id
      : tasks.find((task) => task.id === over.id)?.status;

    // Update the task status if moved to a new container
    if (activeTask && overContainer && activeTask.status !== overContainer) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === active.id) {
          return { ...task, status: overContainer };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-wrap justify-between">
        {statuses.map((status) => (
          <div key={status} className="w-full md:w-1/4 p-2">
            <h2 className="text-lg font-bold mb-2">{status}</h2>
            <div className="bg-gray-100 z-0 rounded-lg p-4 max-h-screen overflow-y-auto overflow-x-hidden ">
              <SortableContext
                items={tasks
                  .filter((task) => task.status === status)
                  .map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <SortableItem key={task.id} id={task.id} task={task} />
                  ))}
              </SortableContext>
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
