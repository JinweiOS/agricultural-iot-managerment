// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// 实验特性，用于支持返回对象数组
pragma experimental ABIEncoderV2;

contract CirculationContract {
    // 流转消息集合
    mapping(string => circulationWrapper) circulationMap;

    struct circulationWrapper {
        uint256 length; // map 长度
        bool exist; // 是否存在
        mapping(uint256 => circulationInfo) arrayMap;
    }

    // 用于创建 circulationWrapper
    uint256 requestNum;
    mapping(uint256 => circulationWrapper) requestWrapper;

    struct circulationInfo {
        address fromUser; // 从用户
        address toUser; // 目标用户
        string mark; // 交易时间
        string foodId; // 食品id
        string circulationFileHref; // 交易信息文件地址
    }

    // 交易信息录入
    function inputInfo(
        address fromUser,
        address toUser,
        string memory mark,
        string memory foodId,
        string memory circulationFileHref,
        string memory batchId
    ) public returns (bool) {
        circulationInfo memory aCirculation =
            circulationInfo(
                fromUser,
                toUser,
                mark,
                foodId,
                circulationFileHref
            );
        if (circulationMap[batchId].exist) {
            circulationMap[batchId].arrayMap[
                circulationMap[batchId].length
            ] = aCirculation;
            circulationMap[batchId].length = circulationMap[batchId].length + 1;
        } else {
            circulationMap[batchId].length = 1;
            circulationMap[batchId].exist = true;
            circulationMap[batchId].arrayMap[0] = aCirculation;
        }
        return true;
    }

    // 交易信息读取
    function getInfo(string memory batchId)
        public
        view
        returns (circulationInfo[] memory)
    {
        circulationWrapper storage cWrap = circulationMap[batchId];
        circulationInfo[] memory cArray = new circulationInfo[](cWrap.length);
        for (uint256 i = 0; i < cWrap.length; i++) {
            circulationInfo storage c = cWrap.arrayMap[i];
            cArray[i] = c;
        }
        return cArray;
    }
}