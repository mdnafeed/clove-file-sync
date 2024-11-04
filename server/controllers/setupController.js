exports.setup = async (req, res, next) => {
    console.log(req.body);
    return res.status(200).json({data:"Upload"})
}