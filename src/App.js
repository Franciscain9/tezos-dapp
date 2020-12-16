
import logo from './logo.svg';
import './App.css';
import React from 'react';
import conseiljs , {ConseilQueryBuilder,ConseilOperator,ConseilDataClient, ConseilSortDirection, registerFetch, registerLogger, TezosNodeWriter, TezosParameterFormat, TezosConseilClient, Signer,TezosMessageUtils } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';

//const signer = await SoftSigner.createSigner(conseiljs.TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),-1);


//const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';
const tezosNode = 'https://delphinet.smartpy.io';

async function VotingFunction(candidate) {
	console.log(candidate);
  const keystore = {
      publicKey: 'edpku9bsa8hw5obPYut7ES2GF6MWjTvFdAsxuXzoMo6zFXa1KPwp6j',
      privateKey: 'edskRybLHufbQ7rhnq2Dv4cqc6EfLriVM9BmHwB6ToAH3K4kbivJxuaMhwkiJGacEpFbMAfAZrNivPsZ3C6CUC4MR8iBBBeHvS',
      publicKeyHash: 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq',
      seed: '',
      storeType: 1
  };
  const contractAddress = 'KT1FGXfNQqtaCbvyxUYhmedwr4rWuKubv2sA';
 //const signer = 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq';
 
  const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keystore.privateKey, 'edsk'),-1);
  

  //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,contractAddress, 10000, 100000, '', 1000, 100000)
  const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, contractAddress,  0, 100000, 1000, 750000,'', `"${candidate}"`, TezosParameterFormat.Michelson);
  
  console.log(`Injected operation group id ${result.operationGroupID}`);
  //
  //finishit("Data inserted successfully in blockchain. Reference id:"+result.operationGroupID);
  return result.operationGroupID;
}


const faucetAccount1 = {
  "mnemonic": [
    "people",
    "sock",
    "bachelor",
    "frost",
    "profit",
    "please",
    "once",
    "pelican",
    "pretty",
    "diagram",
    "rich",
    "detect",
    "husband",
    "broken",
    "bright"] ,
  "secret": "1de0ce4e135a5fa1608b8b426704fda1e03874d5",
  "amount": "38016137429",
  "pkh": "tz1NaDZMNpWhSvPeMCC1ABYzbhe8UPjBtqER",
  "password": "XwIDLnUKaE",
  "email": "icniupdw.nhmvkmcv@tezos.example.org"
}

const faucetAccount2 = {
  "mnemonic": [
    "betray",
    "burden",
    "siege",
    "sleep",
    "open",
    "brass",
    "father",
    "elegant",
    "impact",
    "soul",
    "ozone",
    "network",
    "urban",
    "summer",
    "cage"
  ],
  "secret": "a54a81eb8303f3f5b63031199bd7d9c04336be18",
  "amount": "36167731412",
  "pkh": "tz1RMEMgp2SJ5KDKFWwBwAapE36MzgiFwwSM",
  "password": "Yom8U0GMZd",
  "email": "mzlbhahz.ftndgscd@tezos.example.org"
}


async function initAccount(faucetAccount) {
  //console.log(candidate);
  const keyStore = await KeyStoreUtils.restoreIdentityFromFundraiser(faucetAccount.mnemonic.join(' '), faucetAccount.email, faucetAccount.password, faucetAccount.pkh);
  console.log(`public key: ${keyStore.publicKey}`);
  console.log(`secret key: ${keyStore.secretKey}`);
  return new Promise((resolve, reject) => {
    resolve(keyStore)
  })
}

async function activateAccount(faucetAccount) {
  const keyStore = await initAccount(faucetAccount)
  console.log(keyStore)
  //const keystore = {
  //    publicKey: 'edpkvQtuhdZQmjdjVfaY9Kf4hHfrRJYugaJErkCGvV3ER1S7XWsrrj',
  //    secretKey: 'edskRgu8wHxjwayvnmpLDDijzD3VZDoAH7ZLqJWuG4zg7LbxmSWZWhtkSyM5Uby41rGfsBGk4iPKWHSDniFyCRv3j7YFCknyHH',
  //    publicKeyHash: 'tz1QSHaKpTFhgHLbqinyYRjxD5sLcbfbzhxy',
  //    seed: '',
  //    storeType: conseiljs.KeyStoreType.Fundraiser
  //};

  const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),-1);
  console.log(signer);
  const result = await TezosNodeWriter.sendIdentityActivationOperation(tezosNode, signer, keyStore, faucetAccount.secret);
  console.log(`Injected operation group id ${result.operationGroupID}`)

  return result;
}

async function revealAccount(faucetAccount) {

  const keyStore = await initAccount(faucetAccount);

  const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),-1);
  const result = await TezosNodeWriter.sendKeyRevealOperation(tezosNode, signer, keyStore);
  console.log(`Injected operation group id ${result.operationGroupID}`);
}

async function getBalance(address) {

  const conseilServer = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: '1a0ae0f4-024a-4c36-8137-de570e6049b7',
    network: 'delphinet'
 };

 const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';
 let query = ConseilQueryBuilder.blankQuery();
 query = ConseilQueryBuilder.addFields(query, 'balance', 'account_id');
 query = ConseilQueryBuilder.addPredicate(query, 'account_id', ConseilOperator.EQ, [address]);
 //query = ConseilQueryBuilder.addOrdering(query, "balance", ConseilSortDirection.DESC);
 query = ConseilQueryBuilder.setLimit(query, 1);
 let result = await ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'accounts', query);
 console.log(result)
 return result


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
        <h4 className="headerName">Quiz Application</h4>
      </header>

      <div className="container">
        <h1>Welcome, you can vote for your favourite candidate here.</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <button className="col" onClick={() => activateAccount(faucetAccount2)}>
                Init and Activate account Modi
              </button>
            </div>
          </div>
          <div className="card-body">
              <button className="col" onClick={() => revealAccount(faucetAccount2)}>
                Reveal account Modi
              </button>
            </div>
          </div>
          <div className="card">
              <div className="card-body">
              
              <button className="col" onClick={() => getBalance(faucetAccount2.pkh)}>
                Get balance Modi
              </button>
            </div>
          </div> 
        </div>
      </div>
  );
}

export default App;