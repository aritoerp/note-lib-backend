const axios = require("axios");

module.exports = async (req, res) => {
    try {
        let { memvars, accessToken } = req.body;
        if (!memvars) memvars = { 
            "pageIndex": 1
        };

        if (!accessToken) {
            return res.json({
                "code": 401,
                "messageCode": "",
                "messageText": "Không tìm thấy access token"
            });
        }

        let data = JSON.stringify({
            "memvars": memvars
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api2dev.arito.vn/api/v1/List/Featured',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };
        const response = await axios.request(config);

        if (response.data?.code !== 200) {
            return res.json({
                "code": response.data?.code || 500,
                "messageCode": "",
                "messageText": response.data?.msg || "Lỗi không xác định"
            });
        }

        let categories = Array.isArray(response.data?.data?.data) ? response.data.data.data : [];
        return res.json({
            "code": 200,
            "messageCode": "",
            "messageText": "Lấy danh sách loại sách thành công",
            "data": categories
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