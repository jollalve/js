// var categoria/estilo
let blackworkCost = 40000;
let minimalistaCost = 40000;
let acuarelasCost = 50000;
let tradicionalCost = 40000;
let geometricoCost = 40000;
let nombreSencilloCost = 30000;

// var tamano
let smallSizeCost = 0;
let mediumSizeCost = 25000;
let largeSizeCost = 40000;

// var color
let oneColorCost = 0;
let twoColorsCost = 10000;
let threeColorsCost = 15000;
let fourColorsCost = 20000;

// var ubicacion
let brazoCost = 0;
let manoCost = 10000;
let dedosCost = 15000;
let cuelloCost = 10000;
let abdomenCost = 25000;
let piernaCost = 0;
let espaldaCost = 0;
let pechoCost = 5000;
let costillaCost = 5000;

// arrays
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

// objeto
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
        alert('No es posible realizar un tatuaje de acuarelas de ese tamaño en los dedos y en un solo color. Intente otra combinación.'); // alert
        console.log('Un tatuaje de acuarelas debe llevar mas de UN color, tambien requiere mas espacio del que pueda estar disponible en un dedo.') // console log
        return false;
    }
    return true;
};

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    console.log(`Tu edad es: ${edad} annos`); // console log
    return edad;
}

function verificarMayorDeEdad() {
    const fechaNacimiento = prompt("Ingrese su fecha de nacimiento en formato YYYY-MM-DD (por ejemplo, 2000-01-15):");

    while (fechaNacimiento === null || fechaNacimiento.trim() === "" || isNaN(Date.parse(fechaNacimiento))) {
        alert("Debe ingresar una fecha de nacimiento válida para usar este simulador."); // alert
        fechaNacimiento = prompt("Ingrese su fecha de nacimiento en formato YYYY-MM-DD (por ejemplo, 2000-01-15):"); // prompt

        if (fechaNacimiento === null) {
            alert("Debe ser mayor de 18 años para usar este simulador de costos."); // alert
            return false;
        }
    }

    const edad = calcularEdad(fechaNacimiento);

    if (edad >= 18) {
        return true;
    } else {
        alert("Debe ser mayor de 18 años para usar este simulador de costos."); // alert
        console.log('Intenta nuevamente cuando seas mayor de edad. Saludos.') // console log
        return false;
    }
}

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

// busqueda y filtrado sobre arrays
function seleccionarOpcionMasBarata() {
    let costoMinimo = Infinity;
    let mejorConfiguracion = null;

    for (const categoria of categories) {
        for (const tamano of sizes) {
            for (const color of colors) {
                for (const ubicacion of locations) {
                    const configuracion = new ConfiguracionTatuaje(categoria, tamano, color, ubicacion);
                        const costoTotal = configuracion.calcularCostoTotal();
                        if (costoTotal < costoMinimo) {
                            costoMinimo = costoTotal;
                            mejorConfiguracion = configuracion;
                    }
                }
            }
        }
    }

    if (mejorConfiguracion) {
        alert(
            `La opción más barata es:\n` +
            `Categoría: ${mejorConfiguracion.categoria.name}\n` +
            `Tamaño: ${mejorConfiguracion.tamano.name}\n` +
            `Color: ${mejorConfiguracion.color.name}\n` +
            `Ubicación: ${mejorConfiguracion.ubicacion.name}\n` +
            `Costo total: $${costoMinimo}`
        ); // alert
        document.getElementById('categoria').value = mejorConfiguracion.categoria.cost;
        document.getElementById('tamano').value = mejorConfiguracion.tamano.cost;
        document.getElementById('color').value = mejorConfiguracion.color.cost;
        document.getElementById('lugar').value = mejorConfiguracion.ubicacion.cost;
    } 
}



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
    } else {
        document.getElementById('discountedCost').textContent = `$${discountedCost}`;
        console.log('No ha sido posible aplicar el descuento con las opciones seleccionadas. Lo sentimos.')} // console log
    }

function iniciarSimulador() {
    if (verificarMayorDeEdad()) {
        populateOptions('categoria', categories);
        populateOptions('tamano', sizes);
        populateOptions('color', colors);
        populateOptions('lugar', locations);

        const btnOpcionBarata = document.getElementById('btnOpcionBarata');
        btnOpcionBarata.onclick = function(event) {
            event.preventDefault(); // Previene el comportamiento predeterminado (aunque no debería ser necesario con type="button")
            seleccionarOpcionMasBarata();
        };
    }
}

document.addEventListener('DOMContentLoaded', iniciarSimulador); () => {
    populateOptions('categoria', categories);
    populateOptions('tamano', sizes);
    populateOptions('color', colors);
    populateOptions('lugar', locations);
};
