
// Erica Silva (284183)

window.addEventListener ('load', inicio);

function inicio(){
	document.getElementById ('addCompanyButton').addEventListener ('click', crearEmpresa);
	document.getElementById ('addPresentationButton').addEventListener ('click', crearPresentacion);
	document.getElementById ('searchButton').addEventListener ('click', buscarPalabras);
	document.getElementById ('idTableBody').innerHTML = '';
}


let sistema = new Sistema();

function crearEmpresa(){
	if (document.getElementById ('idCompany').reportValidity()){
		let nombre = document.getElementById ('companyName').value;
		let direccion = document.getElementById ('companyAddress').value;
		let telefono = document.getElementById ('companyPhoneNumber').value;
		let origen = origenElegido();

		if (!sistema.existeEmpresa(nombre)){
			let empresa = new Empresa (nombre, direccion, telefono, origen);

			sistema.agregarEmpresa(empresa);

			cargarEnLista ();
			cargarEnCombo ();
			clearEmpresa ();
		}
		else{
			alert ('La empresa ya existe');
			clearEmpresa();
		}
	}
}

function origenElegido(){
	let seleccionado = document.getElementsByName ('origin');
	let posicion = -1;
	for (let i = 0; i < seleccionado.length; i++){
		if (seleccionado [i].checked){
			posicion = i;
		}
	}
	return seleccionado[posicion].value;
}

function cargarEnLista(){
	document.getElementById ('companyList').innerHTML = '';
	let datos = sistema.devolverEmpresa();
	for (let valor of datos){
		let nodo = document.createElement ('li');
		let nodoTexto = document.createTextNode (valor);
		nodo.appendChild (nodoTexto);
		document.getElementById ('companyList').appendChild (nodo);
	}
}

function cargarEnCombo(){
	document.getElementById ('companyCombo').innerHTML = '';
	let datos = sistema.devolverEmpresa();
	for (let valor of datos){
		let nodo = document.createElement ('option');
		let nodoTexto = document.createTextNode (valor.nombre);
		nodo.appendChild (nodoTexto);
		document.getElementById ('companyCombo').appendChild (nodo);
	}
}

function clearEmpresa(){
	document.getElementById ('companyName').value = '';
	document.getElementById ('companyAddress').value = '';
	document.getElementById ('companyPhoneNumber').value = '';
	document.getElementById ('nationalOrigin').checked = true;	
}

function crearPresentacion(){
	if (document.getElementById ('idPresentation').reportValidity()){
		let nombreEmpresa = document.getElementById ('companyCombo').value;
		let empresa = sistema.traerEmpresa(nombreEmpresa);
		let titulo = document.getElementById ('presentationTitle').value;
		let descripcion = document.getElementById ('presentationDescription').value;
		let tema = document.getElementById ('presentationTopic').value;
		let dia = document.getElementById ('presentationDay').value;
		let duracion = parseInt(document.getElementById ('presentationLength').value);

		if (!sistema.existeTitulo(titulo) && sistema.validarDia(dia, duracion)){
			let presentacion = new Presentacion (empresa, titulo, descripcion, tema, dia, duracion);

			sistema.agregarPresentacion(presentacion);  addCompanyButton
			sistema.totalPorTipo(tema);

			cargarEnTabla();
			cargarPromedio();
			cargarListaMax();
			cargarListaTipo()
			clearPresentacion();

			alert ('Presentacion agregada')
		}
		else{
			if (sistema.existeTitulo(titulo)){
				alert ('Debe elegir otro titulo');
			}
			else{
				if (!sistema.validarDia(dia, duracion)){
					alert ('El dia esta completo. Seleccione uno nuevo o intente reduciendo la duracion');
				}
			}
		}
	}
}

function cargarPromedio(){
	document.getElementById ('averageTime').innerHTML = sistema.calcularPromedio() + ' minutos';
}

function cargarListaMax(){
	document.getElementById ('maxCompanyList').innerHTML = '';
	let datos = sistema.empresasConMasPresentaciones();
	for (let valor of datos){
		let nodo = document.createElement ('li');
		let nodoTexto = document.createTextNode (valor.nombre);
		nodo.appendChild (nodoTexto);
		document.getElementById ('maxCompanyList').appendChild (nodo);
	}
}

