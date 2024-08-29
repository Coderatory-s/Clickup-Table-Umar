// import { useEffect } from "react";
// import { XIcon } from "lucide-react"; // Icon for closing the modal
// import IconButton from "./IconButton";

// const TaskModal = ({ task, isOpen, onClose }) => {
//   useEffect(() => {
//     if (isOpen) {
//         document.body.style.overflow = 'hidden';
//       } else {
//         document.body.style.overflow = 'auto';
//       }
  
//       // Cleanup function to reset scroll lock when modal closes or component unmounts
//       return () => {
//         document.body.style.overflow = 'auto';
//       };
//   }, [isOpen]);

//   if (!isOpen || !task) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-screen">
//         {/* Close Button */}
//         <IconButton onClick={onClose} className="absolute top-4 right-4">
//           <XIcon className="w-6 h-6" />
//         </IconButton>

//         {/* Task Name */}
//         <h2 className="text-2xl font-bold mb-4">{task.name}</h2>

//         {/* Task Details */}
//         <div className="grid grid-cols-2 gap-4">
//           {/* Status */}
//           <div>
//             <h3 className="font-semibold">Status:</h3>
//             <p>{task.status}</p>
//           </div>

        
//           {/* Time Estimate */}
//           <div>
//             <h3 className="font-semibold">Time Estimate:</h3>
//             <p>{task.timeEstimate}</p>
//           </div>

//           {/* Assignees */}
//           <div>
//             <h3 className="font-semibold">Assignees:</h3>
//             <p>{task.assignee || "Unassigned"}</p>
//           </div>

//           {/* Priority */}
//           <div>
//             <h3 className="font-semibold">Priority:</h3>
//             <p>{task.priority}</p>
//           </div>

//           {/* Sprint Points */}
//           <div>
//             <h3 className="font-semibold">Sprint Points:</h3>
//             <p>{task.sprintPoints}</p>
//           </div>

//           {/* Tags */}
//           <div>
//             <h3 className="font-semibold">Tags:</h3>
//             <div className="flex flex-wrap gap-2">
//               {task?.tags?.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="py-1 px-2 rounded-full text-xs bg-blue-200 text-blue-600"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Subtasks */}
//           {task.subtasks && (
//             <div className="col-span-2">
//               <h3 className="font-semibold">Subtasks:</h3>
//               <ul className="list-disc ml-6">
//                 {task.subtasks.map((subtask, index) => (
//                   <li key={index}>{subtask.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
    
//           {/* Attachments */}
//           <div className="col-span-2">
//             <h3 className="font-semibold">Attachments:</h3>
//             {/* Add your attachment UI here */}
//             <p>No attachments available.</p>
//           </div>

//           {/* Activity Section */}
//           <div className="col-span-2">
//             <h3 className="font-semibold">Activity:</h3>
//             {/* Add your activity UI here */}
//             <p>No recent activity.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;



























// TaskModal.jsx

import { useEffect } from "react";
import { XIcon } from "lucide-react"; // Close icon
import { Button } from "@/components/ui/button"; // Assuming you have a button component from ShadCN
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card components
import { ScrollArea } from "@/components/ui/scroll-area"; // ShadCN ScrollArea component

const TaskModal = ({ task, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 ">
      <Card className="relative w-full max-w-4xl rounded-lg shadow-lg mx-5">
        <CardHeader className="grid grid-cols-2 justify-between items-center p-4 border-b">
          <CardTitle className="text-2xl font-bold">{task.name}</CardTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-full hover:bg-gray-200 w-[50px] ml-[70%] sm:ml-[90%]"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </CardHeader>

        <ScrollArea className="max-h-[75vh]">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Status:</h3>
                <p className="text-gray-600">{task.status}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Time Estimate:</h3>
                <p className="text-gray-600">{task.timeEstimate}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Assignee:</h3>
                <p className="text-gray-600">{task.assignee || "Unassigned"}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Priority:</h3>
                <p className="text-gray-600">{task.priority}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Sprint Points:</h3>
                <p className="text-gray-600">{task.sprintPoints}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {task?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="py-1 px-2 rounded-full text-xs bg-blue-100 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {task.subtasks && (
                <div className="col-span-2">
                  <h3 className="font-semibold text-gray-700">Subtasks:</h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    {task.subtasks.map((subtask, index) => (
                      <li key={index}>{subtask.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="col-span-2">
                <h3 className="font-semibold text-gray-700">Attachments:</h3>
                <p className="text-gray-600">No attachments available.</p>
              </div>

              <div className="col-span-2">
                <h3 className="font-semibold text-gray-700">Activity:</h3>
                <p className="text-gray-600">No recent activity.</p>
              </div>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default TaskModal;
