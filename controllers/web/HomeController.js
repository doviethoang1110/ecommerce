module.exports.index = async function (req, res) {
    res.render('index' ,{title:'Multikart',layout:'layout',template:'index-template'});
}
