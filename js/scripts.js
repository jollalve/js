let blackworkCost = 40000;
let minimalistaCost = 40000;
let acuarelasCost = 50000;
let tradicionalCost = 40000;
let geometricoCost = 40000;
let nombreSencilloCost = 30000;

let smallSizeCost = 0;
let mediumSizeCost = 25000;
let largeSizeCost = 40000;

let oneColorCost = 0;
let twoColorsCost = 10000;
let threeColorsCost = 15000;
let fourColorsCost = 20000;

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

function ConfiguracionTatuaje(categoria, tamano, color, ubicacion) {
    this.categoria = categoria;
    this.tamano = tamano;
    this.color = color;
    this.ubicacion = ubicacion;
}

ConfiguracionTatuaje.prototype.calcularCostoTotal = function() {
    return this.categoria.cost + this.tamano.cost + this.color.cost + this.ubicacion.cost;
};

ConfiguracionTatuaje.prototype.verificarRestricciones = function() {
    if (this.categoria.name === "Acuarelas" && this.tamano.name === "8 - 16 cm" && 
        this.color.name === "1 Color" && this.ubicacion.name === "Dedos") {
        const mensajeEdad = document.getElementById('mensajeEdad');
        mensajeEdad.textContent = 'No se puede realizar un tatuaje de acuarelas de ese tamaño en los dedos con un solo color.';
        mensajeEdad.style.color = 'red';
        return false;
    }
    return true;
};

function guardarFechaNacimiento(fechaNacimiento) {
    localStorage.setItem('fechaNacimiento', fechaNacimiento);
}

function obtenerFechaNacimiento() {
    return localStorage.getItem('fechaNacimiento');
}

function cargarFechaNacimiento() {
    const fechaGuardada = obtenerFechaNacimiento();
    
    if (fechaGuardada) {
        document.getElementById('fechaNacimiento').value = fechaGuardada;
        verificarMayorDeEdad(); 
    }
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

function verificarMayorDeEdad() {
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const mensajeEdad = document.getElementById('mensajeEdad');
    const tattooForm = document.getElementById('tattooForm');
    const totalSection = document.getElementById('totalSection');

    if (!fechaNacimiento) {
        mensajeEdad.textContent = 'Debe ingresar una fecha de nacimiento válida.';
        mensajeEdad.style.color = 'red';
        tattooForm.style.display = 'none';
        totalSection.style.display = 'none';
        return false;
    }

    const edad = calcularEdad(fechaNacimiento);

    if (edad >= 18) {
        mensajeEdad.textContent = `Tienes ${edad} años. Adelante.`;
        mensajeEdad.style.color = 'green';
        tattooForm.style.display = 'block';
        totalSection.style.display = 'block';
        guardarFechaNacimiento(fechaNacimiento);
        return true;
    } else {
        mensajeEdad.textContent = '* Debe ser mayor de 18 años para hacerte un tatuaje.';
        mensajeEdad.style.color = 'red';
        tattooForm.style.display = 'none';
        totalSection.style.display = 'none';
        return false;
    }
}

document.getElementById('formEdad').addEventListener('submit', function(event) {
    event.preventDefault();
    verificarMayorDeEdad();
});

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

populateOptions('categoria', categories);
populateOptions('tamano', sizes);
populateOptions('color', colors);
populateOptions('lugar', locations);

function calculateCost() {
    const categoryCost = parseInt(document.getElementById('categoria').value, 10);
    const sizeCost = parseInt(document.getElementById('tamano').value, 10);
    const colorCost = parseInt(document.getElementById('color').value, 10);
    const locationCost = parseInt(document.getElementById('lugar').value, 10);

    const selectedCategory = categories.find(c => c.cost === categoryCost);
    const selectedSize = sizes.find(s => s.cost === sizeCost);
    const selectedColor = colors.find(c => c.cost === colorCost);
    const selectedLocation = locations.find(l => l.cost === locationCost);

    const configuracion = new ConfiguracionTatuaje(selectedCategory, selectedSize, selectedColor, selectedLocation);

    if (!configuracion.verificarRestricciones()) {
        return;
    }

    const totalCost = configuracion.calcularCostoTotal();
    const discountedCost = totalCost * 0.85;

    document.getElementById('totalCost').textContent = `$${totalCost}`;
    if (selectedSize.cost === smallSizeCost) {
        document.getElementById('discountedCost').textContent = "DESCUENTO SOLO VÁLIDO PARA TATUAJES MAYORES A 8 CM";
        document.getElementById('discountedCost').style.color = 'red';
    } else {
        document.getElementById('discountedCost').textContent = `$${discountedCost}`;
    }
}

window.onload = function() {
    const tattooForm = document.getElementById('tattooForm');
    tattooForm.style.display = 'none';
    document.getElementById('totalSection').style.display = 'none';
    cargarFechaNacimiento();
};
