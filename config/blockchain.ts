import fs from 'fs';
import { promisify } from 'util';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

const readFile = promisify(fs.readFile);

export const provider = new Web3.providers.HttpProvider('http://localhost:9545');

export const web3 = new Web3(provider);

export async function getStorageContract() {
    const json = await readFile('./build/contracts/SimpleStorage.json', { encoding: 'utf8' });
    const storageContract = TruffleContract(JSON.parse(json));
    storageContract.setProvider(provider);
    return storageContract;
}

export async function getStorageContractInstance() {
    const contract = await getStorageContract();
    return contract.deployed();
}

export async function getEthAccounts() {
    return web3.eth.getAccounts();
}