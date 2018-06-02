var Location = require('.../app_api/models/locations');
exports.getLocations = async function(query,page,limit){
    var options = {
        page,
        limit
    }
    try {
        var locations = await Location.paginate(query, options)
        return books;
    } catch (e) {
        throw Error('Error while Paginating Locations');
    }
}