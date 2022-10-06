const { application } = require('express')
const Image = require('../models/apiModels')


//Get the list of item/image

var visit = 0;
const index = (req, res, next) =>{
    visit++;

    //logs to capture endpoint, request payload, request count
    console.log("\n************Endpoints Details*****************\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : GET");

    console.log("\n************Request Body*****************\n");
    console.log("GET: received request");
    console.log(`http://127.0.0.1:3000/api/image${req.url}`);
    
    console.log("\n************Request Count*****************\n")
    console.log(`Get: Request Count--> Get: ${visit}`);

    let logGetResponse = res.send;
    res.send = function (ndata) {
    
    //logs to capture Response payload
    console.log("\n************Response Body*****************\n")
    console.log("GET: sending response\n");
    console.log(ndata)

    logGetResponse.apply(res, arguments);
    }
    Image.find()
    .then(response => {
        if(response == ''){
            res.json({status: '404', message: 'Not Found'})
        }else{
            res.json({
                response
            })
        }
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured !'
        })
    })
}


//Post the new item/image

var postVisit = 0;
const store = (req, res, next) =>{
    postVisit++;

    //logs to capture endpoint, request payload, request count
    console.log("\n************Endpoints Details*****************\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : POST");
    console.log("\n************Request Body*****************\n");
    console.log(req.body);
    console.log("\n************Request Count*****************\n")
    console.log(`Post Request Count--> Post: ${postVisit}`);

    let logPostResponse = res.send;
    res.send = function (data) {
    
    //logs to capture response payload
    console.log("\n************Response Body*****************\n")
    console.log(data)
    logPostResponse.apply(res, arguments);
}
    let image = new Image({
        imageId: req.body.imageId,
        name: req.body.name,
        url: req.body.url,
        size: req.body.size
    })
    image.save()
    .then(response => {
        res.json({
            message: 'Image is added successfully !!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error Occured !!'
        })
    })
}

//Delete the new item/image

const destroy = (req, res, next) =>{

    //logs to capture endpoint, request payload
    console.log("\n************Endpoints Details*****************\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : DELETE");
    console.log("\n************Request Body*****************\n");
    console.log(req.body);

    let logDeleteResponse = res.send;
    res.send = function (data) {
    
    //logs to capture response payload
    console.log("\n************Response Body*****************\n")
    console.log(data)
    logDeleteResponse.apply(res, arguments);
}
    let imageId = req.body.imageId
    Image.deleteMany()
    .then(() => {
        res.json({
            message: 'Image is deleted successfully !!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error Occured !!'
        })
    })
}

module.exports = {
    index, store, destroy
}