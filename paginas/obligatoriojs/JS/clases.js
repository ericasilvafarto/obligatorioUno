
// Erica Silva (284183)

class Empresa{
	constructor (nombre, direccion, telefono, origen){
		this.nombre = nombre;
		this.direccion = direccion;
		this.telefono = telefono;
		this.origen = origen;
	}

	toString(){
		return this.nombre + ' ' + this.direccion + ' ' + this.telefono + ' ' + this.origen;
	}
}

class Presentacion{
	constructor (empresa, titulo, descripcion, tema, dia, duracion){
		this.empresa = empresa;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.tema = tema;
		this.dia = dia;
		this.duracion = duracion;
	}

	toString(){
			return this.titulo + '. Descripción: ' + this.descripcion + '. Tema: ' + this.tema + '. Día: ' + this.dia + '. Empresa: ' + this.empresa.nombre + '.';
	}
}

class Sistema{
	constructor (){
		this.listaEmpresas = [];
		this.listaPresentaciones = [];
	}

	agregarEmpresa(empresa){
		this.listaEmpresas.push(empresa);
	}

	devolverEmpresa(){
		return this.listaEmpresas.sort(function(a,b){
	    	return a.nombre.localeCompare(b.nombre);});
	}

	agregarPresentacion(presentacion){
		this.listaPresentaciones.push(presentacion);
	}

	devolverPresentacion(){
		return this.listaPresentaciones;
	}

	calcularPromedio(){
		let promedio = 0;
		for (let dato of this.listaPresentaciones){
			promedio += dato.duracion;
		}
		return Math.trunc(promedio/this.listaPresentaciones.length);
	}

	totalPorTipo(tema){
		let retorno = '';
		let cantidad = 0;
		for (let presentacion of this.listaPresentaciones){
			if (presentacion.tema == tema){
				cantidad++;
			}
		}
		if (cantidad > 0){
			retorno = cantidad;
		}
		else{
			retorno = 'sin datos'
		}
		return retorno
	}

	existeEmpresa(nombre){
		let existe = false;
		for (let i = 0; i < this.listaEmpresas.length && !existe; i++){
			if (this.listaEmpresas[i].nombre.toLowerCase() == nombre.toLowerCase()){
				existe = true;
			}
		}
		return existe;
	}

	existeTitulo(titulo){
		let existe = false;
		for (let i = 0; i < this.listaPresentaciones.length && !existe; i++){
			if (this.listaPresentaciones[i].titulo.toLowerCase() == titulo.toLowerCase()){
				existe = true;
			}
		}
		return existe;
	}

	validarDia(dia, duracion){
		let valido = true;
		let minutos = 480;
		for (let presentacion of this.listaPresentaciones){
			if (presentacion.dia == dia){
				minutos -= parseInt(presentacion.duracion);
			}
		}
		minutos -= parseInt(duracion);
		if (minutos < 0){
			valido = false;
		}
		return valido;
	}

	traerEmpresa(nombre){
		let dato;
		let existe = false;
		for (let i = 0; i < this.listaEmpresas.length && !existe; i++){
			if (this.listaEmpresas[i].nombre == nombre){
				dato = this.listaEmpresas[i];
				existe = true;
			}
		}
		return dato;
	}

	elegirColor(dia){
		let color = '';
		if (dia == 1){
			color = 'table-day-one';
		}
		else{
			if (dia == 2){
				color = 'table-day-two';
			}
			else{
				if (dia == 3){
					color = 'table-day-three';
				}
				else{
					if (dia == 4){
						color = 'table-day-four';
					}
					else{
						if (dia == 5){
							color = 'table-day-five';
						}
					}
				}
			}
		}
		return color;
	}

	presentacionesPorDia(dia){ 
		let presentacionesDelDia = [];
		for (let presentacion of this.listaPresentaciones){
			if(presentacion.dia == dia){
				presentacionesDelDia.push(presentacion);
			}
		}
		return presentacionesDelDia.sort(function(a,b){
			let diferencia = a.dia - b.dia;
			if (diferencia == 0){
				diferencia = a.titulo.localeCompare(b.titulo);
			}
			return diferencia;});
	}

	horarioDePresentacion(presentacion){ 
		return ((parseInt(presentacion.duracion))/15);
	}

	diaYHorarios(dia, suma){
		let dato = '';
		let horas = 8 + Math.trunc(suma/4);
		let minutos = Math.trunc((suma%4)*15);

		if (minutos != 0){
			dato = dia + ' - ' + horas + ':' + minutos;
		}
		else{
			dato = dia + ' - ' + horas + ':' + minutos + '0';
		}
		return dato
	}

	empresasConMasPresentaciones(){
		let empresas = [];
		let maximo = 0;
	    for (let emp of this.listaEmpresas){
	    	let cantidad = 0;
	    	for (let dato of this.listaPresentaciones){
	    		if (dato.empresa.nombre == emp.nombre){
	                cantidad++;
	            }        
	    	}
			if (cantidad > maximo){
				maximo = cantidad;
	            empresas = [emp];
            }
            else{
                if (cantidad == maximo){
                    empresas.push (emp);
                }
            }
	    }
	    return empresas;
	}

	buscarPalabras(dato){
		let presentaciones = [];
		let palabras = dato.toLowerCase().split(' ');
		for (let valor of this.listaPresentaciones){
			let desc = valor.descripcion.toLowerCase().split(' ');
			let cantidad = 0;
			for (let i = 0; i < palabras.length; i++){
				if (desc.includes(palabras[i])){
					cantidad++
				}
			}
			if (cantidad > 0){
				presentaciones.push(valor);
			}
		}
		return presentaciones.sort(function(a,b){
			let diferencia = a.dia - b.dia;
			if (diferencia == 0){
				diferencia = a.titulo.localeCompare(b.titulo);
			}
			return diferencia;
		});
	}

	buscarContieneTodas(dato){
		let presentaciones = [];
		let palabras = dato.toLowerCase().split(' ');
		for (let valor of this.listaPresentaciones){
			let desc = valor.descripcion.toLowerCase().split(' ');
			let cantidad = 0;
			for (let i = 0; i < palabras.length; i++){
				if (desc.includes(palabras[i])){
					cantidad++
				}
			}
			if (cantidad == palabras.length){
				presentaciones.push(valor);
			}
		}
		return presentaciones.sort(function(a,b){
			let diferencia = a.dia - b.dia;
			if (diferencia == 0){
				diferencia = a.titulo.localeCompare(b.titulo);
			}
			return diferencia;
		});
	}
}

