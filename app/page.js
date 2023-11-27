"use client"
import { useEffect } from "react";
import ImageCarousel from "./components/ImageCarousel";
import Lenis from "@studio-freight/lenis";


export default function Home() {

  useEffect(()=>{
    const lenis = new Lenis()
    lenis.on('scroll', (e) => {
      console.log(e)
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  },[])

  return (
    <>
    <main className="w-full h-screen flex fixed top-0 left-0 bg-neutral-100">
      <div className="w-[66vw] h-full shrink-0"></div>
      <ImageCarousel/>
    </main>
    <div className="h-[300vh]"></div>
    </>
  )
}
