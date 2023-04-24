import { useState } from "react";
import { NewProfile } from "../libs/models/NewProfile";
import Text from "./Text";
import { setProperty } from "../libs/Helper";
import Freelance from "./Freelance";
import Social from "./Social";

export default function CreateProfile() {
  const [user, setUser] = useState<NewProfile>(new NewProfile());
  return (
    <div>
      <Text
        label="Name"
        required
        onChange={(e) =>
          setUser({ ...setProperty("name", user, e.target.value) })
        }
        label2="Email"
        onChange2={(e) =>
          setUser({ ...setProperty("email", user, e.target.value) })
        }
      />
      <h3>Freelance</h3>
      <Freelance />
      <h3>Social media/s</h3>
      <Social />
    </div>
  );
}
