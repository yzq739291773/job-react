const model = require('../model')
const User = model.getModel('user')


exports.create = (model, obj) => {
    return new Promise((resolve, reject) => {
        model.create(obj, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })

}

exports.findone = (model, obj) => {
    return new Promise((resolve, reject) => {
        model.findOne(obj, (err, doc) => {
            if (doc) {
                console.log(2, doc)
                reject(err)
            } else {
                console.log(1, err)
                resolve(err)
            }
        })
    })
}