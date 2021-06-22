// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// 实验特性，用于支持返回对象数组
pragma experimental ABIEncoderV2;

contract Msg {
    // 消息结构体
    struct message {
        // 发送者
        // 消息ID
        string msgId;
        address from;
        // 接收者
        address to;
        // 是否通过此次消息内容的验证
        bool isvalid;
        // 状态, 是否已读
        bool state;
        // 消息类型, 0, 用户验证消息; 1, 交易买卖消息
        uint256 msgType;
        // 如果消息用于用于验证, 记录验证用户地址
        address validUser;
        // 如果消息用于交易, 记录批次ID和交易信息结构体
        circulationInfo cI;
    }
    struct circulationInfo {
        address fromUser; // 从用户
        address toUser; // 目标用户
        string mark; // 交易描述
        string foodId; // 食品id
        string circulationFileHref; // 交易信息文件地址
    }

    int256 msgQueueLength = 0;
    mapping(int256 => message) msgQueue;

    // 创建用户验证消息
    // function createUserValid(
    //     address from,
    //     address to,
    //     address validUser
    // ) public returns (bool) {
    //     message memory m =
    //         message(
    //             from,
    //             to,
    //             false,
    //             false,
    //             0,
    //             validUser,
    //             circulationInfo(address(0), address(0), "", "", "")
    //         );
    //     msgQueue[msgQueueLength] = m;
    //     msgQueueLength = msgQueueLength + 1;
    //     return true;
    // }

    // 创建交易类型消息
    function createTrade(
        address from,
        address to,
        string memory msgId,
        string memory mark,
        string memory foodId,
        string memory circulationFileHref
    ) public returns (bool) {
        circulationInfo memory c =
            circulationInfo(from, to, mark, foodId, circulationFileHref);
        message memory m = message(msgId, from, to, false, false, 1, address(0), c);
        msgQueue[msgQueueLength] = m;
        msgQueueLength = msgQueueLength + 1;
        return true;
    }

    // 获取我发送的消息
    function msgSend(address user) public view returns (message[] memory) {
        uint256 tempMsgarrLength = 0;
        for (int256 i = 0; i < msgQueueLength; i++) {
            if (msgQueue[i].from == user) {
                tempMsgarrLength = tempMsgarrLength + 1;
            }
        }
        message[] memory m = new message[](tempMsgarrLength);
        uint256 j = 0;
        for (int256 i = 0; i < msgQueueLength; i++) {
            if (msgQueue[i].from == user) {
                m[j] = msgQueue[i];
                j = j + 1;
            }
        }
        return m;
    }

    // 获取我接受的消息
    function msgReceive(address user) public view returns (message[] memory) {
        uint256 tempMsgarrLength = 0;
        for (int256 i = 0; i < msgQueueLength; i++) {
            if (msgQueue[i].to == user) {
                tempMsgarrLength = tempMsgarrLength + 1;
            }
        }
        message[] memory m = new message[](tempMsgarrLength);
        uint256 j = 0;
        for (int256 i = 0; i < msgQueueLength; i++) {
            if (msgQueue[i].to == user) {
                m[j] = msgQueue[i];
                j = j + 1;
            }
        }
        return m;
    }

    function StringCompare(string memory a, string memory b) private pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
    // 消息已读
    function setState(string memory msgId) public {
        for(int256 i = 0; i < msgQueueLength; i++) {
            if (StringCompare(msgQueue[i].msgId, msgId)) {
                msgQueue[i].state = true;
            }
        }
    }
}
