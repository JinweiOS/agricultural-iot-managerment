// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract BatchFlow {
    // key 由用户 address+foodId 构成
    mapping(string=>string) batch;

    function store(string memory addressFoodId, string memory batchId) public {
        batch[addressFoodId] = batchId;
    }

    function getBatch(string memory addressFoodId) public view returns(string memory) {
        return batch[addressFoodId];
    }
}