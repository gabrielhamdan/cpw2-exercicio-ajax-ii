async function myPromise(url) {
    const promise = new Promise((res, err) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                const status = xhr.status;
                if(status === 0 || (status >= 200 && status < 400))
                    res(xhr.responseText);
                else
                    err(xhr.status);
            }
        }
        xhr.send();
    });

    return await promise;
}

function idAleatorio() {
    const max = 1017;
    return Math.floor(Math.random() * max + 1);
}

const spriteElement = document.getElementById("sprite");
const errElement = document.getElementById("err");

const endpointAleatorio = async (simulaErro) => {
    try {
        errElement.innerHTML = "";
        let id = idAleatorio();
        
        if(simulaErro)
            id = -1;
    
        const pokemon = JSON.parse(await myPromise(`https://pokeapi.co/api/v2/pokemon/${id}`));
        spriteElement.src = pokemon.sprites.front_default;
    } catch (err) {
        spriteElement.src = "";
        errElement.innerHTML = `Erro na requisição: ${err}`;
    }
}

endpointAleatorio();