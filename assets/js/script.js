let calculate = document.getElementById("Calculate");
let total =document.getElementById("Total");
let vtoday = document.getElementById("Vtoday");
let valueInput = document.getElementById("ValueInput");
let select = document.getElementById("Select");
let UrlApi = "https://mindicador.cl/api/";
let value =0;
let chart ;
calculate.addEventListener("click",()=>CalValue());

valueInput.addEventListener("blur", ()=>NewImput());

valueInput.addEventListener("click", ()=>ResetValue());

select.addEventListener("click",()=>ResetValue())

function NewImput(){
    const valor =Number(valueInput.value);
    value =valor;
    let numformat = formatnumber(valor,"CLP");
    valueInput.value= "";
    valueInput.placeholder= numformat;
}

async function CalValue(){
    console.log(value)
    if(value == 0){
        alert("Debe ingresar un valor mayor a 0 CLP")
    }
    select = document.getElementById("Select").value;
    const datas = await GetDat();
    let valormoneda = datas[select].valor;
    let result =  value / valormoneda;
    switch(select){
        case "dolar":
        vtoday.innerHTML = formatnumber(valormoneda,"USD") ;
        total.innerHTML = formatnumber(result,"USD") ;
        break;
        case "euro":
        vtoday.innerHTML = formatnumber(valormoneda,"EUR") ;
        total.innerHTML = formatnumber(result,"EUR") ;
        break;
        case "bitcoin":
        vtoday.innerHTML = formatnumber(valormoneda,"USD") ;
        total.innerHTML = formatnumber(result,"USD") ;
        break;
    }
    RenderGraf();
}

async function GetDat(){
    try{
        const res = await fetch(UrlApi);
        const datas = await res.json()
        return datas
    }
    catch(e){
        alert("Error al cargar los datos de la api: " + e.message);
    }
    }
async function GetDatGraf(){
    try{
    const selectnow = document.getElementById("Select").value;
    const Urlapidata = UrlApi+selectnow;
    const res = await fetch(Urlapidata);
    const datas = await res.json();
    console.log(datas);
    return datas;
    }catch(e){
        alert("Error al cargar los datos de la api: " + e.message);
    }
}

async function ConfigGraf(datas){
    const tipodegraf = "line";
    const titulo = "Valor de la moneda";
    const colorlinea = "red";
    let label =[];
    let DataGraf =[];
    for (let data in datas.serie){
        let DateArray = (datas.serie[data].fecha).substring(0, 10);
        label.push(DateArray.replace("-", "/"));
        let valuedata = datas.serie[data].valor.toString();
        DataGraf.push(valuedata.replace(",", "."));
    };
    const config = {
        type: tipodegraf,
        data: {
            labels: label,
            datasets: [{
                    label: titulo,
                    backgroundColor: colorlinea,
                    data: DataGraf
                }]
        }
    };
    console.log(config)
    return config;
}
async function RenderGraf(){
    const datas = await GetDatGraf();
    const config = await ConfigGraf(datas);
    const chartDOM = document.getElementById("myChart");
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(chartDOM, config);
}

function formatnumber(number,cod){
    if(!isNaN(number)){
        let FormatValue = number.toLocaleString("es",{
            style:"currency",
            currency: cod,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return FormatValue;
    }
    else{
        FormatValue = 0 + cod;
        return FormatValue;
    }
}
function ResetValue(){
    vtoday.innerHTML = "";
    total.innerHTML = "";
}