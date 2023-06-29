"use client";
import Button from "@/components/button";
import CharacterIconButton from "@/components/character-icon-button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import NewCharacterIconButton from "@/components/new-character-icon-button";
import { DBData } from "@/types/data";
import { Low, LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbChevronRight, TbCheck, TbPlus } from "react-icons/tb";

export default function Home() {
  const [db, setDB] = useState<LowSync<DBData>>();
  const [openNewModal, setOpenNewModal] = useState(false);

  useEffect(() => {
    let db = new LowSync(new LocalStorage<DBData>("datas"), {
      rooms: [],
      version: "1.0.0",
    });
    setDB(db);
    db.read();
    console.log(db.data);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src="/bg-comp.jpeg"
        alt="background"
        className="absolute top-0 -z-50 w-full h-full blur-xl brightness-50 scale-110"
        fill
      />
      <div className="container px-8 py-6 h-full mx-auto">
        <div className="text-white flex gap-2 items-center pointer-events-none select-none mb-10">
          <Image width={50} height={50} src="/icon.png" alt={""} />
          <div className="text-[21px] font-light drop-shadow-xl mt-1.5">
            문자 메시지
          </div>
        </div>

        <div className="flex h-5/6 gap-12">
          <div className="w-1/3 text-white h-full flex flex-col gap-1">
            <div className="flex items-center border-y-[1.5px] border-x-2 p-4 border-[#b5b5b2] text-[#c1c1c0] bg-black/30 gap-4">
              <Image
                alt="mar7th"
                src="/avatars/march-7th.jpeg"
                width={36}
                height={36}
                className="rounded-full w-14 h-14 -mb-2"
              />
              <span className="text-[21px] font-light mt-1">Mar. 7th</span>
              <div className="ml-auto">
                <TbChevronRight size={24} className="rotate-90 opacity-75" />
              </div>
            </div>

            <div className="flex items-center border-y-[1.5px] border-x-2 px-5 py-3 m-3 border-[#b5b5b2] text-black bg-white/90 gap-3">
              <TbCheck size={24} />
              <span className="text-[21px] font-light">개척자!!</span>
            </div>

            <hr className="border border-[#b5b5b2]/25 mb-3" />

            <button
              type="button"
              className="flex justify-center items-center px-4 py-2 text-[#c1c1c0] bg-black/30 hover:bg-black/20 transition-all duration-200 gap-4"
              onClick={() => setOpenNewModal(true)}
            >
              <TbPlus size={24} />
              <span className="text-md font-light mt-1">새 대화 만들기</span>
            </button>
          </div>
          <div className="w-2/3 h-full">
            <div className="bg-white/80 h-full rounded-tr-[2rem] drop-shadow py-6 relative">
              <div className="text-2xl pb-0.5 px-8">Mar. 7th</div>
              <div className="text-[1.05rem] text-neutral-500 font-light px-8">
                셔터를 누른 순간부터 매일의 기억이 시작돼, 오늘은 「너」로
                정했어~
              </div>
              <hr className="mt-2 mb-5 border-[0.95px] border-zinc-400" />

              <div className="absolute inset-x-0 top-24 bottom-36 overflow-y-scroll overscroll-y-contain scrollbar">
                <div className="flex gap-5 my-6 px-12">
                  <Image
                    alt="mar7th"
                    src="/avatars/march-7th.jpeg"
                    width={40}
                    height={40}
                    className="rounded-full w-[4.2rem] h-[4.2rem] -mb-2"
                  />
                  <div>
                    <div className="text-neutral-500 mb-1">Mar. 7th</div>
                    <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                      개척자!!
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 mb-6 px-12">
                  <Image
                    alt="mar7th"
                    src="/avatars/march-7th.jpeg"
                    width={40}
                    height={40}
                    className="rounded-full w-[4.2rem] h-[4.2rem] -mb-2"
                  />
                  <div>
                    <div className="text-neutral-500 mb-1">Mar. 7th</div>
                    <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                      야~
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 mb-6 px-12">
                  <Image
                    alt="mar7th"
                    src="/avatars/march-7th.jpeg"
                    width={40}
                    height={40}
                    className="rounded-full w-[4.2rem] h-[4.2rem] -mb-2"
                  />
                  <div>
                    <div className="text-neutral-500 mb-1">Mar. 7th</div>
                    <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                      무시하는거 아니지?!
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-6 px-12">
                  <Image
                    alt="mar7th"
                    src="/avatars/march-7th.jpeg"
                    width={40}
                    height={40}
                    className="rounded-full w-[4.1rem] h-[4.1rem] -mb-2"
                  />
                  <div>
                    <div className="text-neutral-500 mb-1">Mar. 7th</div>
                    <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                      이거 봐바!!
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 mb-6 px-12">
                  <Image
                    alt="mar7th"
                    src="/avatars/march-7th.jpeg"
                    width={40}
                    height={40}
                    className="rounded-full w-[4.1rem] h-[4.1rem] -mb-2"
                  />
                  <div>
                    <div className="text-neutral-500 mb-1">Mar. 7th</div>
                    <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                      단항한테는 절대 비밀이야!
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-slate-800/10 h-36 px-8 py-4 border-t border-t-black/10 flex flex-col gap-3">
                <div className="bg-white/90 shadow-md py-1 text-lg text-center">
                  좋네
                </div>
                <div className="bg-white/90 shadow-md py-1 text-lg text-center">
                  좀 별론데
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openNewModal}
        title="새 대화 생성"
        onClose={() => setOpenNewModal(false)}
        buttons={<Button onClick={() => setOpenNewModal(false)}>생성</Button>}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <span className="flex-shrink-0">주제 이름:</span>
            <Input className="w-full" placeholder="새 대화" />
          </div>

          <div className="flex gap-3 items-center">
            <span className="flex-shrink-0">참여 캐릭터:</span>
            <div className="my-auto pt-2 flex gap-3 flex-wrap">
              <CharacterIconButton
                characterId="march-7th"
                className="w-16 h-16 drop-shadow-md"
              />
              <NewCharacterIconButton className="w-16 h-16" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
