

// import Image from "next/image";
// import TasksTable from "./components/todosTableComponent";
// import tasks from "./todosData/todosData";
// import UserList from "./components/list";
// import Link from "next/link";


// export default function Home() {
//   return (
//     <>
//  {/* <UserList/> */}
//   <Link href="/board">Board</Link>
//    <TasksTable tasks={tasks}/>
//     </>
//   );
// }








// app/page.js

import Link from "next/link";
import TasksTable from "./components/todosTableComponent";
import tasks from "./todosData/todosData";


export default function Home() {
  return (
    <div className="">
    <div className="min-h-screen grid place-items-center">
          <h1 className="font-semibold  sm:text-5xl text-center">Welcome To Click Up Table</h1>
        </div>
    </div>
  );
}
