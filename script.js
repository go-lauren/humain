window.onload = 
function(){
    setupEmployees();
    setupNameBar();
    setupSliders();
    clearContents();
};

// employee functionality
var currentEmployee = "";

function setupEmployees() {
    var pierre = {
        id: "pierre",
        fullName: "Pierre Amougou",
        position: "Vice President",
        salary: 400000,
        hours: 10,
        pto: 50,
        value: 50,
    };
    var lauren = {
        id: "lauren",
        fullName: "Lauren Go",
        position: "HR Team Member",
        salary: 50000,
        hours: 8,
        pto: 15,
        value: 25,
    };
    var emmanuel = {
        id: "emmanuel",
        fullName: "Emmanuel Kinzonzi",
        position: "Product Manager",
        salary: 94743,
        hours: 7,
        pto: 32,
        value: 90,
    }
    var george = {
        id: "george",
        fullName: "George Wang",
        position: "Software Engineer Team Lead",
        salary: 124000,
        hours: 8,
        pto: 30,
        value: 47,
    };
    var peter = {
        id: "peter",
        fullName: "Peter Wang",
        position: "Account Managing Specialist",
        salary: 72341,
        hours: 8,
        pto: 15,
        value: 67,
    };
    employees = [pierre, lauren, emmanuel, george, peter];
}

function setupNameBar() {
    var divcontent = "";
    for (var i=0; i < employees.length; i++) {
        divcontent += `\<div class=\"name-cell\" id=\"${employees[i].id}\" `;
        divcontent += `onclick=\'nameClicked\(\"${employees[i].id}\"\)\'\>`
        divcontent += `\<div class=\"name-text\"\>${employees[i].fullName}\<\/div\>`;
        // divcontent += `${fullNames[i]}`
        divcontent += `\<\/div\>`
    }
    var nameBar = document.getElementsByClassName("name-bar");
    nameBar[0].innerHTML += divcontent;
}

function nameClicked(name) {
    clearContents();
    if (!currentEmployee) {
        document.getElementById("variableWindow").getElementsByTagName("div")[0].style.display = "block";
    }
    currentEmployee = name;
    
    let employee;
    for (var i=0; i<employees.length; i++) {
        if (employees[i].id == name) {
            employee = employees[i];
            break;
        }
    }

    var x = document.getElementById("statWindow");
    x.innerHTML = generateContent(employee);
    salarySlider.value = salaryToValue(employee.salary);
    hoursSlider.value = employee.hours;
    ptoSlider.value = employee.pto;

    updateVariables();
    var x = document.getElementById(name);
    x.style.backgroundColor = "rgb(80, 179, 217)"; 
}

function generateContent(employee) {
    return `<div style=\"padding: 10px; font-size:18px;\"\> ${employee.fullName} \<\/div\>` + 
        `\<span\>\<b\>Leaving Likelihood:\</b\>\</span\>` +
        `\<div class\=\"heading\"\> ${employee.value}\% \<\/div\>` +
        `\<div style=\"text-align\:left; padding: 10px\"> Position: ${employee.position} </div>`;
}

function clearContents() {
    if(currentEmployee) {
        var x = document.getElementById(currentEmployee);
        x.style.backgroundColor = "white";
    }
   
}

// slider functionality

function setupSliders() {
    salarySlider = document.getElementById("salarySlider");
    hoursSlider = document.getElementById("hoursSlider");
    ptoSlider = document.getElementById("ptoSlider");   
    salarySlider.oninput = function() {
        updateLL();
    }
    hoursSlider.oninput = function() {
        updateLL();
    }
    ptoSlider.oninput = function() {
        updateLL();
    }
    document.getElementById("variableWindow").getElementsByTagName("div")[0].style.display = "none";
}

function updateVariables() {
    let salary = valueToSalary(salarySlider.value);
    let hours = hoursSlider.value;
    let pto = ptoSlider.value;
    let table = document.getElementById("variableWindow").getElementsByTagName("table");
    let cells = table[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
    
    cells[0].innerHTML = `$${salary}`;
    cells[1].innerHTML = `${hours}`;
    cells[2].innerHTML = `${pto}`;
}
function updateLL() {
    updateVariables();

    let employee;
    for (var i=0; i<employees.length; i++) {
        if (employees[i].id == currentEmployee) {
            employee = employees[i];
            break;
        }
    }
    let baseSalary = employee.salary;
    let baseHours = employee.hours;
    let basePto = employee.pto;
    let value = employee.value;
     
    let salary = valueToSalary(salarySlider.value);
    let hours = hoursSlider.value;
    let pto = ptoSlider.value;

    value *= baseSalary / salary * hours / baseHours * basePto / pto;
    document.getElementsByClassName("heading")[0].innerHTML = Math.floor(Math.min(Math.max(0, value), 100)) + "%";
}

function resetVariables() {
    let employee;
    for (var i=0; i<employees.length; i++) {
        if (employees[i].id == currentEmployee) {
            employee = employees[i];
            break;
        }
    }
    salarySlider.value = salaryToValue(employee.salary);
    hoursSlider.value = employee.hours;
    ptoSlider.value = employee.pto;

    updateVariables();
    document.getElementsByClassName("heading")[0].innerHTML = employee.value + "%";
}
function salaryToValue(sal) {
    return Math.floor((sal- 1.0) / 1499999 * 100);
}

function valueToSalary(val) {
    return Math.floor((val - 1.0) / 99.0 * 1499999 );
}