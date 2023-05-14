import { useCallback, useEffect, useState } from "react";
import Job from "../components/Job";
import Modal from "../components/Modal";
import { Job as Jobm } from "../libs/models/Job";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { detasker, signer } from "./_app";
import { erc20ABI, useAccount } from "wagmi";
import { Detasker } from "../typechain-types";
import { GASS_FEE, erc20Abi, zeroAddress } from "../libs/Helper";
import Web3 from "web3";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils.js";
import { toast } from "react-toastify";

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
        //@ts-ignore
        const c = (await detasker!.getJobCount()).toNumber();
        for (let index = 0; index < c; index++) {
          //@ts-ignore
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
          before: <Job job={job} setJob={(e) => setJob({ ...e })} />,
          buttons: [
            {
              text: "Create job",
              variant: "success",
              onClick() {
                (async () => {
                  const create = await detasker!.createJob(
                    address as unknown as "0x",
                    job as unknown as Detasker.JobStruct,
                    {
                      gasLimit: GASS_FEE,
                    }
                  );
                  create.wait(4);
                  toast("You created a job");
                  setJobs([...jobs, job]);
                  setJob(new Jobm());
                  SetShowAddJobs(false);
                })();
              },
            },
          ],
        }}
        show={showAddJob}
        onHide={() => SetShowAddJobs(false)}
      />
      <Button className="my-3" onClick={() => SetShowAddJobs(true)}>
        Add a job
      </Button>
      <h2>Jobs</h2>
      {jobs.map((j) => (
        <JobAccordion job={j} key={"job" + j.id} />
      ))}
    </div>
  );
}

function JobAccordion(props: { job: Jobm }) {
  const [symbol, setSymbol] = useState("");
  const getTokenSymbol = useCallback(async (cotract: string) => {
    let symbol = "";
    const contract = new ethers.Contract(cotract, erc20Abi, signer);
    if (isAddress(cotract) && cotract !== zeroAddress) {
      symbol = await contract.symbol();
    }
    return symbol;
  }, []);
  useEffect(() => {
    getTokenSymbol(props.job.token).then((e) => setSymbol(e));
  }, [props.job]);
  return (
    <Accordion>
      <Accordion.Header>
        <Row className="w-100">
          <Col md={10}>
            <h3 key={props.job.title}>
              {props.job.title == "" ? "no title" : props.job.title}
            </h3>
          </Col>
          <Col md={2}>
            <p>
              {new Date(
                props.job.datePublished.toNumber()
              ).toLocaleDateString()}
            </p>
          </Col>
        </Row>
      </Accordion.Header>
      <Accordion.Body>
        <p>{props.job.description}</p>
        <Row>
          <Col md></Col>
          {ethers.utils.formatEther(
            props.job.requestedPaymentAmount.toString()
          )}
          {" " + symbol}
          <Col md>
            <Button href={"/job/view/" + props.job.id} className="w-100">
              Vew job
            </Button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion>
  );
}
