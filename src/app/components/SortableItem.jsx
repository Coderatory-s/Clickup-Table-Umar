"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 44 : "auto", // Bring item to front while dragging
    opacity: isDragging ? 0.5 : 1, // Reduce opacity while dragging\
    
  }
  


  
  return (
    <div
    
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg shadow mb-4 overscroll-none bg-white   ${
        isDragging ? "border-2 border-blue-500 z-34 " : ""
      }`}
    >
      <h3 className="text-md font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
      <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
      <p className="text-sm text-gray-500">Priority: {task.priority}</p>
      <p className="text-sm text-gray-500">Time Estimate: {task.timeEstimate}</p>
      <p className="text-sm text-gray-500">Sprint Points: {task.sprintPoints}</p>
      <div className="mt-2">
        {task.subtasks.length > 0 && (
          <details>
            <summary className="cursor-pointer text-sm font-bold text-blue-500">
              Subtasks ({task.subtasks.length})
            </summary>
            <ul className="pl-4 mt-2 list-disc text-sm">
              {task.subtasks.map((subtask) => (
                <li key={subtask.id}>
                  {subtask.name} ({subtask.status})
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
};
