
import logo from './logo.svg';
import './App.css';
import React from 'react';
import conseiljs , { registerFetch, registerLogger, TezosNodeWriter, TezosParameterFormat, TezosConseilClient, Signer,TezosMessageUtils } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';
import * as log from 'loglevel';
import fetch from 'node-fetch';
import { TezosToolkit } from "@taquito/taquito";

//const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';
const tezosNode = 'https://delphinet.smartpy.io';
/*
const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
conseiljs.registerLogger(logger);
conseiljs.registerFetch(fetch);
*/

const conseilServer = { url: 'https://conseil-dev.cryptonomic-infra.tech:443', apiKey: '1a0ae0f4-024a-4c36-8137-de570e6049b7', network: 'delphinet' };

const contractAddress = 'KT19AYiWiwKyugrSNyF4x3UMBgNyLChDog4Z';




async function SetCandidate(candidate) {
  try {
	console.log(candidate);
  const keystore = {
      publicKey: 'edpku9bsa8hw5obPYut7ES2GF6MWjTvFdAsxuXzoMo6zFXa1KPwp6j',
      privateKey: 'edskRybLHufbQ7rhnq2Dv4cqc6EfLriVM9BmHwB6ToAH3K4kbivJxuaMhwkiJGacEpFbMAfAZrNivPsZ3C6CUC4MR8iBBBeHvS',
      publicKeyHash: 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq',
      seed: '',
      storeType: 1
  };
  
  // KT1LUUBgMyNXctxbNpicznoVqhC7en8b3m9V
 //const signer = 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq';
 

 
  const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keystore.privateKey, 'edsk'),-1);
  

  //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,contractAddress, 10000, 100000, '', 1000, 100000)
  const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, contractAddress,  0, 100000, 1000, 750000,'set_candidate', `"${candidate}"`, TezosParameterFormat.Michelson);
  let gi = result.operationGroupID;
  const groupid = gi.replace(/\"/g, '').replace(/\n/, '');
  
  await TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, 31);

  console.log(`Injected operation group id ${gi}`);
  console.log(result)
  //
  //finishit("Data inserted successfully in blockchain. Reference id:"+result.operationGroupID);
  return gi;

}

catch(error) {
  console.log(error)}
}

async function VotingFunction(candidate) {
  try {

	console.log(candidate);
  const keystore = {
      publicKey: 'edpku9bsa8hw5obPYut7ES2GF6MWjTvFdAsxuXzoMo6zFXa1KPwp6j',
      privateKey: 'edskRybLHufbQ7rhnq2Dv4cqc6EfLriVM9BmHwB6ToAH3K4kbivJxuaMhwkiJGacEpFbMAfAZrNivPsZ3C6CUC4MR8iBBBeHvS',
      publicKeyHash: 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq',
      seed: '',
      storeType: 1
  };
  // KT1LUUBgMyNXctxbNpicznoVqhC7en8b3m9V
 //const signer = 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq';
 
  const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keystore.privateKey, 'edsk'),-1);
  

  //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,contractAddress, 10000, 100000, '', 1000, 100000)
  const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, contractAddress,  0, 100000, 1000, 750000,'vote', `"${candidate}"`, TezosParameterFormat.Michelson);
  let gi = result.operationGroupID;
  const groupid = gi.replace(/\"/g, '').replace(/\n/, '');
  
  await TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, 31);

  console.log(`Injected operation group id ${gi}`);
  console.log(result)
  //
  //finishit("Data inserted successfully in blockchain. Reference id:"+result.operationGroupID);
  return gi;
}

catch(error) {
  console.log(error)}
}


async function GetData(candidate) {
  try {
  const Tezos = new TezosToolkit(tezosNode);
  const contract =  await Tezos.contract.at(contractAddress)
  const storage =  await contract.storage()
  const details = await storage.get(candidate)
  console.log(details['c'])
  
  }
  catch(error) {
    console.log(error)}
  }

/*function httpGet() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", 'https://delphinet.smartpy.io/chains/main/blocks/head/context/contracts/KT1FGXfNQqtaCbvyxUYhmedwr4rWuKubv2sA/storage', false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(JSON.parse(xmlHttp.responseText));
}
*/


function App() {
 // httpGet()
  return (
    <div className="App">
      <header className="App-header">
        <h4 className="headerName">Voting Application</h4>
      </header>

      <div className="container">
        <h1>Welcome, you can vote for your favourite cryptocurrency</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
            <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => SetCandidate("Bitcoin")}>
                  Add bitcoin to the list
                </button>
              <br/>
              <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => VotingFunction("Bitcoin")}>
                  Vote for Bitcoin
                </button>
              <br/>
              <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => GetData('Bitcoin')}>
                  Get Data Bitcoin
                </button>
            <br/>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
            <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => SetCandidate("Ethereum")}>
                  Add Ethereum to the list
                </button>
              <br/>
              <br/>
                <button className="button" onClick={() => VotingFunction("Ethereum")}>
                  Vote for Ethereum
                </button>
              <br/>
              <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => GetData('Ethereum')}>
                  Get Data Ethereum
                </button>
            <br/>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
            <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => SetCandidate("Tezos")}>
                  Add Tezos to the list
                </button>
              <br/>
              <br/>
                <button className="button" onClick={() => VotingFunction("Tezos")}>
                  Vote for Tezos
                </button>
              <br/>
              <br/>
                <button img src="./img/bitcoin.png" className="col" onClick={() => GetData('Tezos')}>
                  Get Data Tezos
                </button>
            <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;