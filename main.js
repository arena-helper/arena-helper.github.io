//from https://www.geeksforgeeks.org/sets-in-javascript/
Set.prototype.isSubSet = function(otherSet){ 
    if(this.size > otherSet.size) 
        return false; 
    else{ 
        for(var elem of this) { 
            if(!otherSet.has(elem)) 
                return false; 
        } 
        return true; 
    } 
};
//from https://stackoverflow.com/a/15164958/7476985
const updateTable = function(tableData, location){
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    tableData.forEach(function(rowData, i){
        let row = document.createElement('tr');
        rowData.forEach(function(cellData){
            let cell = document.createElement(i ? 'td' : 'th');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    location.replaceChild(table, location.childNodes[0]);
};

//from https://stackoverflow.com/a/43053803/7476985
const cartHelper = (a,b) => [].concat(...a.map(d => b.map(e => [].concat(d,e))));
const cartesian = (a,b,...c) => (b ? cartesian(cartHelper(a,b), ...c) : a);
let   finallist = [];

const calculate = function(){
    let classes = Array.from(document.getElementById("classForm").elements).map(a => a.value.split(/,/).map(b => b.trim()));
    const filterArr = classes.map(a => a[0] !== "");
    classes = classes.filter((a,b) => filterArr[b]);
    const header = [1,2,3,4,5,6,7,8,9,10].map(a => "Period " + a).filter((a,b) => filterArr[b]);
    const required = new Set(document.getElementById("paramForm").elements["req"].value.split(/,/).map(b => b.trim()).filter(c => c !== ""));
    const blacklist = new Set(document.getElementById("paramForm").elements["black"].value.split(/,/).map(b => b.trim()).filter(c => c !== ""));
    const clength = classes.length;
    finallist = [header];

    const cartProd = new Set(cartesian(...classes));
    for(var c of cartProd){
        const cset = new Set(c);
        if(cset.size == clength){
            if(required.isSubSet(cset)){
                if(!blacklist.isSubSet(cset) || !blacklist.size){
                    finallist.push([...cset]);
                }
            }
        }
    }
    
    updateTable(finallist, document.getElementById("results"));
    document.getElementById("copyMessage").style.visibility = "visible";
};

const copyToClipboard = function(){
    const textArea = document.createElement('textarea');
    textArea.value = finallist.map(a => a.reduce((b,c) => b + "\t" + c)).reduce((b,c) => b + "\n" + c);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};