// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// 实验特性，用于支持返回对象数组
pragma experimental ABIEncoderV2;

contract UserManager {
    uint256 userArrayLength = 0;
    mapping(uint256 => userInfo) users;

    // 所有用户数组

    struct userInfo {
        address user; // 角色账户地址
        string name; // 角色名称
        string date; // 审核后入驻日期
        string location; // 厂商详细地址
        string desc; // 厂商描述
        string reviewFileHref; // 审核文件地址
        bool exist; // 标志位, 用于判断map是否为空
        string review; // 审核状态, null, wait, finish
        uint256 role; // 用户角色
    }

    // 判断是否是某种合法角色
    function isAKindRole(address user) public view returns (uint256) {
        for (uint256 i = 0; i < userArrayLength; i++) {
            userInfo memory m = users[i];
            if (m.user == user) {
                return m.role;
            }
        }
        return 5;
    }

    // 录入用户信息
    function inputUserInfo(
        address user,
        uint256 role,
        string memory name,
        string memory date,
        string memory location,
        string memory desc,
        string memory reviewFileHref,
        string memory review
    ) public returns (bool) {
        userInfo memory aUser =
            userInfo(
                user,
                name,
                date,
                location,
                desc,
                reviewFileHref,
                true,
                review,
                role
            );
        users[userArrayLength] = aUser;
        userArrayLength = userArrayLength + 1;
        return true;
    }

    // 获取用户详细信息
    function getUserInfo(address user)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory
        )
    {
        userInfo memory aUser;
        for (uint256 i = 0; i < userArrayLength; i++) {
            userInfo memory m = users[i];
            if (m.user == user) {
                aUser = m;
            }
        }
        return (
            aUser.user,
            aUser.name,
            aUser.date,
            aUser.desc,
            aUser.location,
            aUser.reviewFileHref,
            aUser.role,
            aUser.review
        );
    }

    function getAllUserInfo() public view returns (userInfo[] memory) {
        userInfo[] memory temp = new userInfo[](userArrayLength);
        for (uint256 i = 0; i < userArrayLength; i++) {
            temp[i] = users[i];
        }
        return temp;
    }

    function comfirmAdd(address user) public returns (bool) {
        for (uint256 i = 0; i < userArrayLength; i++) {
            userInfo memory m = users[i];
            if (m.user == user) {
                users[i].review = "finish";
            }
        }
        return true;
    }
}
