// // taskitem.jsx
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";


import { DatePickerDemo } from './DatePicker';
import { TableCell, TableRow } from '@/components/ui/table';
import TaskModal from './taskModal';

const TaskItem = ({ task, index, isSubtask, toggleTask, expandedTasks, handleDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  // Define status icons and colors in an object mapping
  const statusIcons = {
    'Parking Lot': {
      icon: (
        <svg  className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="5" transform="rotate(90 8 8)" fill="#F8AE00"/>
        <circle cx="8" cy="8" r="7.5" transform="rotate(90 8 8)" stroke="#F8AE00"/>
        </svg>
        
      ),
    },
    'In Progress': {
      icon: (
        <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="5" fill="#5F55EE"/>
<circle cx="8" cy="8" r="7.5" stroke="#5F55EE"/>
</svg>

      ),
    },
    'Pending': {
      icon: (
        <svg className='mr-2' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="4.5" transform="rotate(90 8 8)" fill="#B660E0" stroke="#B660E0"/>
        <circle cx="8" cy="8" r="7.5" transform="rotate(90 8 8)" stroke="#B660E0"/>
        </svg>
        
      ),
    },
    'Todo': {
      icon: (
        <svg className='mr-2' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="4.5" transform="rotate(90 8 8)" fill="#87909E" stroke="#87909E"/>
        <circle cx="8" cy="8" r="7.5" transform="rotate(90 8 8)" stroke="#87909E"/>
        </svg>
        
      ),
    },
  };

  // Function to get the correct icon based on status
  const getStatusIcon = (status) => {
    return statusIcons[status]?.icon || statusIcons['Default'].icon;
  };

  return (
    <>
      <TableRow style={style}>
        <TableCell ref={setNodeRef} {...attributes} {...listeners} data-dragging={!isSubtask ? 'true' : undefined}>
          {!isSubtask && <img className="h-5 w-5 m-0 p-0" src="/dragIcon.svg" />}
        </TableCell>
        <TableCell className=" ">
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
        <TableCell className="p-4 flex items-center" onClick={openModal} style={{ cursor: 'pointer' }}>
          {getStatusIcon(status)}
          {name}
        </TableCell>
       {/* <TableCell className="p-4">
       <p
    className="rounded-full text-white w-[20px] text-center pl-1 pr-1"
    style={{ backgroundColor: getRandomColor() }}
  >
    {assignee[0]}
  </p>
</TableCell> */}


<TableCell className="p-4 relative">
      <div className="group">
      <p
    className="rounded-full text-white w-[20px] text-center pl-1 pr-1"
    style={{ backgroundColor: getRandomColor() }}
  >
    {assignee[0]}
  </p>
        <div className="absolute left-1/2 transform -translate-x-1 -translate-y-1/2  mt-2 w-max bg-gray-500 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ">
          {assignee}
        </div>
      </div>
    </TableCell>
        <TableCell className="p-4">{dueDate ? dueDate : <DatePickerDemo />}</TableCell>
        <TableCell className="p-4">
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
        <TableCell className="p-4">{status}</TableCell>
        <TableCell className="p-4">{timeEstimate}</TableCell>
        <TableCell className="p-4">{sprintPoints}</TableCell>
        <TableCell className="p-4">
          {tags?.map((tag, index) => (
            <span key={index} className="py-1 px-3 mr-2 rounded-full text-xs bg-blue-200 text-blue-600">
              {tag? tag : "Empty"}
            </span>
          ))}
        </TableCell>
      </TableRow>

      {subtasks &&
        expandedTasks[id] &&
        subtasks.map((subtask, idx) => (
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
      {isModalOpen && <TaskModal task={task} isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default TaskItem;
