/*
var after = ''

function getnewimage(){
    console.log("entro")
    let parentdiv = document.createElement('div')
    parentdiv.id = 'randImg'
    fetch('https://www.reddit.com/r/memes.json')
    .then(response => response.json())
    .then(body =>{
        for(let i = 0; i < body.data.children.lenght; index++){
            if(body.data.children[index].data.post_hint == 'image'){
                let div = document.createElement('div')
                let h4 = document.createElement('h4')
                let image = document.createElement('img')
                image.src = body.data.children[index].data.url_overriden_by_dest
                h4.textContent = body.data.children[index].data.title
                div.appendChild(h4)
                div.appendChild(image)
                parentdiv.appendChild(div)
            }
            console.log("entre " + i);
        }
        document.body.appendChild(parentdiv)
    })
}
*/