import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export default function Avatar({ seed = "John Doe", size = 128 }) {
  const avatar = useMemo(() => {
    return createAvatar(avataaars, {
      seed,
      size: size,
      radius: 50,
      backgroundColor: ["b6e3f4", "d1d4f9", "ffd5dc", "ffdfbf"],
      facialHairProbability: 20,
      facialHair: ["beardLight", "beardMedium"],
      facialHairColor: ["2c1b18"],
    }).toDataUri();
  }, [seed]);

  return <img src={avatar} alt="Avatar" />;
}
