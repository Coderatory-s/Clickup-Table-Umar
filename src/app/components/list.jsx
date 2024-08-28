
'use client'
import { useState } from 'react';
import UserItem from './taskitem';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
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


const tasks = 
 [
    {
      id: 1,
      name: "Design Homepage",
      assignee: "Alice",
      dueDate: "2024-09-01",
      priority: "High",
      status: "Todo",
      timeEstimate: "8h",
      sprintPoints: 5,
      tags: ["UI/UX", "Design"],
      subtasks: [
        { id: 11, assignee: "Jack", name: "Create Wireframe", status: "Pending", timeEstimate: "3h" },
        { id: 12, assignee: "Alice", name: "Design Mockups", status: "Pending", timeEstimate: "5h" },
      ],
    },
    {
      id: 2,
      name: "Develop Authentication System",
      assignee: "Bob",
      dueDate: "2024-09-05",
      priority: "Medium",
      status: "In Progress",
      timeEstimate: "12h",
      sprintPoints: 8,
      tags: ["Backend", "Auth"],
      subtasks: [
        { id: 21, assignee: "Adam", name: "Setup JWT", status: "Todo", timeEstimate: "4h" },
        { id: 22, assignee: "Bob", name: "Implement OAuth", status: "Pending", timeEstimate: "8h" },
      ],
    },
    {
      id: 3,
      name: "Create API Documentation",
      assignee: "Charlie",
      dueDate: "2024-09-10",
      priority: "Low",
      status: "Parking Lot",
      timeEstimate: "5h",
      sprintPoints: 3,
      tags: ["Documentation", "API"],
      subtasks: [],
    },
    {
      id: 4,
      name: "Setup CI/CD Pipeline",
      assignee: "Dana",
      dueDate: "2024-09-07",
      priority: "High",
      status: "Todo",
      timeEstimate: "10h",
      sprintPoints: 6,
      tags: ["DevOps", "CI/CD"],
      subtasks: [
        { id: 41, assignee: "Max", name: "Integrate GitHub Actions", status: "Pending", timeEstimate: "5h" },
        { id: 42, assignee: "Sam", name: "Setup Deployment Pipeline", status: "Pending", timeEstimate: "5h" },
      ],
    },
    {
      id: 5,
      name: "Write Unit Tests",
      assignee: "Eve",
      dueDate: "2024-09-12",
      priority: "Medium",
      status: "Todo",
      timeEstimate: "6h",
      sprintPoints: 4,
      tags: ["Testing", "Unit Tests"],
      subtasks: [
        { id: 51, assignee: "Kim", name: "Test User Model", status: "Pending", timeEstimate: "2h" },
        { id: 52, assignee: "Bill Gates", name: "Test API Endpoints", status: "Pending", timeEstimate: "4h" },
      ],
    },
    {
      id: 6,
      name: "Research on New Technology Stack",
      assignee: "Frank",
      dueDate: "2024-09-15",
      priority: "Low",
      status: "Parking Lot",
      timeEstimate: "4h",
      sprintPoints: 2,
      tags: ["Research", "Tech Stack"],
      subtasks: [],
    },
    {
      id: 7,
      name: "Implement User Dashboard",
      assignee: "Grace",
      dueDate: "2024-09-08",
      priority: "High",
      status: "Pending",
      timeEstimate: "15h",
      sprintPoints: 10,
      tags: ["Frontend", "Dashboard"],
      subtasks: [
        { id: 71,assignee: "Lucy", name: "Create Dashboard Layout", status: "Todo", timeEstimate: "5h" },
        { id: 72,assignee: "Zampa", name: "Integrate API", status: "Pending", timeEstimate: "10h" },
      ],
    },
    {
      id: 8,
      name: "Optimize Database Queries",
      assignee: "Hank",
      dueDate: "2024-09-11",
      priority: "Medium",
      status: "In Progress",
      timeEstimate: "7h",
      sprintPoints: 5,
      tags: ["Backend", "Database"],
      subtasks: [
        { id: 81, assignee: "Einstein", name: "Review Current Queries", status: "Todo", timeEstimate: "3h" },
        { id: 82, assignee: "John", name: "Optimize Slow Queries", status: "Pending", timeEstimate: "4h" },
      ],
    },
    {
      id: 9,
      name: "Prepare for Client Presentation",
      assignee: "Ivy",
      dueDate: "2024-09-03",
      priority: "High",
      status: "Pending",
      timeEstimate: "6h",
      sprintPoints: 4,
      tags: ["Presentation", "Client"],
      subtasks: [],
    },
    {
      id: 10,
      name: "Fix Bugs in Payment Module",
      assignee: "Jack",
      dueDate: "2024-09-09",
      priority: "High",
      status: "Todo",
      timeEstimate: "8h",
      sprintPoints: 6,
      tags: ["Bugfix", "Payment"],
      subtasks: [
        { id: 101,assignee: "Henry", name: "Identify Bugs", status: "Pending", timeEstimate: "2h" },
        { id: 102,assignee: "Kubernetes", name: "Fix Identified Bugs", status: "Todo", timeEstimate: "6h" },
      ],
    },
  ];

const UserList = () => {
  const [userList, setUserList] = useState(tasks);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setUserList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  console.log(userList);

  return (
    <div className='max-w-2xl mx-auto grid gap-2 my-10'>
      <h2 className='text-2xl font-bold mb-4'>User List</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={userList}
          strategy={verticalListSortingStrategy}
        >
          {userList.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UserList;
