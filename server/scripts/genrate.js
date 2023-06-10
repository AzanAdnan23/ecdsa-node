const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);


const temp = publicKey.slice(1, publicKey.length);

const hash = keccak256(temp);



console.log("Private Key: ", toHex(privateKey));
console.log("Public Key: ", toHex(publicKey));
console.log("Address: ", "0x" + toHex(hash.slice(-20)));
