import CHARACTERS from "@/datas/characters";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface CharacterSelectorProps {
  open?: boolean;
  selected?: string[];
  onClose: (value: boolean) => void;
  onSelect?: (
    characterId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  open,
  selected,
  onClose,
  onSelect,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
        <div className="fixed left-8 inset-y-10 w-[23.5%]">
          <Transition.Child
            className="h-full"
            enter="ease-out duration-300"
            enterFrom="-translate-x-36 opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="-translate-x-36 opacity-0"
          >
            <Dialog.Panel className="scrollbar bg-black/25 h-full w-full transform transition-all border-[0.5px] text-white font-light px-3 pt-6 pb-12 border-gray-500/50">
              <div className="flex pb-3 gap-3 justify-center items-center">
                <hr className="w-1/5 border-gray-500/50" />
                <span className="flex-shrink-0">캐릭터 리스트</span>
                <hr className="w-1/5 border-gray-500/50" />
              </div>

              <div className="w-full h-full grid grid-cols-3 gap-3 px-4 py-2 overflow-y-scroll">
                {CHARACTERS.map((one) => (
                  <button
                    type="button"
                    key={one.id}
                    className="col-span-1 relative cursor-pointer transition-all duration-300"
                    onClick={(e) => onSelect && onSelect(one.id, e)}
                  >
                    <Image
                      alt={`Rarity ${one.rarity}`}
                      src={`/icons/Rarity_Background_${one.rarity}.webp`}
                      width={160}
                      height={194}
                      className="w-full h-auto pointer-events-none select-none"
                      loading="eager"
                      priority
                    />
                    <Image
                      alt={one.id}
                      src={one.icon}
                      width={64}
                      height={64}
                      className="absolute inset-0 w-full rounded-tr-[1.75rem] pointer-events-none select-none"
                      loading="eager"
                      priority
                    />
                    <div className="absolute w-[22.5%] bg-black/30 rounded-full h-auto top-1 left-1 pointer-events-none select-none">
                      <Image
                        alt={one.type}
                        src={`/icons/Type_${one.type}.webp`}
                        width={64}
                        height={64}
                        className="w-full h-auto"
                        loading="eager"
                        priority
                      />
                    </div>
                    <span className="absolute bottom-0 inset-x-0 w-full text-center text-sm text-gray-300 pointer-events-none select-none">
                      {one.names.kr}
                    </span>
                    {selected?.includes(one.id) && (
                      <>
                        <div className="absolute inset-x-0 top-0 bottom-[17.5%] rounded-tr-[1.75rem] bg-black/30" />
                        <div className="absolute bg-white/75 inset-x-0 text-black bottom-[17.5%]">
                          선택됨
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CharacterSelector;
