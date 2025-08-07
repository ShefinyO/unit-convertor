import {data, conversionNums} from "./data.js";

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const measureEl = document.getElementById("measure");  
const container = document.getElementById("conversion-cnt");
const convertBtn = document.getElementById("convert-btn");
               
function renderMeasureCards(){
    let allHtml = "";
    data.forEach((item)=>{
        const {measurement, unitOne, unitTwo} = item;
        const quantityTobeConverted = Number(measureEl.value);
        const conversionNum = conversionNums[measurement];
           
        const result = calculate(measurement, unitOne, unitTwo, quantityTobeConverted, conversionNum);
        
        const cardHeading1 = result[0];
        const cardHeading2 = result[1];
        
        const html = `<div class="card" id=${measurement} data-measurement=${measurement} data-unit-one=${unitOne} data-unit-two=${unitTwo}>
                        <h4>${cardHeading1}</h4>
                        <p id="${measurement}-desc">${cardHeading2}</p>
                      </div>`
        
        allHtml += html;
        
    })
    
    container.innerHTML = allHtml;
    
}            
               
renderMeasureCards();

               
function calculate(measurement, unitOne, unitTwo, quantityTobeConverted, conversionNum){
    
    const unitOneToUnitTwo = (quantityTobeConverted * conversionNum).toFixed(3);
    const unitTwoToUnitOne = (quantityTobeConverted / conversionNum).toFixed(3); 
       
    const cardHeading1 = `${measurement} (${unitOne}/${unitTwo})`;
    const cardHeading2 = `${quantityTobeConverted} ${unitOne}s = ${unitOneToUnitTwo} ${unitTwo}s | ${quantityTobeConverted} ${unitTwo}s = ${unitTwoToUnitOne} ${unitOne}s`;
    
    return [cardHeading1, cardHeading2];
}

convertBtn.addEventListener("click", ()=>{
    const allCards = document.querySelectorAll('.card');
    
    allCards.forEach((card)=>{
        const cardId = card.id;
        const targetElement = document.getElementById(`${cardId}-desc`);
        
        const quantityTobeConverted = Number(measureEl.value);
        const conversionNum = conversionNums[cardId];
        const unitOne = card.dataset.unitOne;
        const unitTwo = card.dataset.unitTwo;
        
        const result = calculate(cardId, unitOne, unitTwo, quantityTobeConverted, conversionNum);
        
        targetElement.textContent = result[1];
              
    })  
})