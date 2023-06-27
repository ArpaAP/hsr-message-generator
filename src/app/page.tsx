import Image from "next/image";
import { TbChevronRight } from "react-icons/tb";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden tracking-tight">
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
          <div className="w-1/3 text-white h-full">
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
                <TbChevronRight size={24} className="rotate-90" />
              </div>
            </div>
          </div>
          <div className="w-2/3 h-full">
            <div className="bg-white h-full rounded-tr-[2rem] opacity-75 drop-shadow px-8 py-6">
              <div className="text-2xl pb-0.5">삼칠이</div>
              <div className="text-[1.05rem] text-neutral-600 font-light">
                셔터를 누른 순간부터 매일의 기억이 시작돼, 오늘은 「너」로
                정했어~
              </div>
              <hr className="my-5 -mx-8 border-[0.95px] border-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
