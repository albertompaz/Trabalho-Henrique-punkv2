const beerLink = "https://api.punkapi.com/v2/beers"
var beersName = [];
var page = 1
var favir = [];
var isFinder= false;

if (localStorage.getItem("listaFavoritos") !== null) { // verificando se o local storage ta vazio ou não
    favir = JSON.parse(localStorage.getItem("listaFavoritos"));
  }

beersId = [];
var objetoCervejas = null

$(document).ready(function() {

    $.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, function(data) {
        objetoCervejas = data
        //local storage
        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem("listaCervejas", JSON.stringify(objetoCervejas) );
        } else {
            document.getElementById("result").innerHTML = 
            "Sorry, your browser does not support Web Storage...";
        }  
        data.forEach(element => {
            if(element.image_url == null){
                element.image_url="img/download.jpg";
            }
            $("#listaBeers").append(
            `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                <div class="card" style="width: 18rem; height: 28rem;">
                <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                    <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.tagline}</p>
                    </div>
                </div>
            </div>`);

            //console.log(element.name);
            //console.log(element.id)
            beersName.push(element.name);
            beersId.push(element.id)
        });

        page++;
        //verificando se a cerveja já está salva pra deixar marcada
        if (favir != null) {
            favir.forEach(value=>{
                document.getElementById("estrela"+value).classList.toggle("fas");
            })
        }

    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height() && !isFinder ) {   
            if (page < 6) {
                $.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, function(data) {
                    objetoCervejas =  objetoCervejas.concat(data)
                    if (typeof(Storage) !== "undefined") {
                        // Store
                        localStorage.setItem("listaCervejas", JSON.stringify(objetoCervejas) );
                    } else {
                        document.getElementById("result").innerHTML = 
                        "Sorry, your browser does not support Web Storage...";
                    }  
                    data.forEach(element => {
                        if(element.image_url == null){
                            element.image_url="img/download.jpg";
                        }
                        $("#listaBeers").append(
                        `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                            <div class="card" style="width: 18rem; height: 28rem;">
                            <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                                <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                                <div class="card-body">
                                    <h5 class="card-title">${element.name}</h5>
                                    <p class="card-text">${element.tagline}</p>
                                </div>
                            </div>
                        </div>`);

                        //console.log(element.name);
                        //console.log(element.id)
                        beersName.push(element.name);
                        beersId.push(element.id)
                    });
                });
                page++;
                //verificando se a serveja já está salva pra deixar marcada
                if (favir != null) {
                    favir.forEach(value=>{
                        document.getElementById("estrela"+value).classList.toggle("fas");
                    })
                }         
            }
        }
                        
    })
       
    })

})

// fazendo a pesquisa
$("#buscar-cerveja").change(function(){
    isFinder=true;        
    $("#listaBeers").empty();
    var pesquisa = document.getElementById("buscar-cerveja").value
    if (pesquisa == "") {
        $.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            });
        });
    } else {
        $.get(`https://api.punkapi.com/v2/beers?beer_name=${pesquisa}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });
    }

    //colocando tudo em letra maiuscula ou minuscula para nao dar problema
    


});    
//fim da pesquisa

function like(id){
    //alterando o de marcado como favorito ou nao
    document.getElementById("estrela"+id).classList.toggle("fas");
//verificando e removendo se o elemento ja está na lista de favoritos ao clicar nele
    if (favir.includes(id)) {
        let index = favir.indexOf(id)
        favir.splice(index,1)
    } else {
        favir.push(id);
    }
    salvar();
}

//salvando a lista favir
function salvar() {
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("listaFavoritos", JSON.stringify(favir) );

    } else {
        document.getElementById("result").innerHTML = 
        "Sorry, your browser does not support Web Storage...";
    }  
}




function abrir(id) {
    
    for(i=1; i<=beersId.length; i++) {
        if (i == id) {
            //console.log(i)
            //console.log(id)
            //console.log(beersId[id])
            document.getElementById("modalFig").innerHTML = `<img id="imagemModal" src="${objetoCervejas[id-1].image_url}">`
            document.getElementById("modalTitle").innerHTML = `${objetoCervejas[id-1].name}`
            document.getElementById("modalSubTitle").innerHTML = `<span class="fontModalSubTitle">${objetoCervejas[id-1].tagline}<span>`
            document.getElementById("modalSubTitle").innerHTML += `<p class="tracoModal"></p>` 
            document.getElementById("modalSubTitle").innerHTML +=
            `<p class="linhaIbu">IBU:<span class="ibuAbvEbc">${objetoCervejas[id-1].ibu}</span>   ABV:<span class="ibuAbvEbc">${objetoCervejas[id-1].abv}</span>   EBC:<span class="ibuAbvEbc">${objetoCervejas[id-1].ebc}</span><p>`
            document.getElementById("modalSubTitle").innerHTML += `<span class="ibuAbvEbc">${objetoCervejas[id-1].description}<span>`
            document.getElementById("modalSubTitle").innerHTML += `<p class="bestServed mt-3">Best served with:</p>`
            document.getElementById("modalSubTitle").innerHTML += `<ul>`
            objetoCervejas[id-1].food_pairing.forEach((value)=>{
                document.getElementById("modalSubTitle").innerHTML += `<li class="ibuAbvEbc">${value}</li>`;
            });
            document.getElementById("modalSubTitle").innerHTML += "</ul>";

            //You might also like
            document.getElementById("outrasOpcoes").innerHTML = "";
             
            for(let i=0; i<3; i++) {
                //gerando ids de cerveja aleatório
                let id1 = getRandomInt(1,objetoCervejas.length)

                $("#outrasOpcoes").append(
                    `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                        <div class="card" style="width: 14rem; height: 25rem;">
                            <a href="#"><img class="card-img-top card-img-modal mt-3" src="${objetoCervejas[id1].image_url}" alt="Imagem de capa do card"></a>
                            <div class="card-body">
                                <h5 class="card-title">${objetoCervejas[id1].name}</h5>
                            </div>
                        </div>
                    </div>`
                )

                    

            }



        }
    }
}

function getRandomInt(min, max) { //Id das cervejas vão de 1 a 25
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//busca avançada
function verificar() {
    var option = document.getElementsByName("radoption")
    var variavelBusca = document.getElementById("buscar-cerveja-avancada").value

    if (option[0].checked) {
        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?ibu_it=${variavelBusca}`, function(data) {
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });
    }

    if (option[1].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?ibu_gt=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[2].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?abv_it=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[3].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?abv_gt=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[4].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?ebc_it=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[5].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?ebc_gt=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[6].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?brewed_before=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

    if (option[7].checked) {

        $("#listaBeers").empty();

        $.get(`https://api.punkapi.com/v2/beers?brewed_after=${variavelBusca}`, function(data) {
          
            data.forEach(element => {
                if(element.image_url == null){
                    element.image_url="img/download.jpg";
                }
                $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${element.id})" class="far fa-star" id="estrela${element.id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.tagline}</p>
                        </div>
                    </div>
                </div>`);
            
                if (favir.includes(element.id)) {
                    document.getElementById("estrela"+element.id).classList.toggle("fas");
                } 
            });
        });            

    }

}