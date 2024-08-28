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
import TaskModal from './taskModal'; // Import TaskModal component
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'; // Import icons

const statuses = ["Todo", "In Progress", "Pending", "Parking Lot"]; // Define your statuses

const TasksTable = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({}); // State for collapsed sections
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

  // Function to toggle the collapse of each section
  const toggleSection = (status) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Group tasks by status
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = taskList.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-center'>
      <h2 className='text-2xl font-bold mb-4'>Tasks Table</h2>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="overflow-x-auto">
          <div className="space-y-4">
            {statuses.map((status) => (
              <div key={status} className="w-full p-2">
                <div className="flex items-center justify-none mb-2">
                  <h3 className="text-xl font-bold">{status}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(status)}
                    className="rounded-md ml-2"
                  >
                    {collapsedSections[status] ? (
                      <ChevronRightIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                {!collapsedSections[status] && (
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
                            openModal={openModal}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </SortableContext>
                )}
              </div>
            ))}
          </div>
        </div>
      </DndContext>

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
