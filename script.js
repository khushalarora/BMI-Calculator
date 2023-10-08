let heightInput = document.getElementById('height');
let weightInput = document.getElementById('weight');
let heightLabel = document.getElementById('height-label');
let weightLabel = document.getElementById('weight-label');

let heightError = document.getElementById('height-error');
let heightErrorSvg = document.getElementById('height-error-svg');
let weightError = document.getElementById('weight-error');
let weightErrorSvg = document.getElementById('weight-error-svg');

let btn = document.querySelector('button');
let bmiTxt = document.getElementById('bmi');
let needle = document.getElementById('needle');
let meterColor = document.getElementById('meter-color');
let bmiStatus = document.getElementById('bmi_status');



function focusIn(target, inp){
    if(window.innerWidth <= 425){
        target.style.transform = 'translateY(-35px)';
    }
    else{
        target.style.transform = 'translateY(-40px)';
    }
    target.style.color = '#3bcfff'
    inp.style.borderBottomColor = '#3bcfff';
}

function focusOut(target, inp){
    target.style.transform = 'translateY(0)';
    target.style.color = '#fff'
    inp.style.borderBottomColor = '#fff';
}


function checkHeight(){
    if(heightInput.value == ''){
        heightError.innerText = 'Height cannot be empty'
        heightError.style.display = 'block';
        heightErrorSvg.style.display = 'block';
    }
    else{
        let h = parseInt(heightInput.value);
        if(isNaN(h)){
            heightError.innerText = 'Height must be a number';
            heightError.style.display = 'block';
            heightErrorSvg.style.display = 'block';
        }
        else if(h <= 0){
            heightError.innerText = 'Height must be greater than zero';
            heightError.style.display = 'block';
            heightErrorSvg.style.display = 'block';
        }
        else{
            heightError.innerText = '';
            heightError.style.display = 'none';
            heightErrorSvg.style.display = 'none';
            return true;
        }
    }
}


function checkWeight(){
    if(weightInput.value == ''){
        weightError.innerText = 'Weight cannot be empty'
        weightError.style.display = 'block';
        weightErrorSvg.style.display = 'block';
    }
    else{
        let w = parseInt(weightInput.value);
        if(isNaN(w)){
            weightError.innerText = 'Weight must be a number';
            weightError.style.display = 'block';
            weightErrorSvg.style.display = 'block';
        }
        else if(w <= 0){
            weightError.innerText = 'Weight must be greater than zero';
            weightError.style.display = 'block';
            weightErrorSvg.style.display = 'block';
        }
        else{
            weightError.innerText = '';
            weightError.style.display = 'none';
            weightErrorSvg.style.display = 'none';
            return true;
        }
    }
}


function rotateNeedle(bmi){
    let integer = parseInt(bmi);
    let fraction = Number((bmi - integer).toFixed(1));
    let initBMI = 0;
    let initNeedle = 0;
    let interval = setInterval(() => {
        bmiTxt.innerText = initBMI;
        meterColorChange();
        needle.style.transform = `rotate(${initNeedle}deg)`;
        meterColor.style.transform = `rotate(${initNeedle}deg)`;
        if(initNeedle > 180){
            needle.style.transform = `rotate(180deg)`;
            meterColor.style.transform = `rotate(180deg)`;
            meterColorChange();
        }
        initBMI++;
        if(initBMI > integer){
            clearInterval(interval);
            bmiTxt.innerText = Number(bmiTxt.innerText) + fraction;
            needle.style.transform = `rotate(${initNeedle + fraction*5}deg)`;
            meterColor.style.transform = `rotate(${initNeedle + fraction*5}deg)`;
            if(initNeedle > 180){
                needle.style.transform = `rotate(180deg)`;
                meterColor.style.transform = `rotate(180deg)`;
            }
            meterColorChange();
        }
        initNeedle+=5;
    }, 40);
}


function meterColorChange() {
    let bmi = bmiTxt.innerText;
    if(bmi < 18.5){
        meterColor.style.backgroundImage = 'conic-gradient(from 90deg, yellow 180deg, transparent 180deg)';
        bmiStatus.innerText = 'Underweight';
    }
    else if(bmi >= 18.5 && bmi <= 24.9){
        meterColor.style.backgroundImage = 'conic-gradient(from 90deg, lime 180deg, transparent 180deg)';
        bmiStatus.innerText = 'Normal';
    }
    else if(bmi >= 25 && bmi <= 29.9){
        meterColor.style.backgroundImage = 'conic-gradient(from 90deg, orange 180deg, transparent 180deg)';
        bmiStatus.innerText = 'Overweight';
    }
    else if(bmi >= 30){
        meterColor.style.backgroundImage = 'conic-gradient(from 90deg, red 180deg, transparent 180deg)';
        bmiStatus.innerText = 'Obese';
    }
}


heightInput.addEventListener('focusin', (e)=>{
    focusIn(heightLabel, heightInput);
})

heightInput.addEventListener('focusout', (e)=>{
    if(heightInput.value == ''){
        focusOut(heightLabel, heightInput);
    }
    else{
        checkHeight();
    }
})

weightInput.addEventListener('focusin', (e)=>{
    focusIn(weightLabel, weightInput);
})

weightInput.addEventListener('focusout', (e)=>{
    if(weightInput.value == ''){
        focusOut(weightLabel, weightInput);
    }
    else{
        checkWeight();
    }
})

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let checkHeightStatus = checkHeight();
    let checkWeighttStatus = checkWeight();
    if(checkHeightStatus && checkWeighttStatus){
        let height = parseInt(heightInput.value);
        let weight = parseInt(weightInput.value);
        let bmi = (weight / Math.pow((height/100), 2)).toFixed(1);
        bmiTxt.scrollIntoView();
        rotateNeedle(Number(bmi));
    }
})