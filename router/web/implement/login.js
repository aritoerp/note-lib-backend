const axios = require("axios");
const md5Hash = require("../../../utils/md5Hash");

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        let data = JSON.stringify({
            "secret": process.env.LIB_SECRET,
            "language": "v",
            "userName": username,
            "password": md5Hash(password)
        });

        let loginConfig = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${process.env.API_HOST}/Login`,
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        };

        const response = await axios.request(loginConfig);
        if (response.data?.code !== 200) {
            return res.json({
                "code": response.data?.code || 500,
                "messageCode": "",
                "messageText": response.data?.msg || "Lỗi không xác định"
            });
        }

        let accessToken = response.data?.access_token;
        if (!accessToken) {
            return res.json({
                "code": 500,
                "messageCode": "",
                "messageText": "Không tìm thấy access token"
            });
        }

        // Gọi API để lấy thông tin người dùng
        let userInfoConfig = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${process.env.API_HOST}/User/Me`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                "memvars": {
                }
            }
        };
        const userInfoResponse = await axios.request(userInfoConfig);
        if (userInfoResponse.data?.code !== 200) {
            return res.json({
                "code": userInfoResponse.data?.code || 500,
                "messageCode": "",
                "messageText": userInfoResponse.data?.msg || "Lỗi không xác định"
            });
        }

        let userInfo = userInfoResponse.data?.data?.data[0];
        if (!userInfo) {
            return res.json({
                "code": 500,
                "messageCode": "",
                "messageText": "Không tìm thấy thông tin người dùng"
            });
        }
        return res.json({
            "code": 200,
            "messageCode": "",
            "messageText": "Đăng nhập thành công",
            "data": {
                "accessToken": accessToken,
                "userInfo": userInfo
            }
        });

    } catch (e) {
        if (e?.messageCode && e?.messageCode[0] == "$") {
            return res.json({
                "code": e.code,
                "messageCode": e.messageCode,
                "messageText": e.messageText
            })
        } else {
            return res.json({
                "code": 500,
                "messageCode": "",
                "messageText": "Lỗi không xác định"
            })
        }
    }
}