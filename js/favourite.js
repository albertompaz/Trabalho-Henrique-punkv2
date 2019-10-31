var favir = [];
var objetoCervejas = [];
var beersId = [];
var cervejasPesquisa = [];

for (let i=0; i<objetoCervejas.length; i++) {
    beersId.push(objetoCervejas[i].id)
}

/*
objetoCervejas.forEach(element=>{
    beersId.push(element.id)
})*/

    if (localStorage.getItem("listaFavoritos") !== null) { // verificando se o local storage ta vazio ou não
        favir = JSON.parse(localStorage.getItem("listaFavoritos"));
        objetoCervejas = JSON.parse(localStorage.getItem("listaCervejas"));
    }
    beersId = objetoCervejas.map(value=>{return value.id;});
    console.log(objetoCervejas);
    objetoCervejas.forEach(element => {
        
            let id = element.id;    
                
            if(favir.includes(id)){
                    $("#listaBeers").append(
                        `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                            <div class="card" style="width: 18rem; height: 28rem;">
                            <i onclick="like(${element.id})" class="far fas fa-star" id="estrela${element.id}"></i>
                                <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${element.image_url}" alt="Imagem de capa do card" onclick="abrir(${element.id})"></a>
                                <div class="card-body">
                                    <h5 class="card-title">${element.name}</h5>
                                    <p class="card-text">${element.tagline}</p>
                                </div>
                            </div>
                        </div>`);       
            }
            
    });

    // fazendo a pesquisa
    $("#buscar-cerveja").change(function(){
            
        $("#listaBeers").empty();

        var pesquisa = document.getElementById("buscar-cerveja").value
        //colocando tudo em letra maiuscula ou minuscula para nao dar problema
        var resposta = objetoCervejas.filter(val=>{return val.name.toUpperCase().includes(pesquisa.toUpperCase())});
        console.log(resposta)
        
        //criando o card com a cerveja da pesquisa contida em resposta
        for (let i=0; i<resposta.length; i++) {
            
            $("#listaBeers").append(
                `<div class="col-lg-4 col-sm-12 col-10 col-md-6 col-centered mt-3 mx-auto text-center">    
                    <div class="card" style="width: 18rem; height: 28rem;">
                    <i onclick="like(${resposta[i].id})" class="far fa-star" id="estrela${resposta[i].id}"></i>
                        <a href="#" data-toggle="modal" data-target="#modalCervejas"><img class="card-img-top" src="${resposta[i].image_url}" alt="Imagem de capa do card" onclick="abrir(${resposta[i].id})"></a>
                        <div class="card-body">
                            <h5 class="card-title">${resposta[i].name}</h5>
                            <p class="card-text">${resposta[i].tagline}</p>
                        </div>
                    </div>
                </div>`)
    
                if (favir.includes(resposta[i].id)) {
                    document.getElementById("estrela"+resposta[0].id).classList.toggle("fas");
                } 
        }
        

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

    