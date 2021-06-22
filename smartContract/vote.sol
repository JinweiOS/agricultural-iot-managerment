// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Trace {
    function test(string memory a, string memory b) public pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}
