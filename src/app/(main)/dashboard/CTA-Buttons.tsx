"use client"

import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/lib/uploadthing';
import { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { X } from 'lucide-react';

export const CTAButtons = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='inline-flex   items-center gap-2'>
            <Button onClick={() => setIsOpen(!isOpen)} variant={"outline"}>upload</Button>
            <Button variant={"destructive"}>logout</Button>
            <AnimatePresence>

                {isOpen && <motion.div
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className='absolute  w-full h-full backdrop-blur-2xl rounded z-0 min-h-screen  inset-0'>
                    <button className={"absolute right-0 z-2 p-3 hover:rotate-90 hover:scale-130 transition-all duration-500  "} onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                    <UploadDropzone
                        appearance={{ button: "  border border-primary px-2 shadow shadow-primary", label: "text-neutral-900 text-xl  ", allowedContent: "text-red-300 ", uploadIcon: "w-20 h-20  " }}
                        className="z-1  relative rounded-2xl min-h-screen -top-3 bg-white/30  "

                        endpoint="pdfUploader"
                        onClientUploadComplete={(res) => {

                            alert("Upload Completed");
                            setIsOpen(false)
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}
