export default interface Character {
  id: string;
  names: {
    [key in "kr" | "en" | "jp" | "cn"]?: string;
  };
  statusMessages: {
    [key in "kr" | "en" | "jp" | "cn"]?: string;
  };
  icon: string;
  type:
    | "Physical"
    | "Fire"
    | "Ice"
    | "Lightning"
    | "Wind"
    | "Quantum"
    | "Imaginary";
  path:
    | "Destruction"
    | "Hunt"
    | "Erudition"
    | "Harmony"
    | "Nihility"
    | "Preservation"
    | "Abundance";
  rarity: 5 | 4;
}
