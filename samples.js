"use client";

// import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { DndContext } from '@dnd-kit/core';
// import { SortableContext, useSortable } from '@dnd-kit/sortable';

// const TasksTable = ({ tasks }) => {
//   const [expandedTasks, setExpandedTasks] = useState({});


//   const toggleTask = (taskId) => {
//     setExpandedTasks((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({id: tasks.id});
  
//   return (
//     <div ref={setNodeRef}  {...attributes} {...listeners} className="overflow-x-auto">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead></TableHead>
//             <TableHead>Task Name</TableHead>
//             <TableHead>Assignee</TableHead>
//             <TableHead>Due Date</TableHead>
//             <TableHead>Priority</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Time Estimate</TableHead>
//             <TableHead>Sprint Points</TableHead>
//             <TableHead>Tags</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           <DndContext>
//             <SortableContext items={tasks}>
//           {tasks.map((task) => (
//             <React.Fragment key={task.id} >
//               <TableRow className="hover:bg-gray-100">
//                 <TableCell>
//                   {task.subtasks.length > 0 && (
//                     <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
//                       {expandedTasks[task.id] ? (
//                         <ChevronDownIcon className="w-5 h-5" />
//                       ) : (
//                         <ChevronRightIcon className="w-5 h-5" />
//                       )}
//                     </Button>
//                   )}
//                 </TableCell>
//                 <TableCell>{task.name}</TableCell>
//                 <TableCell>{task.assignee}</TableCell>
//                 <TableCell>{task.dueDate}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`py-1 px-3 rounded-full text-xs ${
//                       task.priority === 'High'
//                         ? 'bg-red-200 text-red-600'
//                         : task.priority === 'Medium'
//                         ? 'bg-yellow-200 text-yellow-600'
//                         : 'bg-green-200 text-green-600'
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </TableCell>
//                 <TableCell>{task.status}</TableCell>
//                 <TableCell>{task.timeEstimate}</TableCell>
//                 <TableCell>{task.sprintPoints}</TableCell>
//                 <TableCell>
//                   {task.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="py-1 px-3 mr-2 rounded-full text-xs bg-blue-200 text-blue-600"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </TableCell>
//               </TableRow>
//               {/* Render subtasks if expanded */}
//               {expandedTasks[task.id] &&
//                 task.subtasks.map((subtask) => (
//                   <React.Fragment key={subtask.id}>
//                     <TableRow className="hover:bg-gray-100">
//                       <TableCell className="pl-10">
//                         {subtask.subtasks && subtask.subtasks.length > 0 && (
//                           <Button variant="ghost" size="sm" onClick={() => toggleTask(subtask.id)}>
//                             {expandedTasks[subtask.id] ? (
//                               <ChevronDownIcon className="w-4 h-4" />
//                             ) : (
//                               <ChevronRightIcon className="w-4 h-4" />
//                             )}
//                           </Button>
//                         )}
//                       </TableCell>
//                       <TableCell> {subtask.name}</TableCell>
//                       <TableCell>{subtask.assignee}</TableCell>
//                       <TableCell>{subtask.dueDate}</TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>{subtask.status}</TableCell>
//                       <TableCell>{subtask.timeEstimate}</TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                     </TableRow>
//                     {/* Render deeper subtasks if expanded */}
//                     {expandedTasks[subtask.id] &&
//                       subtask.subtasks.map((deepSubtask) => (
//                         <TableRow key={deepSubtask.id} className="hover:bg-gray-100">
//                           <TableCell className="pl-16"></TableCell>
//                           <TableCell>↳ {deepSubtask.name}</TableCell>
//                           <TableCell>{deepSubtask.assignee}</TableCell>
//                           <TableCell>{deepSubtask.dueDate}</TableCell>
//                           <TableCell></TableCell>
//                           <TableCell>{deepSubtask.status}</TableCell>
//                           <TableCell>{deepSubtask.timeEstimate}</TableCell>
//                           <TableCell></TableCell>
//                           <TableCell></TableCell>
//                         </TableRow>
//                       ))}
//                   </React.Fragment>
//                 ))}
//             </React.Fragment>
//           ))}
//           </SortableContext>
//           </DndContext>
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TasksTable;
















