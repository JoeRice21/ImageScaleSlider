"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion, useMotionValue } from "framer-motion"
import Image from "next/image"
import { useWindowSize } from "@uidotdev/usehooks"

const images = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp",
  "/img5.webp",
  "/img6.webp",
]

function ImageCarousel() {
  const [scrollRange, setScrollRange] = useState(0)
  const imageCarousel = useRef(null)
  const {scrollYProgress} = useScroll()

  const windowSize = useWindowSize()

  useLayoutEffect(()=>{
    imageCarousel && setScrollRange(imageCarousel.current.getBoundingClientRect().width)
  },[imageCarousel, windowSize])

  const translateX = useTransform(scrollYProgress, [0,1] , [0,-scrollRange])

  return (
    <motion.div ref={imageCarousel} style={{translateX: translateX}} className="relative h-full flex">
      {images.map((href, index)=>
        <ImageCard windowSize={windowSize} scrollYProgress={scrollYProgress} key={href} href={href}/>
      )}
    </motion.div>
  )
}

function ImageCard({href, scrollYProgress, windowSize}) {

  const imageRef = useRef(null)
  const xPosition = useMotionValue()
  const scale = useTransform(xPosition, [0,windowSize.width/2], [0.65,1])

  useEffect(() => {
      const unSubscribeX = scrollYProgress.on("change", () => {
        const boundingClientRect = imageRef.current.getBoundingClientRect()
        xPosition.set(boundingClientRect.x + boundingClientRect.width/2)
      })
      return () => unSubscribeX()
  },[])


  return (
    <div className="h-full aspect-[2/3] flex justify-center items-center">
      <motion.div style={{scale}} className="relative w-full h-full">
        <Image ref={imageRef} src={href} alt={href} fill className="w-full h-full object-cover object-center"/>
      </motion.div>
    </div>
  )
}
export default ImageCarousel