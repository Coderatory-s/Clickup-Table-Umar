// "use client";

// import { useState } from "react";
// import {
//   DndContext,
//   DragEndEvent,
//   useSensor,
//   useSensors,
//   PointerSensor,
//   KeyboardSensor,
//   closestCenter,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   sortableKeyboardCoordinates,
// } from "@dnd-kit/sortable";
// import { SortableItem } from "../components/SortableItem"; // Import SortableItem component
// import tasksData from "../todosData/todosData"; // Import tasks data

// const statuses = ["Todo", "In Progress", "Pending", "Parking Lot"];

// // Define a color for each status
// const statusColors = {
//   "Todo": ["bg-gray-100", "bg-gray-200"],
//   "In Progress":[ "bg-blue-100", "bg-blue-200"],
//   "Pending": ["bg-purple-100", "bg-purple-200"],
//   "Parking Lot": ["bg-yellow-100", "bg-yellow-200"],
// };

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState(tasksData);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     // Return early if no drop target is found
//     if (!over) return;

//     const activeTask = tasks.find((task) => task.id === active.id);

//     // Check if over container is a valid status or an item
//     const overContainer = statuses.includes(over.id)
//       ? over.id
//       : tasks.find((task) => task.id === over.id)?.status;

//     // Update the task status if moved to a new container
//     if (activeTask && overContainer && activeTask.status !== overContainer) {
//       const updatedTasks = tasks.map((task) => {
//         if (task.id === active.id) {
//           return { ...task, status: overContainer };
//         }
//         return task;
//       });

//       setTasks(updatedTasks);
//     }
//   };

//   return (
    
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//        <div className='flex items-center justify-center'>
//       <h2 className='text-2xl font-bold mt-10'>Kanban Board</h2>
//       </div>
//       <div className="flex flex-wrap justify-between  bg-transparent mt-[100px]">
//         {statuses.map((status) => (
//           <div
//             key={status}
//             className={`w-full md:w-1/4 p-2 rounded-lg ${statusColors[status][0]} max-h-screen overflow-y-auto overflow-x-hidden`}
//           >
//             <h2 className= {`text-lg font-bold max-w-fit px-2 rounded-lg mb-2 ${statusColors[status][1]} `}>{status}</h2>
//             <SortableContext
//               items={tasks
//                 .filter((task) => task.status === status)
//                 .map((task) => task.id)}
//               strategy={verticalListSortingStrategy}
//             >
//               {tasks
//                 .filter((task) => task.status === status)
//                 .map((task) => (
//                   <SortableItem key={task.id} id={task.id} task={task} />
//                 ))}
//             </SortableContext>
//           </div>
//         ))}
//       </div>
//     </DndContext>
//   );
// };

// export default KanbanBoard;

























"use client";

import { useState, useCallback } from "react";
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

// Define a color for each status
const statusColors = {
  Todo: ["bg-gray-100", "bg-gray-200"],
  "In Progress": ["bg-blue-100", "bg-blue-200"],
  Pending: ["bg-purple-100", "bg-purple-200"],
  "Parking Lot": ["bg-yellow-100", "bg-yellow-200"],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(tasksData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event) => {
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
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === active.id ? { ...task, status: overContainer } : task
          )
        );
      }
    },
    [tasks]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold mt-10">Kanban Board</h2>
      </div>
      <div className="flex flex-wrap justify-between bg-transparent mt-[100px]">
        {statuses.map((status) => {
          // Filter tasks once per status
          const filteredTasks = tasks.filter((task) => task.status === status);
          return (
            <div
              key={status}
              className={`w-full md:w-1/4 p-2 rounded-lg ${statusColors[status][0]} max-h-screen overflow-y-auto overflow-x-hidden`}
            >
              <h2
                className={`text-lg font-bold max-w-fit px-2 rounded-lg mb-2 ${statusColors[status][1]}`}
              >
                {status}
              </h2>
              <SortableContext
                items={filteredTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredTasks.map((task) => (
                  <SortableItem key={task.id} id={task.id} task={task} />
                ))}
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
