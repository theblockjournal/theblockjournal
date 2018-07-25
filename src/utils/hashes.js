const createKeccakHash = require('keccak');

export function keccak256Hex(str) {
    let hash = createKeccakHash('keccak256').update(str).digest('hex');
    return `0x${hash}`;
}