import { useState, useRef } from "react";
import { ethers } from "ethers";

export default async function SignMessageInput(message){
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    console.log(err.message);
  }
};


// export default function SignMessageInput(inputMessage) {
//   const [signatures, setSignatures] = useState([]);

//   const handleSign = async (e) => {
//     e.preventDefault();
//     const sig = await signMessage({
//       message: inputMessage
//     });
//     if (sig) {
//       setSignatures([...signatures, sig]);
//     }
//   };

// }
