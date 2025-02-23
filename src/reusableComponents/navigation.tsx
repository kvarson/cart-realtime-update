"use client";

import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  return (
    <NavigationMenu className='w-full bg-blue-600 shadow-md'>
      {/* Inner container centers the content */}
      <NavigationMenuList className='flex items-center justify-between py-4'>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className='text-lg font-semibold text-white hover:text-gray-100 transition-colors'
          >
            <Link href='/home'>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className='text-lg font-semibold text-white hover:text-gray-100 transition-colors'
          >
            <Link href='/cart'>Cart</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
