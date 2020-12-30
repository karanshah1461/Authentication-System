// rendering homepage
module.exports.home = function(req,res){
    return res.render('home',{
        title:'Authentication-System | Home'
    })
}