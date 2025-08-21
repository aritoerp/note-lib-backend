const axios = require('axios');
module.exports = async (req, res) => {
    try {
        let {pdfUrl} = req.query;
        if (!pdfUrl) {
            return res.json({
                "code": 400,
                "messageCode": "",
                "messageText": "PDF URL không được để trống"
            });
        }
        // server sẽ tải file về server và trả về cho client
        const response = await axios({
            method: 'get',
            url: pdfUrl,
            responseType: 'arraybuffer'
        });
        if (response.status !== 200) {
            return res.json({
                "code": response.status,
                "messageCode": "",
                "messageText": "Không thể tải file PDF"
            });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="downloaded.pdf"');
        res.send(response.data);
    } catch (error) {
        console.error("Error in downloadPdf:", error);
        return res.status(500).json({
            "code": 500,
            "messageCode": "",
            "messageText": "Lỗi không xác định"
        });
    }
}