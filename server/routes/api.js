const express = require('express')
const request = require('request')
const router = express.Router()
const bodyParser = require(`body-parser`)
const path = require('path')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(express.static(path.join(__dirname, 'dist')))
router.use(express.static(path.join(__dirname, 'node_modules')))

router.get("/team/:teamName",function(req,res)
{
    const teamName = req.params.teamName || undefined
    const id = teamToIDs[teamName] || null
    console.log(id)
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`,function(err,respone,body)
    {
        const data = JSON.parse(body) || undefined
        const league = data.league.standard || undefined
        const players = []
        if(id != null)
        {
            for(let player of league)
            {
                if(player.teamId == id.toString() && player.isActive == true)
                {
                    const a = {
                        firstName: player.firstName,
                        lastName: player.lastName,
                        jersey: player.jersey,
                        pos:    player.pos
                    }
                    players.push(a)
                    
                }
            }
            res.send(players)
        }
        res.end()
    })
  
})

module.exports = router