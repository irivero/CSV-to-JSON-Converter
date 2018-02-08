const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')
const csv = require('csvtojson')


const convertFromCsvToJson = (pathF) => {
    const getFile = (pathFile, callback) => {
        let rawData = ''
        csv()
            .fromFile(pathFile)
            .on('data', (jsonObj) => {
                rawData += jsonObj
            })
            .on('end', () => {
                callback(null, rawData)
            })
            .on('error', (error) => {
                console.error(error.message)
                callback(error)
            })
    }

    const folderName = uuidv1()
    fs.mkdirSync(folderName)
    getFile(pathF, (error, data) => {
        if (error) return console.log(error)
        fs.writeFileSync(path.join(__dirname, folderName, 'path.txt'), pathF)
        fs.writeFileSync(path.join(__dirname, folderName, 'json.txt'), data)
        console.log('DONE ', folderName)
    })
}

convertFromCsvToJson(process.argv[2])