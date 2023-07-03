"use client";
import Button from "@/components/Button";
import CharacterIconButton from "@/components/CharacterIconButton";
import CharacterSelector from "@/components/CharacterSelector";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import NewCharacterIconButton from "@/components/NewCharacterIconButton";
import { Tooltip } from "@/components/Tooltip";
import CHARACTERS from "@/datas/characters";
import { DBData, Message } from "@/types/data";
import classNames from "classnames";
import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  TbChevronRight,
  TbCheck,
  TbPlus,
  TbX,
  TbTrash,
  TbMessagePlus,
} from "react-icons/tb";

export default function Home() {
  const [db, setDB] = useState<LowSync<DBData>>();
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [openCharacterSelection, setOpenCharacterSelection] = useState(false);
  const [newChatSelectedCharacters, setNewChatSelectedCharacters] = useState<
    string[]
  >([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState<Partial<
    Omit<Message, "messageId">
  > | null>(null);

  const newChatRoomNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let db = new LowSync(new LocalStorage<DBData>("datas"), {
      rooms: [],
      version: "1.0.0",
    });
    setDB(db);
    db.read();
    setCurrentRoomId(db.data.rooms[0]?.roomId ?? null);
    setCurrentTopicId(db.data.rooms[0]?.topics[0]?.topicId ?? null);
  }, []);

  const handleNewChatModalClose = useCallback(() => {
    setOpenNewChatModal(false);
    setNewChatSelectedCharacters([]);
  }, []);

  const currentRoom = db?.data.rooms.find(
    (room) => room.roomId === currentRoomId
  );

  const currentTopic = currentRoom?.topics.find(
    (topic) => topic.topicId === currentTopicId
  );

  const currentRoomMembers = CHARACTERS.filter((char) =>
    currentRoom?.characters.includes(char.id)
  );

  const currentMessages = currentTopic?.messages;

  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src="/bg-pre-comp.jpeg"
        alt="background"
        className="absolute top-0 -z-50 w-full h-full scale-110"
        loading="eager"
        priority
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
          <div className="w-1/3 text-white h-full flex flex-col gap-3">
            {db?.data.rooms.map((room) => {
              let roomMembers = room.characters.map((memberId) =>
                CHARACTERS.find((one) => one.id === memberId)
              );

              return (
                <div key={room.roomId}>
                  <button
                    type="button"
                    className="flex w-full items-center border-y-[1.5px] border-x-2 p-4 border-[#b5b5b2] text-[#c1c1c0] bg-black/30 gap-4"
                    onClick={() => {
                      if (room.roomId === currentRoomId) {
                        setCurrentRoomId(null);
                      } else {
                        setCurrentTopicId(room.topics[0]?.topicId ?? null);
                        setCurrentRoomId(room.roomId);
                      }
                    }}
                  >
                    <Image
                      alt={room.characters.join(", ")}
                      src={
                        room.characters.length > 1
                          ? ""
                          : roomMembers[0]?.icon ?? ""
                      }
                      width={36}
                      height={36}
                      className="rounded-full w-14 h-14 -mb-2 bg-neutral-700"
                    />
                    <span className="text-[21px] font-light mt-1">
                      {room.characters.length === 1
                        ? roomMembers[0]?.names.kr
                        : room.roomName}
                    </span>
                    <div className="ml-auto">
                      <TbChevronRight
                        size={24}
                        className={classNames(
                          "opacity-75 transition-transform duration-150 will-change-transform",
                          room.roomId === currentRoomId && "rotate-90"
                        )}
                      />
                    </div>
                  </button>

                  {room.roomId === currentRoomId &&
                    room.topics.map((topic) => (
                      <div key={topic.topicId} className="m-3">
                        <button
                          className="flex w-full items-center border-y-[1.5px] border-x-2 px-5 py-3 border-[#b5b5b2] text-black bg-white/90 gap-3"
                          onClick={() => setCurrentTopicId(topic.topicId)}
                        >
                          <TbCheck size={24} />
                          <span className="text-[21px] font-light">
                            {topic.messages.at(-1)?.content ?? <i>[새 대화]</i>}
                          </span>
                        </button>
                      </div>
                    ))}
                  {room.roomId === currentRoomId && (
                    <div className="mt-3 mx-3">
                      <button
                        className="flex w-full items-center border-y-[1.5px] border-x-2 px-5 py-3 border-[#b5b5b2] text-[#c1c1c0] bg-black/30 gap-3"
                        onClick={() => {}}
                      >
                        <TbPlus size={24} />
                        <span className="text-[21px] font-light">
                          새 대화 주제 만들기
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {!!db?.data.rooms.length && (
              <hr className="border border-[#b5b5b2]/25 mb-3" />
            )}

            <button
              type="button"
              className="flex justify-center items-center px-4 py-2 text-[#c1c1c0] bg-black/30 hover:bg-black/20 transition-all duration-200 gap-4"
              onClick={() => setOpenNewChatModal(true)}
            >
              <TbPlus size={24} />
              <span className="text-md font-light mt-1">새 대화 만들기</span>
            </button>
          </div>
          <div className="w-2/3 h-full">
            <div className="bg-white/80 h-full rounded-tr-[2rem] drop-shadow py-6 relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <div className="text-2xl pb-0.5 px-8">
                    {currentRoomMembers.length > 1
                      ? currentRoom?.roomName
                      : currentRoomMembers[0]?.names.kr}
                  </div>
                  <div className="text-[1.05rem] text-neutral-500 font-light pl-8">
                    {currentRoomMembers.length === 1 ? (
                      currentRoomMembers[0].statusMessages.kr
                    ) : (
                      <div className="my-3" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1 pr-6 pb-2 text-neutral-500">
                  {currentTopic && (
                    <Tooltip
                      label={
                        <span className="flex items-center bg-black/50 text-white text-sm font-light py-2 px-2 rounded-xl shadow-lg">
                          새 메시지
                        </span>
                      }
                      placement="bottom"
                    >
                      <button
                        type="button"
                        className="hover:text-neutral-800 transition-colors duration-200 px-1.5 py-1"
                        onClick={() => {
                          if (newMessage !== null) return;
                          setNewMessage(
                            currentRoomMembers.length === 1
                              ? {
                                  author: currentRoomMembers[0].id,
                                }
                              : {}
                          );
                        }}
                      >
                        <TbMessagePlus size={24} />
                      </button>
                    </Tooltip>
                  )}
                  {!!db?.data.rooms.length && (
                    <Tooltip
                      label={
                        <span className="flex items-center bg-black/50 text-white text-sm font-light py-2 px-2 rounded-xl shadow-lg">
                          {currentTopic ? "이 대화 주제" : "이 방"} 삭제
                        </span>
                      }
                      placement="bottom"
                    >
                      <button
                        type="button"
                        className="hover:text-neutral-800 transition-colors duration-200 px-1.5 py-1"
                        onClick={() => {
                          if (currentRoom?.topics.length) {
                            let newTopics = currentRoom!.topics.filter(
                              (one) => one.topicId !== currentTopicId
                            );
                            db!.data.rooms.find(
                              (one) => one.roomId === currentRoomId
                            )!.topics = newTopics;
                            db?.write();
                          } else {
                            let newRooms = db!.data.rooms.filter(
                              (one) => one.roomId !== currentRoomId
                            );
                            db!.data.rooms = newRooms;
                            db?.write();
                          }
                          setDB(new LowSync(db!.adapter, db!.data));
                        }}
                      >
                        <TbTrash size={24} />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>

              <hr className="mt-2 mb-5 border-[0.95px] border-zinc-400" />

              <div className="absolute inset-x-0 top-24 bottom-36 overflow-y-scroll overscroll-y-contain scrollbar">
                {currentRoom?.topics.length ? (
                  <div>
                    {currentMessages?.map((message) => {
                      let author = currentRoomMembers.find(
                        (member) => member.id === message.author
                      )!;

                      return (
                        <div
                          key={message.messageId}
                          className="flex gap-5 my-3 px-12"
                        >
                          <Image
                            alt={author.id}
                            src={author.icon}
                            width={40}
                            height={40}
                            className="rounded-full w-[4.2rem] h-[4.2rem] -mb-2"
                          />
                          <div>
                            <div className="text-neutral-500 mb-1">
                              {author.names.kr}
                            </div>
                            <div className="bg-white/75 rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* new message */}
                    {newMessage !== null && (
                      <div className="flex my-3 px-12">
                        <Image
                          alt={newMessage.author ?? ""}
                          src={
                            CHARACTERS.find(
                              (one) => one.id === newMessage.author
                            )?.icon ?? ""
                          }
                          width={40}
                          height={40}
                          className="rounded-full w-[4.2rem] h-[4.2rem] -mb-2 mr-5"
                        />
                        <div className="mr-2">
                          <div className="text-neutral-500 mb-1">
                            {
                              CHARACTERS.find(
                                (one) => one.id === newMessage.author
                              )?.names.kr
                            }
                          </div>
                          <div className="border-2 border-neutral-400/75 border-dashed rounded-b-xl rounded-tr-xl px-3.5 pt-2.5 pb-2 text-lg">
                            <input
                              type="text"
                              className="bg-transparent p-0 m-0"
                              autoComplete="off"
                              autoCorrect="off"
                              onChange={(e) => {
                                setNewMessage({
                                  ...newMessage,
                                  content: e.target.value,
                                });
                              }}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="flex gap-1 mt-auto">
                          <button
                            type="button"
                            className="bg-white/75 text-neutral-600 p-0.5 rounded-md"
                            onClick={() => {
                              if (
                                !currentMessages ||
                                !newMessage.author ||
                                !newMessage.content
                              )
                                return;

                              currentMessages.push({
                                messageId: new Date().getTime().toString(),
                                author: newMessage.author,
                                content: newMessage.content,
                              });

                              setDB(new LowSync(db!.adapter, db!.data));
                              db?.write();
                              setNewMessage(null);
                            }}
                          >
                            <TbCheck />
                          </button>
                          <button
                            type="button"
                            className="bg-white/75 text-neutral-600 p-0.5 rounded-md"
                            onClick={() => setNewMessage(null)}
                          >
                            <TbX />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-neutral-500 h-full flex flex-col justify-center items-center">
                    <div className="text-2xl my-3">대화가 없습니다.</div>
                    <div className="text-lg" />
                    왼쪽 메뉴바에서 새 대화를 만드세요!
                  </div>
                )}
              </div>

              {/**<div className="absolute bottom-0 inset-x-0 bg-slate-800/10 h-36 px-8 py-4 border-t border-t-black/10 flex flex-col gap-3">
                <div className="bg-white/90 shadow-md py-1 text-lg text-center">
                  좋네
                </div>
                <div className="bg-white/90 shadow-md py-1 text-lg text-center">
                  좀 별론데
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openNewChatModal}
        title="새 대화 생성"
        onClose={handleNewChatModalClose}
        buttons={
          <>
            <Button onClick={handleNewChatModalClose} leadingIcon={<TbX />}>
              취소
            </Button>
            <Button
              disabled={!!newChatRoomNameRef.current?.value}
              onClick={() => {
                let newRoomId;
                let newTopicId = new Date().getTime().toString();

                if (newChatSelectedCharacters.length === 1) {
                  newRoomId = newChatSelectedCharacters[0];

                  db!.data.rooms.push({
                    roomId: newRoomId,
                    roomName: newRoomId,
                    characters: newChatSelectedCharacters,
                    topics: [
                      {
                        topicId: newTopicId,
                        topicName: "새 대화 주제",
                        messages: [],
                        reply: [],
                      },
                    ],
                  });
                } else {
                  newRoomId = new Date().getTime().toString();

                  db!.data.rooms.push({
                    roomId: newRoomId,
                    roomName: newChatRoomNameRef.current!.value,
                    characters: newChatSelectedCharacters,
                    topics: [
                      {
                        topicId: newTopicId,
                        topicName: "새 대화 주제",
                        messages: [],
                        reply: [],
                      },
                    ],
                  });
                }

                db!.write();
                setDB(new LowSync(db!.adapter, db!.data));
                setCurrentRoomId(newRoomId);
                setCurrentTopicId(newTopicId);
                handleNewChatModalClose();
              }}
              leadingIcon={<TbCheck />}
            >
              생성
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <span className="flex-shrink-0">방 이름:</span>
            <Input
              ref={newChatRoomNameRef}
              disabled={newChatSelectedCharacters.length === 1}
              className="w-full"
              placeholder={
                newChatSelectedCharacters.length === 1
                  ? CHARACTERS.find(
                      (one) => one.id === newChatSelectedCharacters[0]
                    )?.names.kr
                  : "새 대화"
              }
            />
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 py-4">참여 캐릭터:</span>
            <div className="my-auto pt-2 flex gap-3 flex-wrap">
              {newChatSelectedCharacters.map((characterId) => (
                <CharacterIconButton
                  key={characterId}
                  characterId={characterId}
                  className="w-16 h-16 drop-shadow-md border border-neutral-400 rounded-full"
                  onClick={() => {
                    let temp = [...newChatSelectedCharacters];

                    temp = temp.filter((one) => one != characterId);

                    setNewChatSelectedCharacters(temp);
                  }}
                />
              ))}
              <NewCharacterIconButton
                className="w-16 h-16"
                onClick={() => setOpenCharacterSelection(true)}
              />
            </div>
          </div>
        </div>
      </Modal>

      <CharacterSelector
        open={openCharacterSelection}
        onClose={() => setOpenCharacterSelection(false)}
        selected={newChatSelectedCharacters}
        onSelect={(characterId) => {
          let temp = [...newChatSelectedCharacters];

          if (newChatSelectedCharacters.includes(characterId)) {
            temp = temp.filter((one) => one != characterId);
          } else {
            temp.push(characterId);
          }

          setNewChatSelectedCharacters(temp);
        }}
      />
    </div>
  );
}
