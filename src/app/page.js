import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Home() {
  const tasks = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <section className="flex flex-col h-screen w-full max-w-md mx-auto p-4 overflow-hidden">
      <div className="flex flex-col w-full border border-slate-500 p-5 rounded-2xl gap-4 flex-grow">
        <div className="flex flex-col w-full gap-4 flex-grow">
          <div>
            <h1 className="text-lg font-bold">Today Todos</h1>
          </div>
          <div className="flex flex-col flex-grow gap-4 overflow-auto">
            {tasks.map((task, index) => (
              <div key={index} className="flex border shadow-lg border-slate-500 px-5 py-3 items-center justify-between rounded-md">
                <div className="flex w-full items-center text-center">
                  <input type="checkbox" className="items-center" />
                  {/* <Checkbox size={40} /> */}
                  <p className="px-5 w-full flex flex-1">This is an example of task {task}</p>
                  <button className="hover:text-red-500 rounded-md" aria-label="Delete Task">
                    <Trash2 className='hover:text-red-600' size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Drawer className="max-w-md">
            <DrawerTrigger asChild>
              <Button className="w-full bg-blue-600">Add Todo</Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader>
                <h2>Add Todo list</h2>
                <Input placeholder="Add Todo title" />
                <DrawerTitle>
                  <Input placeholder="Add description" />
                </DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button className="w-full hover:bg-slate-800 hover:text-white" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>


  );
}
