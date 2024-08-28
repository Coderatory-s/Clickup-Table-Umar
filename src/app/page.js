

import Image from "next/image";
import TasksTable from "./components/todosTableComponent";
import tasks from "./todosData/todosData";
import UserList from "./components/list";
import Link from "next/link";


export default function Home() {
  return (
    <>
 {/* <UserList/> */}
 <Link href="/board">Board</Link>
 <TasksTable tasks={tasks}/>
    </>
  );
}
