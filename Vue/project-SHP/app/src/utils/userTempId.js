import { nanoid } from "nanoid";

export const getUserTempId = () => {
    let userTempId = localStorage.getItem("userTempId");

    // 判断用户临时ID是否已经存在
    if (!userTempId) {
        // 若不存在，则生成一个NanoID作为用户临时ID
        userTempId = nanoid();
        // 将用户临时ID存储于本地
        localStorage.setItem("userTempId", userTempId);
    }

    // 返回用户临时ID
    return userTempId;
}