class Renderer
{
    constructor()
    {
        this.template = $('#team-template').html()
        this.templateScript = Handlebars.compile(this.template)
    }

    renderPlayers(data)
    {
        $('.team-container').empty()
        const html =  this.templateScript({data})
        $('.team-container').append(html)
    }
}