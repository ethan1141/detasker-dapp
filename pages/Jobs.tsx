import { useEffect, useState } from "react";
import Job from "../components/Job";
import Modal from "../components/Modal";
import Text from "../components/Text";
import { Job as Jobm } from "../libs/models/Job";
import { Button } from "react-bootstrap";
import { detasker } from "./_app";
import { useAccount } from "wagmi";
import { Detasker } from "../typechain-types";
import { ethers } from "ethers";
import { log } from "console";

export default function Jobs() {
  const { address, isDisconnected } = useAccount();
  const [userCount, setUserCount] = useState(-1);
  const [jobCount, setJobCount] = useState(-1);
  const [showAddJob, SetShowAddJobs] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Jobm[]>([]);
  const [job, setJob] = useState<Jobm>(new Jobm());
  console.log(address!, job as unknown as Detasker.JobStruct);

  useEffect(() => {
    if (!isDisconnected && detasker) {
      (async () => {
        setUserCount((await detasker!.getUserCount()).toNumber());
        const c = (await detasker!.getJobCount()).toNumber();
        for (let index = 0; index < c; index++) {
          jobs.push(await detasker["getJobById(uint256)"](index));
        }
        setJobCount(c);
        console.log(c);
      })();
    }
  }, [isDisconnected]);

  return (
    <div>
      <Modal
        config={{
          title: "Add a job",
          before: <Job job={job} />,
          buttons: [
            {
              text: "Create job",
              variant: "success",
              onClick() {
                (async () => {
                  await detasker!.createJob(
                    address as unknown as "0x",
                    job as unknown as Detasker.JobStruct,
                    {
                      gasLimit: 1,
                    }
                  );
                })();
              },
            },
          ],
        }}
        show={showAddJob}
        onHide={() => SetShowAddJobs(false)}
      />
      <Button onClick={() => SetShowAddJobs(true)}>Add a job</Button>
      <h2>Jos</h2>
      {jobs.map((j) => (
        <p>{j.title == "" ? "no title" : j.title}</p>
      ))}
    </div>
  );
}
