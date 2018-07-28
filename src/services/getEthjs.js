import Web3 from 'web3';
import Eth from 'ethjs';

let eth;

if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
  eth = new Eth(window.web3.currentProvider);
} else {
  let provider = new Eth.HttpProvider('https://rinkeby.infura.io/v3/220fd5019950440f8be4d303eb3a74e6');
  eth = new Eth(provider);
}

window.Eth = eth;

export default eth;