const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso); // Cuando agregas un curso presionando "Aregar al carrito"

    carrito.addEventListener('click',eliminarCurso);  // Elimina cursos del carrito

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });  
}

// funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){   // apuntar exactamente al objetivo "Agregar al carrito"
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId =  e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML(); // iterar sibre el carrito y tomar su HTML
    }
};

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio .precio-descuento').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    
    // Revisa si un elemento ya existe en el carrito con .some
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // Actulizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //  Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al  arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
};


// Muestra el carrito de compras en el HTML
function  carritoHTML (){
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;  // Destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src='${imagen}' class='img-carrito'></td>
            <td class='txt-carrito'>${titulo}</td>
            <td class='txt-carrito'>${precio}</td>
            <td class='txt-carrito'>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> <i class="fas fa-trash-alt"></i> </a>
            </td>
        `;

        // Agrega el HTML del carrito al <tbody>
        contenedorCarrito.appendChild(row);

    });
};

// Elimina los cursos del body
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma optima
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};