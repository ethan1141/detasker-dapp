import { log } from "console";
import { PromiseOrValue } from "../typechain-types/common";
export function getString(a: PromiseOrValue<string>) {
  console.log("N");
  console.log(a);

  let str = "";
  (async () => {
    return await a;
  })();
  return str;
}
export function setProperty(
  key: string | string[],
  obj: any,
  value: any,
  disableChanged = false,
  type: string = ""
): any {
  let o = obj;
  // console.log('caller ');
  // console.log(typeof key);
  // console.log(key);
  // console.log(Array.isArray(key));
  switch (type) {
    case "int":
      value = parseInt(value);
      break;
    case "float":
      value = parseFloat(value);
      break;
    default:
      break;
  }
  if (typeof key === "string" && o[key] != value) {
    if (!disableChanged) {
      o.changed = true;
    }
    // console.log('setting ' + key);
    // console.log('setting ' + o.changed);

    o[key] = value;
    // console.log('is a');
  } else if (Array.isArray(key)) {
    console.log(key.length);

    if (key.length > 1) {
      const e = key.shift();
      // console.log(o);
      if (e !== undefined) {
        // console.log(key);
        // console.log(o[e]);
        setProperty(key, o[e], value, disableChanged, type);
      }
    } else {
      // console.log(o);
      if (!disableChanged) {
        o.changed = true;
      }
      o[key[0]] = value;
    }
  } else {
    if (!disableChanged) {
      o.changed = true;
    }
    // console.log(typeof key);
  }
  console.log(o);

  return o;
}

export const GASS_FEE = 2100000;

export const zeroAddress = "0x0000000000000000000000000000000000000000";

export let erc20Abi = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// async function getGreenFieldBucketInfo(bucketName: string) {
//   const rpcClient = await makeRpcClient(
//     "https://gnfd-testnet-sp-1.bnbchain.org"
//   );

//   const rpc = new storageQueryClientImpl(rpcClient);
//   const bucketInfoRes = await rpc.HeadBucket({
//     bucketName,
//   });

//   const bucketId = bucketInfoRes?.bucketInfo?.id;
//   if (!bucketId) throw new Error("no such bucket");

//   return await rpc.HeadBucketById({
//     bucketId,
//   });