function cargarEnTabla(){
    document.getElementById('idTableBody').innerHTML = '';
    for(let dia = 1; dia <= 5; dia++){
        let presentaciones = sistema.presentacionesPorDia(dia);
        let color = sistema.elegirColor(dia);
        let suma = 0;
        for (let i = 0; i < presentaciones.length; i++){
            let valido = true;
            for (let k = 1; k <= sistema.horarioDePresentacion(presentaciones[i]); k++){
                if(valido){
                    let fila = document.getElementById('idTableBody').insertRow();
                    fila.className = color;
                    let celda1 = fila.insertCell();
                    let celda2 = fila.insertCell();
                    celda1.innerHTML = sistema.diaYHorarios(dia,suma);
                    celda2.rowSpan = sistema.horarioDePresentacion(presentaciones[i]);
                    celda2.innerHTML = presentaciones[i];
                    suma++;
                    valido = false;
                } 
                else{
                    let fila = document.getElementById('idTableBody').insertRow();
                    fila.className= color;
                    let celda1 = fila.insertCell();
                    celda1.innerHTML = sistema.diaYHorarios(dia, suma);
                    suma++;
                }
            }
        }
    }
}

function clearPresentacion(){
	document.getElementById ('companyCombo').selectedIndex = 0;
	document.getElementById ('presentationTitle').value = '';
	document.getElementById ('presentationDescription').value = '';
	document.getElementById ('presentationTopic').selectedIndex = 0;
	document.getElementById ('presentationDay').selectedIndex = 0;
	document.getElementById ('presentationLength').selectedIndex = 0;
}

function buscarPalabras(){
	if(document.getElementById('idSearch').reportValidity() && document.getElementById('idCheckBox').checked){
		let dato = document.getElementById('searchBox').value;
		let presentaciones = sistema.buscarContieneTodas(dato);
		if (presentaciones.length > 0){
			cargarListaBusqueda();
		}
		else{
			if(presentaciones.length == 0){
				cargarSinDatos();
			}
		}
	}
	else{
		if(document.getElementById('idSearch').reportValidity() && !(document.getElementById('idCheckBox').checked)){
			let dato = document.getElementById('searchBox').value;
			let presentaciones = sistema.buscarPalabras(dato);
			if (presentaciones.length > 0){
				cargarListaBusqueda();
			}
			else{
				if(presentaciones.length == 0){
					cargarSinDatos();
				}
			}
		}
	}
	clearBusqueda();
}

function cargarListaBusqueda(){
	document.getElementById ('searchList').innerHTML = '';
	if(document.getElementById('idCheckBox').checked){
		let datos = sistema.buscarContieneTodas(document.getElementById('searchBox').value);
		for (let valor of datos){
			let nodo = document.createElement ('li');
			let nodoTexto = document.createTextNode (valor);
			nodo.appendChild (nodoTexto);
			document.getElementById ('searchList').appendChild (nodo);
		}
	}
	else{
		if(!(document.getElementById('idCheckBox').checked)){
			let datos = sistema.buscarPalabras(document.getElementById('searchBox').value);
			for (let valor of datos){
				let nodo = document.createElement ('li');
				let nodoTexto = document.createTextNode (valor);
				nodo.appendChild (nodoTexto);
				document.getElementById ('searchList').appendChild (nodo);
			}	
		}
	}
} alert

function cargarSinDatos(){
	document.getElementById ('searchList').innerHTML = '';
	let nodo = document.createElement ('li');
	let nodoTexto = document.createTextNode ('No hay coincidencias');
	nodo.appendChild (nodoTexto);
	document.getElementById ('searchList').appendChild (nodo);
}

function clearBusqueda(){
	document.getElementById('searchBox').value = '';
	document.getElementById('idCheckBox').checked = false;
}

function cargarListaTipo(){
	document.getElementById('topicAI').innerHTML = sistema.totalPorTipo('Inteligencia Artificial');
	document.getElementById('topicBigData').innerHTML = sistema.totalPorTipo('Big Data');
	document.getElementById('topicMobile').innerHTML = sistema.totalPorTipo('Mobile');
	document.getElementById('topicSocialMedia').innerHTML = sistema.totalPorTipo('Redes');
	document.getElementById('topicSecurity').innerHTML = sistema.totalPorTipo('Seguridad');
	document.getElementById('topicHardware').innerHTML = sistema.totalPorTipo('Hardware');
}

