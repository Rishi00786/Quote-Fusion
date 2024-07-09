"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NavbarProps {
  profile: any;
}

const Navbar = ({ profile }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn("shadow-lg bg-white dark:bg-[#313338]")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-9">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-blue-300">
                MyApp
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-8">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Features</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Feature 1</MenubarItem>
                    <MenubarItem>Feature 2</MenubarItem>
                    <MenubarItem>Feature 3</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Link href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Create</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Create Option 1</MenubarItem>
                    <MenubarItem>Create Option 2</MenubarItem>
                    <MenubarItem>Create Option 3</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Link href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>More</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Subitem 1 <MenubarShortcut>⌘1</MenubarShortcut></MenubarItem>
                    <MenubarItem>Subitem 2 <MenubarShortcut>⌘2</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Subitem 3 <MenubarShortcut>⌘3</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className='flex items-center'>
                <div>
                  <Link href="/">
                    <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                      Try for Free
                    </button>
                  </Link>
                </div>
                <div className='ml-4 self-center'><UserButton /></div>
                <div className='ml-4'><ModeToggle /></div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={!isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Features
          </Link>
          <Link href="/" className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Pricing
          </Link>
          <Link href="/" className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Create
          </Link>
          <Link href="/about" className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
        </div>
        <div className="px-2 pt-4 pb-3 border-t border-gray-200">
          <button className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">Try for Free</button>
          <UserButton />
          <div><ModeToggle /></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;