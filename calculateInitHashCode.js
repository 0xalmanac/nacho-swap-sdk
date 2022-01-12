const factory = require('./src/abis/UniswapV2Pair.json');
const solidity = require('@ethersproject/solidity');

const COMPUTED_INIT_CODE_HASH = solidity.keccak256(['bytes'], [factory.bytecode])
console.log(COMPUTED_INIT_CODE_HASH);

const address = require('@ethersproject/address');

const tokens1address = "0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2";
const tokens0address = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";

const pairAddress = address.getCreate2Address("0x43fC699B8588BeEB1e05027461b0030235a546bd", solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens0address, tokens1address])]), "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f");

console.log(pairAddress);
