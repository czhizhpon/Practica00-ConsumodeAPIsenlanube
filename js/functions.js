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


