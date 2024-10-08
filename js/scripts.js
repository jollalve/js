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

        Swal.fire({
            title: '¡Bienvenido!',
            text: 'Puedes ahora calcular el precio te tu tatuaje',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'black'
          })

        return true;
    } else {
        mensajeEdad.textContent = '* Debe ser mayor de 18 años para hacerte un tatuaje.';
        mensajeEdad.style.color = 'red';
        tattooForm.style.display = 'none';
        totalSection.style.display = 'none';

        Swal.fire({
            title: 'Lo sentimos.',
            text: 'Debes ser mayor de Edad para ingresar',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: 'black'
          })
          
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
    document.getElementById('totalCost').textContent = `$${totalCost}`;

    const reservarBtn = document.getElementById('reservarBtn');
    reservarBtn.style.display = 'block';
    reservarBtn.addEventListener('click', mostrarModalReserva);
}

function mostrarModalReserva() {
    Swal.fire({
        title: 'Reserva tu cita',
        html: `
            <form id="formReserva">
                <label for="nombreCliente">Nombre: </label>
                <input type="text" id="nombreCliente" required style="width: 100%; margin-bottom: 10px;">
                
                <label for="fechaReserva">Selecciona una fecha: </label>
                <input type="date" id="fechaReserva" required style="width: 100%; margin-bottom: 10px;">
                
                <label for="horaReserva">Selecciona una hora: </label>
                <select id="horaReserva" required style="width: 100%; margin-bottom: 10px;">
                    <option value="">Selecciona una hora</option>
                </select>

                <button type="button" id="confirmarReservaBtn" class="swal2-confirm swal2-styled">
                    Agendar Cita
                </button>
            </form>
        `,
        showConfirmButton: false,
        width: '400px',
    });

    cargarDisponibilidad();

    document.getElementById('confirmarReservaBtn').addEventListener('click', function() {
        agendarCita();
    });
}

function cargarDisponibilidad() {
    fetch('disponibilidad.json')
        .then(response => response.json())
        .then(data => {
            const horarios = data.horarios;
            const excepciones = data.excepciones;

            const fechaInput = document.getElementById('fechaReserva');
            fechaInput.addEventListener('change', function() {
                const fechaSeleccionada = fechaInput.value;
                const diaSemana = new Date(fechaSeleccionada).toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
                
                let horariosDisponibles = excepciones[fechaSeleccionada] || horarios[diaSemana] || [];
                
                actualizarHorasDisponibles(horariosDisponibles);
            });
        })
        .catch(error => console.error('Error al cargar la disponibilidad:', error));
}

function actualizarHorasDisponibles(horas) {
    const horaInput = document.getElementById('horaReserva');
    horaInput.innerHTML = '';
    
    if (horas.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay horarios disponibles';
        horaInput.appendChild(option);
    } else {
        horas.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            horaInput.appendChild(option);
        });
    }
}

function agendarCita() {
    const nombreCliente = document.getElementById('nombreCliente').value.trim();
    const fechaReserva = document.getElementById('fechaReserva').value;
    const horaReserva = document.getElementById('horaReserva').value;

    if (!nombreCliente || !fechaReserva || !horaReserva) {
        Swal.fire('Error', 'Por favor, completa todos los campos para agendar la cita.', 'error');
        return;
    }

    const categoria = document.getElementById('categoria').selectedOptions[0].textContent;
    const tamano = document.getElementById('tamano').selectedOptions[0].textContent;
    const color = document.getElementById('color').selectedOptions[0].textContent;
    const ubicacion = document.getElementById('lugar').selectedOptions[0].textContent;
    const totalCost = document.getElementById('totalCost').textContent;

    const detallesReserva = `
        Nombre del Cliente: ${nombreCliente}<br>
        Fecha de la Cita: ${fechaReserva}<br>
        Hora de la Cita: ${horaReserva}<br>
        <hr>
        Categoría del Tatuaje: ${categoria}<br>
        Tamaño del Tatuaje: ${tamano}<br>
        Colores: ${color}<br>
        Ubicación: ${ubicacion}<br>
        <hr>
        Total a Pagar: ${totalCost}
    `;

    Swal.fire({
        title: 'Detalles de la Cita',
        html: detallesReserva,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Descargar PDF',
        confirmButtonColor: 'green',
        cancelButtonColor: 'blue',
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            generarPDF(nombreCliente, fechaReserva, horaReserva, categoria, tamano, color, ubicacion, totalCost);
        }
    });
}

function agendarCita() {
    const nombreCliente = document.getElementById('nombreCliente').value.trim();
    const fechaReserva = document.getElementById('fechaReserva').value;
    const horaReserva = document.getElementById('horaReserva').value;

    if (!nombreCliente || !fechaReserva || !horaReserva) {
        Swal.fire('Error', 'Por favor, completa todos los campos para agendar la cita.', 'error');
        return;
    }

    const categoria = document.getElementById('categoria').selectedOptions[0].textContent;
    const tamano = document.getElementById('tamano').selectedOptions[0].textContent;
    const color = document.getElementById('color').selectedOptions[0].textContent;
    const ubicacion = document.getElementById('lugar').selectedOptions[0].textContent;
    const totalCost = document.getElementById('totalCost').textContent;

    const detallesReserva = `
        Nombre del Cliente: ${nombreCliente}<br>
        Fecha de la Cita: ${fechaReserva}<br>
        Hora de la Cita: ${horaReserva}<br>
        <hr>
        Categoría del Tatuaje: ${categoria}<br>
        Tamaño del Tatuaje: ${tamano}<br>
        Colores: ${color}<br>
        Ubicación: ${ubicacion}<br>
        <hr>
        Total a Pagar: ${totalCost}
    `;

    Swal.fire({
        title: 'Reserva Confirmada',
        html: detallesReserva,
        icon: 'success',
        confirmButtonText: 'Descargar PDF',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonColor: 'blue',
        cancelButtonColor: 'grey',
    }).then((result) => {
        if (result.isConfirmed) {
            generarPDF(nombreCliente, fechaReserva, horaReserva, categoria, tamano, color, ubicacion, totalCost);
        }
    });
}

function generarPDF(nombreCliente, fechaReserva, horaReserva, categoria, tamano, color, ubicacion, totalCost) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Detalles de la Cita - JP Tattoo', 20, 20);

    doc.setFontSize(12);
    doc.text(`Nombre del Cliente: ${nombreCliente}`, 20, 40);
    doc.text(`Fecha de la Cita: ${fechaReserva}`, 20, 50);
    doc.text(`Hora de la Cita: ${horaReserva}`, 20, 60);

    doc.text('Detalles del Tatuaje:', 20, 80);
    doc.text(`Categoría: ${categoria}`, 20, 90);
    doc.text(`Tamaño: ${tamano}`, 20, 100);
    doc.text(`Colores: ${color}`, 20, 110);
    doc.text(`Ubicación: ${ubicacion}`, 20, 120);

    doc.setFontSize(14);
    doc.text(`Total a Pagar: ${totalCost}`, 20, 140);

    doc.save(`Cita_Tatuaje_${nombreCliente}.pdf`);
}


window.onload = function() {
    const tattooForm = document.getElementById('tattooForm');
    tattooForm.style.display = 'none';
    document.getElementById('totalSection').style.display = 'none';
    cargarFechaNacimiento();
};


