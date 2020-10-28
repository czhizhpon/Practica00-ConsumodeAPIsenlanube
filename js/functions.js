// 779585992607585

var current_page = [0, 0, 4];
var data;
const DIV = 2;
var max_pages;

function hideNotice(){
    document.getElementById("main_notice").classList.add("e_hidden");
}

function showNotice(notice, notice_type){
    document.getElementById("main_notice").classList = '';
    document.getElementById("main_notice").classList.add("notice_container");
    document.getElementById("main_notice").classList.add(notice_type);
    document.getElementById("notice").innerHTML = "<span>" + notice + "</span>";
}

function isEmpty(value, error_message){
    if (value == ""){
        showNotice(error_message, "bg-danger");
        return true;
    }
    return false;
}

function getXMLRequest(url){
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.responseType = 'json';
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            data = xmlhttp.response;
            current_page = [0, 0, 4];
            hiddeLoading();
            print(data);
        }
    };
    xmlhttp.onerror = function(e){
        showNotice("Error API.", "bg-error");
        hiddeLoading();
    };
    showLoading();
    xmlhttp.send();
}

function searchAHero(){
    hideNotice();
    var heroName = document.getElementById("search-heroe-input").value;
    if (!isEmpty(heroName, "Ingrese el nombre de un Superheroe.")){
        getXMLRequest("https://superheroapi.com/api/779585992607585/search/" + heroName);
    }
}

function print(){
    // console.log(data);
    var table = document.getElementById("hero-table");
    var data_head = `<thead class="thead-dark">
    <tr>
        <th></th>
        <th>Nombre</th>
        <th>Apariencia</th>
        <th>Biografía</th>
        <th>Connecciones</th>
        <th>Powerstats</th>
        <th>Trabajo</th>
        <th>Id</th>
        
    </tr>
    </thead>
    <tbody>`;
    var heros = "";
    if (data.response === "error"){
        showNotice("No se encontraron resultados.", "bg-warning");
        clearNav();
    }else{
        max_pages = Math.trunc((data.results.length - 1) / DIV);
        var min = current_page[0] * DIV;
        var max = min + (DIV - 1);
        if(max >= data.results.length){
            max = data.results.length - 1;
        }
        setNavPages();
        heros = getHeros(data, min, max);
    }
    table.innerHTML = data_head + heros + "</tbody>";
}

function getHeros(data, min, max){
    var data_string = "";
    for(var i = min; i <= max; i++){
        data_string = data_string + "<tr>"
            + " <td>"
                + "<a onclick='openModal(\"" + data.results[i].image.url + "\", \"" + data.results[i]['name'] + "\");' href='#'>"
                    + "<img class='hero-img' src='" + data.results[i].image.url + "' alt='" + data.results[i]['name'] + "'>"
                + `</a>`
            + " </td>" 
            + " <td>" + data.results[i]['name'] + " </td>" 
            + " <td>" 
                + "<strong>Género: </strong>" + data.results[i].appearance.gender + "<br>"
                + "<strong>Raza: </strong>" + data.results[i].appearance.race + "<br>"
                + "<strong>Altura: </strong>" + data.results[i].appearance.height['1'] + "<br>"
                + "<strong>Peso: </strong>" + data.results[i].appearance.weight['0'] + "<br>" 
            + " </td>"
            + " <td>" 
                + "<strong>Nombre Completo: </strong>" + data.results[i].biography['full-name'] + "<br>"
                + "<strong>Primera aparición: </strong>" + data.results[i].biography['first-appearance'] + "<br>"
                + "<strong>Lugar de nacimiento: </strong>" + data.results[i].biography['place-of-birth'] + "<br>"
                + "<strong>Publicador: </strong>" + data.results[i].biography['publisher'] + "<br>"
            + " </td>"
            + " <td>" 
                + "<strong>Grupo/Afiliación: </strong>" + data.results[i].connections['group-affiliation'] + "<br>"
                // + "Familiares: " + data.results[i].connections['relatives'] + "<br>"  
            + " </td>"
            + " <td>" 
                + "<strong>Combate: </strong>" + data.results[i].powerstats['combat'] + "<br>"
                + "<strong>Durabilidad: </strong>" + data.results[i].powerstats['durability'] + "<br>"
                + "<strong>Inteligencia: </strong>" + data.results[i].powerstats['intelligence'] + "<br>"
                + "<strong>Poder: </strong>" + data.results[i].powerstats['power'] + "<br>"
                + "<strong>Velocidad: </strong>" + data.results[i].powerstats['speed'] + "<br>"
                + "<strong>Fuerza: </strong>" + data.results[i].powerstats['strength'] + "<br>"
            + " </td>"
            + " <td>" 
                + "<strong>Base: </strong>" + data.results[i].work['base'] + "<br>"
                + "<strong>Ocupación: </strong>" + data.results[i].work['occupation'] + "<br>"
            + " </td>"
            + " <td>" 
                + data.results[i].id 
            + " </td>"
            
            + "</tr>";
    }
    return data_string;
}


