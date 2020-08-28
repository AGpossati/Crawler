var request = require('request-promise')
var cheerio = require('cheerio')
var fs = require('fs')

const URL = 'https://www.imdb.com/title/tt8228288/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=HMY72YCSK0KXPSGDZGA7&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1https://www.imdb.com/title/tt0993846/?ref_=nv_sr_srsg_0'

async function acesso(){
    const response = await request(URL)
    let $ = cheerio.load(response)
    let title = $('div[class="title_wrapper"] > h1').text()
    let ratingValue = $('div[class="ratingValue"] > strong > span').text()
    let poster = $('div[class="poster"] > a > img').attr('src')
    let cast_list = $('table[class="cast_list"] > tbody > tr > td > a').text()   

    console.log('Titulo: ' + title)
    console.log('Nota: ' + ratingValue)
    console.log('Poster: ' + poster)
    console.log('Elenco: ' + cast_list)

    fs.appendFile('movie.txt', title + '\n' + ratingValue + '\n' + poster + ' \n' + cast_list + '\n', function(err){
        if (err) throw err;
        console.log('Salvo com Sucesso')
    }) 
}
acesso()