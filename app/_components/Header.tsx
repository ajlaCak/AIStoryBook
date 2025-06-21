"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import {Mulish} from 'next/font/google'

const myAppFont=Mulish({subsets:['latin']});
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@heroui/navbar";
import Link from 'next/link';
import { Button } from '@heroui/button';
import { useScroll } from 'framer-motion';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
    const {user,isSignedIn}=useUser();
    const Menulist=[
        {
            name:'Home',
            path:'/'
        },
        {
            name:'Explore Stories',
            path:'/explore'
        },
        {
            name:'Create Story',
            path:'/create-story'
        },
        {
            name:'Contact',
            path:'/contact-us'
        }
    ]

    const [isMenuOpen,setIsMenuOpen]=useState(false);
  return (
    <Navbar maxWidth='full'   className="bg-red-700" >
        <NavbarContent>
            <NavbarMenuToggle
            aria-label={isMenuOpen?'close menu':'open menu'}
            className='sm:hidden'
            
            />
            <NavbarBrand>
                <Image src={'/logo.svg'} alt="logo" width={40} height={40}/>
                <h2 className='ml-2'>STORYBOOK AI</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='ml-6 hidden sm:flex'>
            {Menulist.map((item,index)=>
            (<NavbarItem key={item.name} className='text-xl font-medium hover:underline mx-3' style={{ fontFamily: myAppFont.style.fontFamily }} >
                <Link href={item.path}>
                {item.name}
                </Link>
            </NavbarItem>))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button color='primary' style={{ color: 'black' }}>
                {isSignedIn?
                'Dashboard':
                'Get Started'    
                }
                
                </Button>
            </Link>
        <UserButton/>

        </NavbarContent>
        <NavbarMenu>
            {Menulist.map((item,index)=>(
                <NavbarMenuItem key={item.name}>
                    <Link href={item.path}>
                {item.name}
                </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header