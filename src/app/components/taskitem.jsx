'use client'
// taskitem.jsx
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { DatePickerDemo } from './DatePicker';
import { TableCell, TableRow } from '@/components/ui/table';
import TaskModal from './taskModal';


const TaskItem = ({ task, index, isSubtask, toggleTask, expandedTasks, handleDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility
  const { id, name, assignee, dueDate, priority, status, timeEstimate, sprintPoints, tags, subtasks } = task;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingLeft: isSubtask ? '20px' : '0',
    backgroundColor: isSubtask ? '#e0f7fa' : '#ffffff',
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <TableRow style={style}>
        <TableCell ref={setNodeRef} {...attributes} {...listeners} data-dragging={!isSubtask ? 'true' : undefined}>
          {!isSubtask && <img className='h-5 w-5 m-0 p-0 ' src="/dragIcon.svg"/>}
        </TableCell>
        <TableCell className=' '>
          {subtasks && subtasks.length > 0 && (
            <Button
              className="z-4"
              onMouseDown={(e) => e.preventDefault()}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(id);
              }}
              data-collapse-button
            >
              {expandedTasks[id] ? (
                <ChevronDownIcon className="w-5 h-5 z-5" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 z-5" />
              )}
            </Button>
          )}
        </TableCell>
        <TableCell className='p-4' onClick={openModal} style={{ cursor: 'pointer' }}>
          {name}
        </TableCell>
        <TableCell className='p-4'>{assignee}</TableCell>
        <TableCell className='p-4'>{dueDate ? dueDate :
          <DatePickerDemo /> }
          </TableCell>
        <TableCell className='p-4'>
          <span
            className={`py-1 px-3 rounded-full text-xs ${
              priority === 'High'
                ? 'bg-red-200 text-red-600'
                : priority === 'Medium'
                ? 'bg-yellow-200 text-yellow-600'
                : 'bg-green-200 text-green-600'
            }`}
          >
            {priority}
          </span>
        </TableCell>
        <td className='p-4'>{status}</td>
        <td className='p-4'>{timeEstimate}</td>
        <td className='p-4'>{sprintPoints}</td>
        <td className='p-4'>
          {tags?.map((tag, index) => (
            <span key={index} className="py-1 px-3 mr-2 rounded-full text-xs bg-blue-200 text-blue-600">
              {tag}
            </span>
          ))}
        </td>
      </TableRow>

      {subtasks && expandedTasks[id] && subtasks.map((subtask, idx) => (
        <TaskItem
          key={subtask.id}
          task={subtask}
          index={idx}
          isSubtask={true}
          toggleTask={toggleTask}
          expandedTasks={expandedTasks}
          handleDragStart={handleDragStart}
        />
      ))}

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={task}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default TaskItem;










