import { Button } from "@heroui/button";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { Image } from "@heroui/react";
import React, { useEffect } from 'react'

function customLoader({isLoading}:any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(()=>{
        onOpen();
    })
  return (
    <div>
    {isLoading&&<Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-10 w-full items-center justify-center">
                
                <Image src={'./magic-wand.gif'} alt='loader' width={250} height={250} className="w-[200px] h-[200px]"/>
                <h2 className="font-bold text-2xl text-primary text-center" >Once upon a time, in a world of imagination... Your story is being created right now!</h2>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>}
      </div>
  )
}

export default customLoader