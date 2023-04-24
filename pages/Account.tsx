import { useState } from "react";
import { Detasker } from "../typechain-types";

import { Detasker__factory } from "../typechain-types";
import Profile from "../components/Profile";
import { BigNumber } from "ethers";

export default function Account() {
  const [profile, setProfile] = useState<Detasker.NewProfileStruct>({
    name: "",
    email: "",
    image:
      "https://cdn.pixabay.com/photo/2023/04/13/14/05/lotus-7922612_1280.jpg",
    freelance: {
      id: 0,
      isFreelancer: false,
      active: false,
      mainSkills: "",
      skillsId: [],
    },
    socials: [],
    showcaseWork: [],
    skills: [],
  });
  return (
    <div>
      <Profile profile={profile} />
    </div>
  );
}
