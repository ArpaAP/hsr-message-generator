import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface ModalProps {
  open?: boolean;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: any;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  overlay?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  title,
  onClick,
  onClose,
  children,
  buttons,
  overlay,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-24"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translate-y-24"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-tr-[2rem] bg-white/75 align-middle shadow-2xl shadow-black/70 transition-all">
                <div className="px-6 pb-12">
                  <Dialog.Title
                    as="h3"
                    className="text-[30px] pt-10 pb-4 text-center leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <hr className="border-[0.95px] mx-2 mb-7 border-black/20" />

                  <div className="mt-2 px-2">
                    <p className="text-center text-[1.4rem] font-light leading-loose">
                      {children}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800 w-full h-24 flex gap-16 justify-center items-center">
                  {buttons}
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <Dialog.Panel>{overlay}</Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
