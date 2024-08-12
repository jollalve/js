// categoria/estilo
let blackworkCost = 40000;
let minimalistaCost = 40000;
let acuarelasCost = 50000;
let tradicionalCost = 40000;
let geometricoCost = 40000;
let nombreSencilloCost = 30000;

// tamano
let smallSizeCost = 0;
let mediumSizeCost = 25000;
let largeSizeCost = 40000;

// color
let oneColorCost = 0;
let twoColorsCost = 10000;
let threeColorsCost = 15000;
let fourColorsCost = 20000;

// ubicacion
let brazoCost = 0;
let manoCost = 10000;
let dedosCost = 15000;
let cuelloCost = 10000;
let abdomenCost = 25000;
let piernaCost = 0;
let espaldaCost = 0;
let pechoCost = 5000;
let costillaCost = 5000;

const categories = [
    { name: "Blackwork", cost: blackworkCost },
    { name: "Minimalista", cost: minimalistaCost },
    { name: "Acuarelas", cost: acuarelasCost },
    { name: "Tradicional", cost: tradicionalCost },
    { name: "Geométrico", cost: geometricoCost },
    { name: "Nombre Sencillo", cost: nombreSencilloCost }
];

const sizes = [
    { name: "1 - 8 cm", cost: smallSizeCost },
    { name: "8 - 16 cm", cost: mediumSizeCost },
    { name: "16 - 24 cm", cost: largeSizeCost }
];

const colors = [
    { name: "1 Color", cost: oneColorCost },
    { name: "2 Colores", cost: twoColorsCost },
    { name: "3 Colores", cost: threeColorsCost },
    { name: "4 Colores", cost: fourColorsCost }
];

const locations = [
    { name: "Brazo", cost: brazoCost },
    { name: "Mano", cost: manoCost },
    { name: "Dedos", cost: dedosCost },
    { name: "Cuello", cost: cuelloCost },
    { name: "Abdomen", cost: abdomenCost },
    { name: "Pierna", cost: piernaCost },
    { name: "Espalda", cost: espaldaCost },
    { name: "Pecho", cost: pechoCost },
    { name: "Costilla", cost: costillaCost }
];

function populateOptions(selectElementId, options) {
    const selectElement = document.getElementById(selectElementId);
    if (selectElement) {
        options.forEach(option => {
            let opt = document.createElement('option');
            opt.value = option.cost;
            opt.textContent = option.name;
            selectElement.appendChild(opt);
        });
    }
}

function calculateCost() {
    const categoryCost = parseInt(document.getElementById('categoria').value, 10);
    const sizeCost = parseInt(document.getElementById('tamano').value, 10);
    const colorCost = parseInt(document.getElementById('color').value, 10);
    const locationCost = parseInt(document.getElementById('lugar').value, 10);

    if (categoryCost === acuarelasCost && sizeCost === mediumSizeCost && 
        colorCost === oneColorCost && locationCost === dedosCost) {
        alert('No es posible realizar un tatuaje de acuarelas de ese tamano en los dedos y en un solo color. Intenta por favor con otra combinacion.')
        return;
    }

    const totalCost = categoryCost + sizeCost + colorCost + locationCost;
    const discountedCost = totalCost * 0.85; 
    document.getElementById('totalCost').textContent = `$${totalCost}`;
    if (sizeCost === smallSizeCost){
    document.getElementById('discountedCost').textContent = "DESCUENTO SOLO VALIDO PARA TATUAJES MAYORES A 8 CM";
    } else {document.getElementById('discountedCost').textContent = `$${discountedCost}`;}
    }

document.addEventListener('DOMContentLoaded', () => {
    populateOptions('categoria', categories);
    populateOptions('tamano', sizes);
    populateOptions('color', colors);
    populateOptions('lugar', locations);
});
