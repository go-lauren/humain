function nameClicked(name) {
    hideNames();
    // var x = document.getElementById(name);
    // x.style.display="block"
}
function hideNames() {
    var names = ["pierre", "lauren", "emmanuel", "george", "peter"];
    for(var i=0; i < names.length; i++) {
        var x = document.getElementById(names[i]);
        x.style.display ="none";
    }
}