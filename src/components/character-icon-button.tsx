/* eslint-disable @next/next/no-img-element */
import CHARACTERS from "@/datas/characters";
import classNames from "classnames";
import { Tooltip } from "./tooltip";

interface CharacterIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  characterId: string;
}

const CharacterIconButton: React.FC<CharacterIconButtonProps> = ({
  className,
  characterId,
  ...props
}) => {
  let character = CHARACTERS.find((one) => one.id === characterId);

  return (
    <Tooltip
      label={
        <span className="flex items-center bg-black/50 text-white text-sm py-2 px-2 rounded-xl shadow-lg">
          {character?.names.kr}
        </span>
      }
      placement="bottom"
    >
      <button type="button" className={classNames(className)} {...props}>
        <img
          alt={characterId}
          src={character?.icon ?? ""}
          className="rounded-full"
        />
      </button>
    </Tooltip>
  );
};

export default CharacterIconButton;
