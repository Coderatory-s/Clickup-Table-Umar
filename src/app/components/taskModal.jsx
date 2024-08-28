import { useEffect } from "react";
import { XIcon } from "lucide-react"; // Icon for closing the modal
import IconButton from "./IconButton";

const TaskModal = ({ task, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      // Cleanup function to reset scroll lock when modal closes or component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
  }, [isOpen]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-screen">
        {/* Close Button */}
        <IconButton onClick={onClose} className="absolute top-4 right-4">
          <XIcon className="w-6 h-6" />
        </IconButton>

        {/* Task Name */}
        <h2 className="text-2xl font-bold mb-4">{task.name}</h2>

        {/* Task Details */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <h3 className="font-semibold">Status:</h3>
            <p>{task.status}</p>
          </div>

        
          {/* Time Estimate */}
          <div>
            <h3 className="font-semibold">Time Estimate:</h3>
            <p>{task.timeEstimate}</p>
          </div>

          {/* Assignees */}
          <div>
            <h3 className="font-semibold">Assignees:</h3>
            <p>{task.assignee || "Unassigned"}</p>
          </div>

          {/* Priority */}
          <div>
            <h3 className="font-semibold">Priority:</h3>
            <p>{task.priority}</p>
          </div>

          {/* Sprint Points */}
          <div>
            <h3 className="font-semibold">Sprint Points:</h3>
            <p>{task.sprintPoints}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {task?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="py-1 px-2 rounded-full text-xs bg-blue-200 text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Subtasks */}
          {task.subtasks && (
            <div className="col-span-2">
              <h3 className="font-semibold">Subtasks:</h3>
              <ul className="list-disc ml-6">
                {task.subtasks.map((subtask, index) => (
                  <li key={index}>{subtask.name}</li>
                ))}
              </ul>
            </div>
          )}
    
          {/* Attachments */}
          <div className="col-span-2">
            <h3 className="font-semibold">Attachments:</h3>
            {/* Add your attachment UI here */}
            <p>No attachments available.</p>
          </div>

          {/* Activity Section */}
          <div className="col-span-2">
            <h3 className="font-semibold">Activity:</h3>
            {/* Add your activity UI here */}
            <p>No recent activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
