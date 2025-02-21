import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import '@farcaster/auth-kit/styles.css';
import { useSignInMessage, useSignIn, QRCode, AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'fetch.wallet',
  siweUri: 'https://fetch.wallet/login',
};
const configs = {
  apiKey: "kdZCobuctiRJjmfRqSNeCwN6ygEiFJBO",
  network: Network.BASE_MAINNET,
};

function App() {
  const [count, setCount] = useState(0)
  const {
    signIn,
    url,
  } = useSignIn({
    onSuccess: ({ fid }) => console.log('Your fid:', fid),
  });
  const { message, signature } = useSignInMessage();
  return (
    <>
    <div>
      <p>You signed: {message}</p>
      <p>Your signature: {signature}</p>
    </div>
      <div>
      <button onClick={signIn}>Sign In</button>
      {url && (
        <span>
          Scan this: <QRCode uri={url} />
        </span>
      )}
      {`Hello,`}
    </div>
            <AuthKitProvider config={config}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform:"translate(-50%,-50%)", display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{fontFamily:"poppins,sans-serif", fontSize: "40px", fontWeight:"lighter", marginBottom:"10px"}}>Fetch.wallet</div>
          <SignInButton />
        </div>
        <div style={{ paddingTop: "28vh", textAlign: "center" }}>
          
       <Profile/>
          
        </div>
      </AuthKitProvider>
   
      
     
    </>
  )
}


async function postMessages(data) {
  //console.log(data);
  
  //Warp.postMessage(data);



const alchemy = new Alchemy(configs);

// Address we want get NFT mints from
const toAddress = "0x9d5a212fa241416dd74a5bcac8057446c629e097";

const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  toAddress: toAddress,
  excludeZeroValue: true,
  category: ["erc20"],
});

console.log(res);
}
function Profile() {
  const profile = useProfile();
  const {
    isAuthenticated,
    profile: { fid, displayName, custody, username },
  } = profile;

  return (
    <>
              <button className='_1n3pr301' id="back-hbutton" onClick={()=>{postMessages(username)}} >Go Back</button>

      {isAuthenticated ? (
        <div>
          <p style={{fontFamily:"poppins,sans-serif", fontSize: "15px", fontWeight:"lighter"}}>
            Hello, {displayName}! Your FID is {fid}.
          </p>
          <div style={{ position: "absolute", bottom: "22%", left: "50%", transform:"translate(-50%,-50%)", display:"flex", flexDirection:"column", alignItems:"center" }}> 
          <button className='_1n3pr301' id="back-button" onClick={()=>{postMessages(username)}} >Go Back</button>
          </div>
         
      
        </div>
      ) : (
        <p style={{fontFamily:"poppins,sans-serif", fontSize: "15px", fontWeight:"lighter"}}>
          Click the "Sign in with Farcaster" button above, then scan the QR code
          to sign in.
        </p>
      )}
    </>
  );
}


export default App
