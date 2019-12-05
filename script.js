window.onload = 
function(){
    names = ["pierre", "lauren", "emmanuel", "george", "peter"];
    fullNames = ["Pierre Amougou", "Lauren Go", "Emmanuel Kinzonzi", "George Wang", "Peter Wang"]
    setupNameBar();
};

function setupNameBar() {
    var divcontent = "";
    for (var i=0; i < names.length; i++) {
        divcontent += `\<div class=\"name\"\>`;
        divcontent += `${fullNames[i]}`;
        divcontent += `\<\/div\>`
    }
    var nameBar = document.getElementsByClassName("name-bar");
    nameBar[0].innerHTML = divcontent;
}
function nameClicked(name) {
    hideNames();
    var x = document.getElementById(name);
    x.style.display="block"
}

function hideNames() {
    for(var i=0; i < names.length; i++) {
        var x = document.getElementById(names[i]);
        if (x != null) {
            x.style.display ="none";
        }
    }
}