let productos = []
fetch("./main/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })
const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".productoAgregar");
const numerito = document.querySelector("#numerito");






function cargarProductos(productosElegidos) {
   
   contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" class="productoImagen">
            <div class="productoCaracteristicas">
                <h3 class="productoTitulo">${producto.titulo}</h3>
                <p class="productoPrecio">$${producto.precio}</p>
                <button class="productoAgregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar()
}
cargarProductos(productos);

botonesCategoria.forEach(boton =>{
        boton.addEventListener("click", (e) => {

            botonesCategoria.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;

                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos)    ;
            }
            


            
        })


});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".productoAgregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");



if(productosEnCarritoLS) {
     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito(); 
} else {
    productosEnCarrito = [];
}



function agregarAlCarrito (e) {

    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #c00c0c, #e4d8d8)",
        },
        offset: {
            x: "1.5rem", 
            y: "1.5rem" 
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
       productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
