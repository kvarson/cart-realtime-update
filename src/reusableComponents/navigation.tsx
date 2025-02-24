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
    <NavigationMenu className='w-full bg-blue-700 shadow-md'>
      <NavigationMenuList className='flex items-center justify-between py-4'>
        <NavigationMenuItem>
          <Link href='/home'>Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/cart'>Cart</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
