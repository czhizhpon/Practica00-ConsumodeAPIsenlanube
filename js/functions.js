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
        showNotice("Error API.", "bg-danger");
        hiddeLoading();
    };
    showLoading();
    xmlhttp.send();
}

function searchAHero(){
    hideNotice();
    var heroName = document.getElementById("search-heroe-input").value;
    if (!isEmpty(heroName, "Ingrese el nombre de un Personaje de comics.")){
        getXMLRequest("https://superheroapi.com/api/779585992607585/search/" + heroName);
    }
}

function print(){
    console.log(data);
    var table = document.getElementById("hero-table");
    var data_head = `<thead class="thead-dark">
    <tr>
        <th></th>
        <th style="width:200px">Nombre</th>
        <th>Apariencia</th>
        <th style="width:400px">Biografía</th>
        <th>Conexiones</th>
        <th>Estadíscas de poder</th>
        <th>Trabajo</th>
        <th>Id</th>
    </tr>
    </thead>
    <tbody>`;
    var heroes = "";
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
        heroes = getHeroes(data, min, max);
    }
    table.innerHTML = data_head + heroes + "</tbody>";
}

function getHeroes(data, min, max){
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
                + "<strong>Género: </strong>" + "<br>" + isFielNull(data.results[i].appearance.gender) + "<br>" + "<br>"
                + "<strong>Raza: </strong>" + "<br>" + isFielNull(data.results[i].appearance.race) + "<br>" + "<br>"
                + "<strong>Altura: </strong>" + "<br>" + isFielNull(data.results[i].appearance.height['1']) + "<br>" + "<br>"
                + "<strong>Peso: </strong>" + "<br>" + isFielNull(data.results[i].appearance.weight['0'])
            + " </td>"
            + " <td>" 
                + "<strong>Nombre Completo: </strong>" + "<br>" + isFielNull(data.results[i].biography['full-name']) + "<br>" + "<br>"
                + "<strong>Primera aparición: </strong>" + "<br>" + isFielNull(data.results[i].biography['first-appearance']) + "<br>" + "<br>"
                + "<strong>Lugar de nacimiento: </strong>" + "<br>" + isFielNull(data.results[i].biography['place-of-birth']) + "<br>" + "<br>"
                + "<strong>Publicador: </strong>" + "<br>" + isFielNull(data.results[i].biography['publisher']) + "<br>" + "<br>"
                + "<strong>Alineación: </strong>" + "<br>" + isFielNull(data.results[i].biography['alignment']) + "<br>" + "<br>"
                + "<strong>Alias: </strong>" + "<br>" + getAliases(data.results[i].biography['aliases'])
            + " </td>"
            + " <td>" 
                + "<strong>Grupo/Afiliación: </strong>" + "<br>" + isFielNull(data.results[i].connections['group-affiliation'])
                // + "Familiares: " + data.results[i].connections['relatives'] + "<br>"  
            + " </td>"
            + " <td>" 
                + "<strong>Combate: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['combat']) + "<br>" + "<br>"
                + "<strong>Durabilidad: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['durability']) + "<br>" + "<br>"
                + "<strong>Inteligencia: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['intelligence']) + "<br>" + "<br>"
                + "<strong>Poder: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['power']) + "<br>" + "<br>"
                + "<strong>Velocidad: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['speed']) + "<br>" + "<br>"
                + "<strong>Fuerza: </strong>" + "<br>" + isFielNull(data.results[i].powerstats['strength'])
            + " </td>"
            + " <td>" 
                + "<strong>Base: </strong>" + "<br>" + isFielNull(data.results[i].work['base']) + "<br>" + "<br>"
                + "<strong>Ocupación: </strong>" + "<br>" + isFielNull(data.results[i].work['occupation'])
            + " </td>"
            + " <td>" 
                + data.results[i].id 
            + " </td>"
            
            + "</tr>";
    }
    return data_string;
}

function getAliases(data_aliases){
    var aliases = "";
    var n = data_aliases.length;
    if (n===0){
        aliases = "Desconocido"
    } else{
        for (var j = 0; j < n; j++){
            aliases = aliases + "[" + j + "] " + data_aliases[j] + "<br>";
        }
    }
    return aliases;
}

function isFielNull(s){
    if (s === "null"){
        return " - ";
    }
    return s;
}

function setNavPages(){
    var pages = document.getElementById('nav-pages-numbers');
    
    var min = current_page[0];
    var max;
    var min_aux;
    for (var i = current_page[0]; i >= current_page[0] - 2; i--){
        min = i;
        min_aux = i;
        if (i < 0){
            min = 0;
        }
    }
    max = current_page[0] + 2;
    if(min_aux < 0){
        max  = max - min_aux;
    }
    if (max >= max_pages){
        max = max_pages;
        if (max - 4 >= 0){
            min = max - 4;
        }else if(max - 3 >= 0){
            min = max - 3;
        }
    }
    current_page[1] = min;
    current_page[2] = max;
    var nav_html = "";
    if (current_page[0] === 0){
        nav_html = '<a href="#" class="isDisabled bg-primary" onclick="return false;">&laquo;</a>';
    }else{
        nav_html = '<a href="#" class="bg-primary" onclick="setPageLeft()">&laquo;</a>';
    }
    for (var i = current_page[1]; i <= current_page[2]; i++){
        if (current_page[0] === i){
            nav_html = nav_html + "<a class='bg-secondary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }else{
            nav_html = nav_html + "<a class='bg-primary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }
    }
    if(current_page[0] === max_pages){
        nav_html = nav_html + '<a href="#" class="isDisabled bg-primary" onclick="return false;">&raquo;</a>';
    }else{
        nav_html = nav_html + '<a href="#" class="bg-primary" onclick="setPageRight()">&raquo;</a>';
    }
    pages.innerHTML = nav_html;
}

function clearNav(){
    document.getElementById('nav-pages-numbers').innerHTML = "";
}

function setPage(n){
    current_page[0] = n;
    print(data);
    return false;
}

function setPageLeft(){
    var min = current_page[0] - 1;
    if (min <= 0){
        current_page[0] = 0;
    }else{
        current_page[0] = min;
    }
    print(data);
    return false;
}

function setPageRight(){
    var max = current_page[0] + 1;
    if(max >= max_pages){
        current_page[0] = max_pages;
    }else{
        current_page[0] = max;
    }
    print(data);
    return false;
}

function showLoading(){
    centerLoading();
    document.getElementById("loading").classList.remove("e_hidden");
    document.getElementById("background").classList.remove("e_hidden");
}

function hiddeLoading(){
    document.getElementById("loading").classList.add("e_hidden");
    document.getElementById("background").classList.add("e_hidden");
}

function centerLoading(){
    var loading = document.getElementById("loading");
    var w = window.innerWidth;
    var h = window.innerHeight;

    loading.style.left = ((w/2) - 40) + "px";
    loading.style.top = ((h/2) - 40) + "px";
}

function openModal(img_src, alt_text){
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modalImg.src = img_src;
    captionText.innerHTML = alt_text;
    return false;
}

function closeModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
