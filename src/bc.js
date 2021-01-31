import logo from './logo.svg';
import './App.css';
import React from 'react';
import conseiljs , { registerFetch, StoreType, registerLogger, TezosNodeWriter, TezosParameterFormat, TezosConseilClient, Signer,TezosMessageUtils } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';
import * as log from 'loglevel';
import fetch from 'node-fetch';
import { TezosToolkit } from "@taquito/taquito";
import { importKey ,InMemorySigner} from '@taquito/signer';
import { BarChart } from '@material-ui/icons';


//const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';
const tezosNode = 'https://delphinet.smartpy.io';
/*
const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
conseiljs.registerLogger(logger);
conseiljs.registerFetch(fetch);
*/

const conseilServer = { url: 'https://conseil-dev.cryptonomic-infra.tech:443', apiKey: '1a0ae0f4-024a-4c36-8137-de570e6049b7', network: 'delphinet' };

//const contractAddress = 'KT1CYASWVN9T4SAtcpg8PmV5novx5gu6Yzxq';
//KT19AYiWiwKyugrSNyF4x3UMBgNyLChDog4Z

export default class BC{

    constructor(ca){
        this.contractAddress = ca;
    }

  async  SetCandidate(candidate) {
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
    
  
    //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,this.contractAddress, 10000, 100000, '', 1000, 100000)
    const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, this.contractAddress,  0, 100000, 1000, 750000,'set_candidate', `"${candidate}"`, TezosParameterFormat.Michelson);
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
  
  async  VotingFunction(candidate) {
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
    
  
    //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,this.contractAddress, 10000, 100000, '', 1000, 100000)
    const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, this.contractAddress,  0, 100000, 1000, 750000,'vote', `${candidate}`, TezosParameterFormat.Michelson);
    let gi = result.operationGroupID;
    const groupid = gi.replace(/\"/g, '').replace(/\n/, '');
    //console.log(groupid);
    
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
  
  
  async  GetData(candidate) {
    try {
    const Tezos = new TezosToolkit(tezosNode);
    const contract =  await Tezos.contract.at(this.contractAddress)
    const storage =  await contract.storage()
    const details = await storage[candidate]
    return details;
    
    }
    catch(error) {
      console.log(error)}
    }

    async  GetVote() {
        try {
        const Tezos = new TezosToolkit(tezosNode);
        const contract =  await Tezos.contract.at(this.contractAddress)
        const storage =  await contract.storage();
        return storage;
        
        }
        catch(error) {
            console.log(error)
        }
    }
  
  
  
  async  DeployContract() {
    try {
      //importKey("p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1")
      const keystore = {
        publicKey: 'edpku9bsa8hw5obPYut7ES2GF6MWjTvFdAsxuXzoMo6zFXa1KPwp6j',
        privateKey: 'edskRybLHufbQ7rhnq2Dv4cqc6EfLriVM9BmHwB6ToAH3K4kbivJxuaMhwkiJGacEpFbMAfAZrNivPsZ3C6CUC4MR8iBBBeHvS',
        publicKeyHash: 'tz1f3vYsCGhxs1d41Y95Jn2ZoKto1HSJAfcq',
        seed: '',
        storeType: 1
    };
      const Tezos = new TezosToolkit(tezosNode);
      InMemorySigner.fromSecretKey(keystore.privateKey)
        .then((theSigner) => {
          Tezos.setProvider({ signer: theSigner });
          //We can access the public key hash
          return Tezos.signer.publicKeyHash();
        })
        .then((publicKeyHash) => {
          console.log(`The public key hash associated is: ${publicKeyHash}.`);
        })
        .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
      
      
      Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey(keystore.privateKey) });
  
      
      const contractfile = require('./contract.json')
  
      Tezos.contract
        .originate({
          code: contractfile,
          init: { "prim": "Pair", "args": [ { "string": "" }, { "prim": "Pair", "args": [ { "string": "" }, [] ] } ] }
        })
        .then((originationOp) => {
          console.log(`Waiting for confirmation of origination for ${originationOp.this.contractAddress}...`);
          var cAdress = originationOp.this.contractAddress
          return originationOp.contract();
        })
        .then((contract) => {
          console.log(`Origination completed.`);
          
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error)}`));
  
    }
    catch(error) {
      console.log(error)}
    }
  
  
    async  Configure(descs, owners) {
      try {
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
      
    
      //const result = await TezosNodeWriter.sendContractPing(tezosNode,signer, keystore ,this.contractAddress, 10000, 100000, '', 1000, 100000) 
      const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode,signer,keystore, this.contractAddress,  0, 100000, 1000, 750000,'configure', `(Pair "${descs}" "${owners}")`, TezosParameterFormat.Michelson);
    
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
      console.log(error);
      return;
    }
}
}