"use client";

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import TaskItem from './taskitem'; // Import TaskItem component
import TaskModal from './TaskModal'; // Import TaskModal component
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const statuses = ["Todo", "In Progress", "Pending", "Parking Lot"]; // Define your statuses

const TasksTable = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const toggleTask = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
    console.log('Button Clicked');
  };

  // Function to open the modal with the clicked task
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Group tasks by status
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = taskList.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <h2 className='text-2xl font-bold mb-4'>Tasks Table</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="overflow-x-auto">
          <div className="space-y-4"> {/* Changed flex to space-y for vertical layout */}
            {statuses.map((status) => (
              <div key={status} className="w-full p-2"> {/* Removed flex-none */}
                <h3 className="text-xl font-bold mb-2">{status}</h3>
                <SortableContext
                  items={groupedTasks[status].map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table className='w-full border-collapse'>
                    <TableHeader>
                      <TableRow className='bg-gray-300'>
                        <TableHead className='p-4'>Drag</TableHead>
                        <TableHead className='p-4'></TableHead>
                        <TableHead className='p-4'>Name</TableHead>
                        <TableHead className='p-4'>Assignee</TableHead>
                        <TableHead className='p-4'>Due Date</TableHead>
                        <TableHead className='p-4'>Priority</TableHead>
                        <TableHead className='p-4'>Status</TableHead>
                        <TableHead className='p-4'>Time Estimate</TableHead>
                        <TableHead className='p-4'>Sprint Points</TableHead>
                        <TableHead className='p-4'>Tags</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedTasks[status].map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          toggleTask={toggleTask}
                          expandedTasks={expandedTasks}
                          openModal={openModal} // Pass the openModal function
                        />
                      ))}
                    </TableBody>
                  </Table>
                </SortableContext>
              </div>
            ))}
          </div>
        </div>
      </DndContext>

      {/* Render the modal if it's open */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TasksTable;
























