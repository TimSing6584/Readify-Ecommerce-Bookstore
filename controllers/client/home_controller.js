// module.exports.[some_name] -> if we need to export multiple things from a single file
module.exports.index = (req, res) => {
    res.render("client/pages/home/index.pug",{
        titlePage: "Home Page New"
    })
}