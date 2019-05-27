const rp = require('request-promise')
const cherio = require('cheerio')
const Table = require('cli-table')


let users =[]
let table = new Table({
    head: ['Atleta']
})

//url:'https://api.cartolafc.globo.com/atletas/pontuados',
const options = {
    method: 'GET',
    url: 'https://api.cartolafc.globo.com/atletas/mercado'
}

rp(options)
    .then((data)=>{
        console.log('data', data)
        let atletas = [];
        for(let user of data.atletas){
            atletas.push(user)
        }
        process.stdout.write('loading')
        getDataInTable(atletas)
        
    })
    .catch((err)=>{
        console.log(err)
    })

function getDataInTable(data){
    var i = 0
    function next(){
        if(i < data.length){
            table.push([data[i].nome])
            return next()
        }else{
            printData()
        }
    }
    return next()
}
function printData(){
    console.log('ok')
    console.log(table.toString())
}