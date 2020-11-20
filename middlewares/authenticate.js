module.exports = (req,res,next)=>{
    const userId = req.header('user_id')
    if (userId != 1) {
        return res.sendStatus(403)
    }
    req.params.userId = 1
    next()
}