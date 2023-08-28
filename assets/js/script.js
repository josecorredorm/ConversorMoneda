let calculate = document.getElementById("Calculate");
let total =document.getElementById("Total");
let vtoday = document.getElementById("Vtoday");
let valueInput = document.getElementById("ValueInput");
let select = document.getElementById("Select");
let UrlApi = "https://mindicador.cl/api/";
let value =0;
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
    // if(!isNaN(valor)){
    //     value = valor;
    //     let FormatValue = valor.toLocaleString("es",{
    //         style:"currency",
    //         currency: "CLP",
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     });
    // valueInput.value= "";
    // valueInput.placeholder= FormatValue;
    // }
    // else{
    //     valueInput.placeholder = 0 + " CLP";
    // }
}

async function CalValue(){
    // value =parseFloat(document.getElementById("ValueInput").placeholder);
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
    // vtoday.innerHTML = valormoneda;
    // total.innerHTML = result.toFixed(2);
}

async function GetDat(){
    const res = await fetch(UrlApi);
    const datas = await res.json()
    return datas
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