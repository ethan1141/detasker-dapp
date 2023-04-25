import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import BNavbar from "../components/Navber";
import { links } from "../metadata";

import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, contract, detasker } from "./_app";
import { useAccount, useContractRead } from "wagmi";
import { BigNumber } from "ethers";

import { Item } from "../libs/models/Item";
import { Profile } from "../libs/models/Profile";
import CreateProfile from "../components/CreateProfile";
import Modal from "../components/Modal";
import { NewProfile } from "../libs/models/NewProfile";
import { Detasker } from "../typechain-types";
import Jobs from "./Jobs";
const Home: NextPage = () => {
  const { isDisconnected, address } = useAccount();
  const [addUser, setAddUser] = useState<boolean>(false);
  const [job, setJobs] = useState(-1);
  const [freelancers, setFreelancers] = useState(-1);
  const [userCount, setUserCount] = useState(-1);
  const [profile, setProfile] = useState<Profile>(new Profile());

  useEffect(() => {
    if (detasker) {
      (async () => {
        //@ts-ignore
        setJobs((await detasker.getJobCount()).toNumber() as unknown as Number);
        //@ts-ignore
        setFreelancers(
          //@ts-ignore
          (await detasker.getFreelaneCount()).toNumber() as unknown as Number
        );
        //@ts-ignore
        setUserCount((await detasker.getUserCount()).toNumber() as Number);
        setProfile(
          (await detasker.users(address as "0x")) as unknown as Profile
        );
      })();
    }
    console.log(profile);
  }, [isDisconnected, detasker, address]);

  return (
    <main>
      <Row>
        <Col md>
          <p>Detasker</p>
          <p>{process.env.usp}</p>
        </Col>
      </Row>
      <Row>
        <Col md>
          <h2>Users: {userCount != -1 ? userCount : "Loading..."}</h2>
        </Col>
        <Col md>
          <h2>Jobs: {job != -1 ? job : "Loading..."}</h2>
        </Col>
        <Col md>
          <h2>Freelancers: {freelancers != -1 ? freelancers : "Loading..."}</h2>
        </Col>
      </Row>
      <div>
        {isDisconnected ? (
          <div>
            <p>You are disconnected</p>
          </div>
        ) : profile.id.toNumber() === 0 ? (
          <div>
            <Modal
              show={addUser}
              config={{
                title: "Create a new user",
                before: (
                  <div>
                    <CreateProfile />
                  </div>
                ),
                buttons: [
                  {
                    text: "Add user",
                    onClick() {
                      detasker!
                        .createUser(
                          "0x81e70AAF7475AabA6D919e3A889b6D94C792c8A3",
                          new NewProfile() as unknown as Detasker.NewProfileStruct,
                          {
                            gasLimit: 250000,
                          }
                        )
                        .catch((error) => {
                          console.log(error);
                        });
                    },
                  },
                ],
              }}
              onHide={() => setAddUser(false)}
            />
            <Button onClick={() => setAddUser(true)}>Create a user</Button>
          </div>
        ) : (
          <div>
            <h5>
              Welcome back, {profile.name !== "" ? profile.name : "(no name)"}
            </h5>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
