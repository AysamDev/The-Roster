//This is the class that will manage all your APIs

class APIManager {

    constructor() {
        this.renderer = new Renderer()
    }

 getPlayers()
{
    let input = $('#team-input').val()
         input = input.toLowerCase()
    if(input != "")
    {
        $.ajax({
            type:"GET",
            url: `/team/${input}`,
            success: (ref) => {
                if (ref.length > 0)
                {
                    for(let player of ref)
                    {
                        //requesting image
                        player.image = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`
                    }
                    this.renderer.renderPlayers(ref)
                }
                }
            
          });
    }
    else
    {
        alert("Insert team name")
    }

}

}
