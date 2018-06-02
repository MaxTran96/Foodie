/* GET 'about us' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
        title: 'About Foodie',
        content: 'A web app made by Max Tran to help busy people eat homemade foods from real life moms'
    });
};