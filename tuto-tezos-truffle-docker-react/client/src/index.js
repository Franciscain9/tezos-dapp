
import React, { Fragment ,useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Header from "./QuizComponent/Header";
import Quiz from "./QuizComponent/Quiz";
import * as serviceWorker from "./serviceWorker";

import { Tezos } from "@taquito/taquito";
import { TezBridgeSigner } from "@taquito/tezbridge-signer";
import Menu from "./Menu";

function App() {
  /* PUT HERE THE CONTRACT ADDRESS FOR YOUR OWN SANDBOX! */
  const contractAddress = "KT1VMnVaD6C87DVxVV2bqAim6w3SjSYBQrhn";

  const shortenAddress = addr =>
   addr.slice(0, 6) + "..." + addr.slice(addr.length - 6);

  const mutezToTez = mutez =>
   Math.round((parseInt(mutez) / 1000000 + Number.EPSILON) * 100) / 100;

  const [contractInstance, setContractInstance] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [contractBalance, setContractBalance] = useState(0);
  const tezbridge = window.tezbridge;

  const initWallet = async () => {
    try {
      // sets rpc host
      /*const rpc = await tezbridge.request({
        method: "set_host",
        host: "http://localhost:8732"
      });*/
      // gets user's address
      const _address = await tezbridge.request({ method: "get_source" });
      setUserAddress(_address);
      // gets user's balance
      const _balance = await Tezos.tz.getBalance(_address);
      setBalance(_balance);
      // gets user's points
      const storage = await contractInstance.storage();
      // compares user's address with owner's address
    } catch (error) {
      console.log("error fetching the address or balance:", error);
    }
  };


  useEffect(() => {
    (async () => {
      // sets RPC
      Tezos.setProvider({
        rpc: "http://localhost:8732",
        signer: new TezBridgeSigner()
      });
      // fetches contract storage
      const contract = await Tezos.contract.at(contractAddress);
      setContractInstance(contract);
      const storage = await contract.storage();
      // creates coffee menu
      let coffees = [];
      for (let key of storage.menu.keys()) {
        coffees.push({ name: key, price: storage.menu.get(key).c[0] });
      }
      // updates state
    })();
  }, []);



  return (
    <div className = "App">
      <div className="wallet">
          {balance === undefined ? (
            <button
              className="button is-info is-small"
              onClick={initWallet}
            >
              Connect your wallet
            </button>
          ) : (
            <>
              <span className="balance">ꜩ {balance.toNumber() / 1000000}</span>
              <div className="field is-grouped">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    onClick={async () => {
                      setUserAddress(undefined);
                      setBalance(undefined);
                      await initWallet();
                    }}
                  >
                    {shortenAddress(userAddress)}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

    <Fragment>

      {/* header Components */}
       <center><Header /></center> 

      {/* Quiz Components */}
        <Quiz />
      
    </Fragment> 
    </div>
  )
}

const rootElement = document.getElementById("root");
// reader method for react 
ReactDOM.render(<App />, rootElement);
serviceWorker.unregister();
