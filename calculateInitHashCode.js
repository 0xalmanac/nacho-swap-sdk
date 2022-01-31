const factory = require('./src/abis/UniswapV2Pair.json');
const solidity = require('@ethersproject/solidity');

const COMPUTED_INIT_CODE_HASH = solidity.keccak256(['bytes'], [factory.bytecode])
console.log(COMPUTED_INIT_CODE_HASH);

const address = require('@ethersproject/address');

const tokens1address = "0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2";
const tokens0address = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

const pairAddress = address.getCreate2Address("0x758D44fD168861128BeF6C4699950a911d05986b", solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens0address, tokens1address])]), COMPUTED_INIT_CODE_HASH);

console.log(pairAddress);
