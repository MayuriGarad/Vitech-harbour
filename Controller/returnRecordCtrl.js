const IPD = require("../model/returnReportmodel");

exports.getreturnReport = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const ipdID = req.query;


    try {
        const returnReport = await IPD.find(ipdID)
        .populate(

            "vendor"
     )
        .sort({ datetime: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);


        const totalCount = await IPD.countDocuments();

           

        res.status(200).json({ 
            success: true,
             return:"vendor",
             pageInfo: {
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalItems: totalCount,
        }
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};
//mayuri