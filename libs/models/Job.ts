import { BigNumber, ethers } from "ethers";

export class Job {
  id: BigNumber = BigNumber.from("0");
  hasFunds: boolean = false;
  profileId: BigNumber = BigNumber.from("0");
  title: string = "";
  description: string = "";
  documents: string[] = [];
  owner: string = "0x0000000000000000000000000000000000000000";
  requester: string = "0x0000000000000000000000000000000000000000";
  date: BigNumber = BigNumber.from(new Date().getTime());
  datePaid: BigNumber = BigNumber.from("0");
  img: string[] = [];
  requestedPaymentAmount: BigNumber = BigNumber.from("0");
  token: string = "0x0c3B237C653C2995C8791Ac9e3276E6A23eCE47b";
  tags: string[] = [];
  publish: boolean = false;
  completed: boolean = false;
  changed: boolean = false;
  paid: boolean = false;
  assigned: boolean = false;
  dateCompleted: BigNumber = BigNumber.from("0");
  postedDate: BigNumber = BigNumber.from(new Date().getTime());
  datePublished: BigNumber = BigNumber.from(new Date().getTime());
  dispute: string[] = [];
  deleted: boolean = false;
}
