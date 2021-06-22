// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// 实验特性，用于支持返回对象数组
pragma experimental ABIEncoderV2;

contract FoodStore {
    // 产品信息存储map
    uint256 foodArrLength = 0;
    mapping(uint256 => foodInfo) foodMap;
    // 产品所属信息存储map
    mapping(address => owerShip) owershipMap;
    struct owerShip {
        bool exsit;
        string foodIds; // , 号分割的食品id字符串
    }

    struct foodInfo {
        string owner; // 农产品所属用户
        string foodName; // 产品名
        string images; // 产品照片
        string advertiseSlogan; // 广告语
        string eatMethods; // 食用方法
        string location; // 产地介绍
        string processFlow; // 工艺流程
        string storageCondition; // 贮藏条件
        string afterSalesService; // 售后服务
        string priceDescription; // 价格说明
        string detailFoodFileHref; // 农产品详细信息文件存储地址
        string foodId; // 产品Id
        bool exist;
    }

    function store(
        string memory user,
        string memory foodId,
        string memory foodName,
        string memory images, // 图片, 逗号分隔
        string memory advertiseSlogan,
        string memory eatMethods,
        string memory location,
        string memory processFlow,
        string memory storageCondition,
        string memory afterSalesService,
        string memory priceDescription,
        string memory detailFoodFileHref
    ) public returns (bool) {
        foodInfo memory aFood =
            foodInfo(
                user,
                foodName,
                images,
                advertiseSlogan,
                eatMethods,
                location,
                processFlow,
                storageCondition,
                afterSalesService,
                priceDescription,
                detailFoodFileHref,
                foodId,
                true
            );
        foodMap[foodArrLength] = aFood;
        foodArrLength = foodArrLength + 1;
        return true;
    }

    function getFoodInfo(string memory foodId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        foodInfo memory fi;
        for (uint256 i = 0; i < foodArrLength; i++) {
            if (
                StringCompare(foodMap[i].foodId, foodId)
            ) {
                fi = foodMap[i];
            }
        }
        return (
            fi.owner,
            foodId,
            fi.images,
            fi.foodName,
            fi.eatMethods,
            fi.detailFoodFileHref,
            fi.location,
            fi.priceDescription,
            fi.processFlow,
            fi.storageCondition,
            fi.afterSalesService
        );
    }

    function StringCompare(string memory a, string memory b) private pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    // 食品id构成的字符串，用逗号分隔
    function inputFoodOwnerInfo(string memory foodIds, address user) public {
        if (owershipMap[user].exsit) {
            owershipMap[user].foodIds = foodIds;
        } else {
            owershipMap[user].foodIds = foodIds;
            owershipMap[user].exsit = true;
        }
    }

    // 查询某一个供应商的所有可供商品
    function getOwerFoodInfo(address user) public view returns (string memory) {
        return owershipMap[user].foodIds;
    }

    // 获取所有农产品
    function getAllFoods() public view returns (foodInfo[] memory) {
        foodInfo[] memory temp = new foodInfo[](foodArrLength);
        for(uint256 i = 0; i < foodArrLength; i++) {
            temp[i] = foodMap[i];
        }
        return temp;
    }
}
