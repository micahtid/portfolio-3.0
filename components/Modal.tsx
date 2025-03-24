import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

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
        <Dialog.Overlay className="bg-neutral-900/60 backdrop-blur-[2px] fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] 
        max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[650px]
        translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-[30px] focus:outline-none">
            <Dialog.Title className="text-2xl font-accent italic text-center font-bold mb-4">
                {title}
            </Dialog.Title>
            <Dialog.Description className="mb-6 text-sm leading-normal text-center text-gray-600">
                {description}
            </Dialog.Description>
            <div>
                {children}
            </div>
            <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-gray-800 transition-colors absolute top-[15px] right-[15px] inline-flex h-[30px] w-[30px] 
                appearance-none items-center justify-center rounded-full focus:outline-none">
                    <IoMdClose size={24} />
                </button>
            </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;