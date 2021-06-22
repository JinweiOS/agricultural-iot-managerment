// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// 实验特性，用于支持返回对象数组
pragma experimental ABIEncoderV2;

contract TradeContract {
    // 通过事件通知卖家（买家是谁，需要什么农产品，合同文件地址）
    event byEvent(address buyer, string foodId, string circulationFileHref);

    // 买动作函数
    function buy(string memory foodId, string memory circulationFileHref) public {
        // TODO: 向同新合约写入买消息
        emit byEvent(msg.sender, foodId, circulationFileHref);
    }

    // 卖事件
    event sallEvent(address saller, string foodId, string circulationFileHref, string mark);

    // 卖动作
    function sall(string memory foodId, string memory circulationFileHref, string memory mark) public {
        emit sallEvent(msg.sender, foodId, circulationFileHref, mark);
    }

    // 买方确认收到事件
    event comfirmEvent(address user, string foodId, string circulationFileHref, string mark);

    // 买房确认收到函数
    function comfirm(string memory foodId, string memory circulationFileHref, string memory mark) public {
        emit comfirmEvent(msg.sender, foodId, circulationFileHref, mark);
    }
}
