import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div 
            className="bg-neutral-900/60 backdrop-blur-[2px] fixed inset-0" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div 
            className="fixed top-[50%] left-[50%] 
            max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[650px]
            translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-[30px] focus:outline-none overflow-y-auto"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Dialog.Title className="text-2xl font-accent text-center font-bold mb-2">
                {title}
            </Dialog.Title>
            <Dialog.Description className="mb-6 text-sm leading-normal text-center text-gray-600">
                {description}
            </Dialog.Description>
            <div className="max-md:h-full md:overflow-y-auto md:max-h-[calc(85vh-150px)] no-scrollbar pr-1">
                {children}
            </div>
            <Dialog.Close asChild>
                <button 
                  className="text-gray-500 hover:text-gray-800 transition-colors absolute top-[15px] right-[15px] inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full focus:outline-none"
                >
                    <IoMdClose size={24} />
                </button>
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