// import { useState } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

// const TasksTable = ({ tasks }) => {
//   const [expandedTasks, setExpandedTasks] = useState({});
//   const [taskList, setTaskList] = useState(tasks);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const toggleTask = (taskId) => {
//     setExpandedTasks((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   function handleDragEnd(event) {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setTaskList((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }

//   const SortableItem = ({ id, children }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//     };

//     return (
//       <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//         {children}
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-x-auto">
//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12"></TableHead> {/* Adjust the width as needed */}
//                 <TableHead className="text-left">Task Name</TableHead>
//                 <TableHead className="text-left">Assignee</TableHead>
//                 <TableHead className="text-left">Due Date</TableHead>
//                 <TableHead className="text-left">Priority</TableHead>
//                 <TableHead className="text-left">Status</TableHead>
//                 <TableHead className="text-left">Time Estimate</TableHead>
//                 <TableHead className="text-left">Sprint Points</TableHead>
//                 <TableHead className="text-left">Tags</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {taskList.map((task) => (
//                 <SortableItem key={task.id} id={task.id}>
//                   <TableRow className="hover:bg-gray-100">
//                     <TableCell className="w-12">
//                       {task.subtasks.length > 0 && (
//                         <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
//                           {expandedTasks[task.id] ? (
//                             <ChevronDownIcon className="w-5 h-5" />
//                           ) : (
//                             <ChevronRightIcon className="w-5 h-5" />
//                           )}
//                         </Button>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-left">{task.name}</TableCell>
//                     <TableCell className="text-left">{task.assignee}</TableCell>
//                     <TableCell className="text-left">{task.dueDate}</TableCell>
//                     <TableCell className="text-left">
//                       <span
//                         className={`py-1 px-3 rounded-full text-xs ${
//                           task.priority === 'High'
//                             ? 'bg-red-200 text-red-600'
//                             : task.priority === 'Medium'
//                             ? 'bg-yellow-200 text-yellow-600'
//                             : 'bg-green-200 text-green-600'
//                         }`}
//                       >
//                         {task.priority}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-left">{task.status}</TableCell>
//                     <TableCell className="text-left">{task.timeEstimate}</TableCell>
//                     <TableCell className="text-left">{task.sprintPoints}</TableCell>
//                     <TableCell className="text-left">
//                       {task.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="py-1 px-3 mr-2 rounded-full text-xs bg-blue-200 text-blue-600"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </TableCell>
//                   </TableRow>
//                   {expandedTasks[task.id] &&
//                     task.subtasks.map((subtask) => (
//                       <SortableItem key={subtask.id} id={subtask.id}>
//                         <TableRow className="hover:bg-gray-100">
//                           <TableCell className="pl-10 w-12">
//                             {subtask.subtasks && subtask.subtasks.length > 0 && (
//                               <Button variant="ghost" size="sm" onClick={() => toggleTask(subtask.id)}>
//                                 {expandedTasks[subtask.id] ? (
//                                   <ChevronDownIcon className="w-4 h-4" />
//                                 ) : (
//                                   <ChevronRightIcon className="w-4 h-4" />
//                                 )}
//                               </Button>
//                             )}
//                           </TableCell>
//                           <TableCell className="text-left">{subtask.name}</TableCell>
//                           <TableCell className="text-left">{subtask.assignee}</TableCell>
//                           <TableCell className="text-left">{subtask.dueDate}</TableCell>
//                           <TableCell className="text-left"></TableCell>
//                           <TableCell className="text-left">{subtask.status}</TableCell>
//                           <TableCell className="text-left">{subtask.timeEstimate}</TableCell>
//                           <TableCell className="text-left"></TableCell>
//                           <TableCell className="text-left"></TableCell>
//                         </TableRow>
//                         {expandedTasks[subtask.id] &&
//                           subtask.subtasks.map((deepSubtask) => (
//                             <TableRow key={deepSubtask.id} className="hover:bg-gray-100">
//                               <TableCell className="pl-16 w-12"></TableCell>
//                               <TableCell className="text-left">↳ {deepSubtask.name}</TableCell>
//                               <TableCell className="text-left">{deepSubtask.assignee}</TableCell>
//                               <TableCell className="text-left">{deepSubtask.dueDate}</TableCell>
//                               <TableCell className="text-left"></TableCell>
//                               <TableCell className="text-left">{deepSubtask.status}</TableCell>
//                               <TableCell className="text-left">{deepSubtask.timeEstimate}</TableCell>
//                               <TableCell className="text-left"></TableCell>
//                               <TableCell className="text-left"></TableCell>
//                             </TableRow>
//                           ))}
//                       </SortableItem>
//                     ))}
//                 </SortableItem>
//               ))}
//             </TableBody>
//           </Table>
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// };

