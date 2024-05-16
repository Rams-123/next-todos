import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Home() {
  return (
    <section className="flex flex-col w-full max-w-md mx-auto border border-slate-500 rounded-2xl  mt-10 my-10">
      <div className=" flex items-center justify-centert px-8 py-10 mx-auto">
        <h1 className=" text-3xl font-bold">Today's Todos</h1>
      </div>

      <div className=" flex flex-col gap-4">
        <div className="max-w-xl border shadow-lg border-slate-500 justify-between px-8 py-10 rounded-md  mx-auto">
          <div className="flex w-full">
            <input className="w-5 h-5" type="checkbox" />
            <p className="px-5 w-full flex items-center justify-center">This is an example of task</p>
            <span className="hover:text-red-500 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </span>

          </div>
        </div>
        <div className="max-w-xl border shadow-lg border-slate-500 justify-between px-8 py-10 rounded-md  mx-auto">
          <div className="flex w-full">
            <input className="w-5 h-5" type="checkbox" />
            <p className="px-5 w-full flex items-center justify-center">This is an example of task</p>
            <span className="hover:text-red-500 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </span>

          </div>
        </div>
        <div className="max-w-xl border shadow-lg border-slate-500 justify-between px-8 py-10 rounded-md  mx-auto">
          <div className="flex w-full">
            <input className="w-5 h-5" type="checkbox" />
            <p className="px-5 w-full flex items-center justify-center">This is an example of task</p>
            <span className="hover:text-red-500 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </span>

          </div>
        </div>
      </div>

      <div className="relative p-4 mx-auto w-[370px]">
        <Input className="text-start pr-8 " type="text" placeholder="task" />
        <span className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </span>
      </div>

      <div className="flex w-full py-4 mx-auto px-6 items-center justify-center">
        <Button className="w-[340px] mx-auto bg-blue-800">Add task</Button>
      </div>

    </section>
  );
}
