"use client"

const tasks = [
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
        { id: 11, assignee: "Jack",  priority: "Medium", name: "Create Wireframe", status: "Pending", timeEstimate: "3h",  tags: ["DevOps", "CI/CD"], },
        { id: 12, assignee: "Alice",  priority: "High", name: "Design Mockups", status: "Pending", timeEstimate: "5h",  tags: ["Backend", "Cyber"] },
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
        { id: 21, assignee: "Adam",  priority: "Low", name: "Setup JWT", status: "Todo", timeEstimate: "4h",  tags: ["Data", "Analytics"] },
        { id: 22, assignee: "Bob",   priority: "Medium", name: "Implement OAuth", status: "Pending", timeEstimate: "8h" },
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
      dueDate: "",
      priority: "High",
      status: "Todo",
      timeEstimate: "10h",
      sprintPoints: 6,
      tags: ["DevOps", "CI/CD"],
      subtasks: [
        { id: 41, assignee: "Max",  priority: "Low", name: "Integrate GitHub Actions", status: "Pending", timeEstimate: "5h" },
        { id: 42, assignee: "Sam",  priority: "Medium", name: "Setup Deployment Pipeline", status: "Pending", timeEstimate: "5h" },
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
      tags: ["Testing", "Hacking"],
      subtasks: [
        { id: 51,  priority: "High", assignee: "Kim", name: "Test User Model", status: "Pending", timeEstimate: "2h" },
        { id: 52,   priority: "Medium", assignee: "Bill Gates", name: "Test API Endpoints", status: "Pending", timeEstimate: "4h" },
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
      tags: ["Research", "Tech"],
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
        { id: 71,assignee: "Lucy",   priority: "High", name: "Create Dashboard Layout", status: "Todo", timeEstimate: "5h",  tags: ["Tea", "Level"] },
        { id: 72,assignee: "Zampa",  priority: "Low", name: "Integrate API", status: "Pending", timeEstimate: "10h",  tags: ["Dashboard", "PC"] },
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
        { id: 81,  priority: "High", assignee: "Einstein", name: "Review Current Queries", status: "Todo", timeEstimate: "3h",  tags: ["Moon", "Walker"] },
        { id: 82,  priority: "High", assignee: "John", name: "Optimize Slow Queries", status: "Pending", timeEstimate: "4h",  tags: ["Nift", "Crime"] },
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
        { id: 101, assignee: "Henry",   priority: "High", name: "Identify Bugs", status: "Pending", timeEstimate: "2h" },
        { id: 102, assignee: "Kubernetes",  priority: "Medium",  name: "Fix Identified Bugs", status: "Todo", timeEstimate: "6h",  tags: ["Backend", "Meta"] },
      ],
    },
  ];
  
  export default tasks;
  