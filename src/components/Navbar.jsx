import React from 'react'
import Link from 'next/link'
import { ThemeToggler } from './ThemeToggler'

const Navbar = () => {
    return (
        <div className='flex w-full backdrop-blur-md max-w-md'>
            <div className="flex w-full px-5 py-2 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 w-full ">
                    <div className="flex w-full justify-start items-center">
                        <Link href="/">
                            Todo App
                        </Link>
                    </div>
                    <div className="flex w-full justify-end gap-5 items-center">
                        <ThemeToggler />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar