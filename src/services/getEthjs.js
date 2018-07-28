import Web3 from 'web3';
import Eth from 'ethjs';

const eth = new Eth(window.web3.currentProvider);

window.Eth = eth;

export default eth;