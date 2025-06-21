import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@heroui/button";
import Header from "./_components/Header";
import {Mulish} from 'next/font/google'
import Hero from "./_components/Hero";


const myAppFont=Mulish({subsets:['latin']});

export default function Home() {
  return (
   <div className="bg-[#861717]">
    
    
    {/* Hero */ }
    
    <Hero></Hero>
   </div>
  );
}