// export default TasksTable;

























import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

const TasksTable = ({ tasks }) => {
  const [expandedTasks, setExpandedTasks] = useState({});
  const [taskList, setTaskList] = useState(tasks);
  const [hydrated, setHydrated] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Return a loading state or skeleton component
  }

  const toggleTask = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-left">Task Name</TableHead>
                <TableHead className="text-left">Assignee</TableHead>
                <TableHead className="text-left">Due Date</TableHead>
                <TableHead className="text-left">Priority</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Time Estimate</TableHead>
                <TableHead className="text-left">Sprint Points</TableHead>
                <TableHead className="text-left">Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskList.map((task) => (
                <SortableItem key={task.id} id={task.id}>
                  <TableRow className="hover:bg-gray-100">
                    <TableCell className="w-12">
                      {task.subtasks.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
                          {expandedTasks[task.id] ? (
                            <ChevronDownIcon className="w-5 h-5" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-left">{task.name}</TableCell>
                    <TableCell className="text-left">{task.assignee}</TableCell>
                    <TableCell className="text-left">{task.dueDate}</TableCell>
                    <TableCell className="text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          task.priority === 'High'
                            ? 'bg-red-200 text-red-600'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-200 text-yellow-600'
                            : 'bg-green-200 text-green-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </TableCell>
                    <TableCell className="text-left">{task.status}</TableCell>
                    <TableCell className="text-left">{task.timeEstimate}</TableCell>
                    <TableCell className="text-left">{task.sprintPoints}</TableCell>
                    <TableCell className="text-left">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="py-1 px-3 mr-2 rounded-full text-xs bg-blue-200 text-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                  {expandedTasks[task.id] &&
                    task.subtasks.map((subtask) => (
                      <SortableItem key={subtask.id} id={subtask.id}>
                        <TableRow className="hover:bg-gray-100">
                          <TableCell className="pl-10 w-12">
                            {subtask.subtasks && subtask.subtasks.length > 0 && (
                              <Button variant="ghost" size="sm" onClick={() => toggleTask(subtask.id)}>
                                {expandedTasks[subtask.id] ? (
                                  <ChevronDownIcon className="w-4 h-4" />
                                ) : (
                                  <ChevronRightIcon className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="text-left">{subtask.name}</TableCell>
                          <TableCell className="text-left">{subtask.assignee}</TableCell>
                          <TableCell className="text-left">{subtask.dueDate}</TableCell>
                          <TableCell className="text-left"></TableCell>
                          <TableCell className="text-left">{subtask.status}</TableCell>
                          <TableCell className="text-left">{subtask.timeEstimate}</TableCell>
                          <TableCell className="text-left"></TableCell>
                          <TableCell className="text-left"></TableCell>
                        </TableRow>
                        {expandedTasks[subtask.id] &&
                          subtask.subtasks.map((deepSubtask) => (
                            <TableRow key={deepSubtask.id} className="hover:bg-gray-100">
                              <TableCell className="pl-16 w-12"></TableCell>
                              <TableCell className="text-left">↳ {deepSubtask.name}</TableCell>
                              <TableCell className="text-left">{deepSubtask.assignee}</TableCell>
                              <TableCell className="text-left">{deepSubtask.dueDate}</TableCell>
                              <TableCell className="text-left"></TableCell>
                              <TableCell className="text-left">{deepSubtask.status}</TableCell>
                              <TableCell className="text-left">{deepSubtask.timeEstimate}</TableCell>
                              <TableCell className="text-left"></TableCell>
                              <TableCell className="text-left"></TableCell>
                            </TableRow>
                          ))}
                      </SortableItem>
                    ))}
                </SortableItem>
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TasksTable;
