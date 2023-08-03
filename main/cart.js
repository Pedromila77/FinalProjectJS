let productosEnCarrito = (localStorage.getItem("productos-en-carrito"));
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector("#carritoAccionesVaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carritoAccionesComprar")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

   

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = ""; 
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" class="carritoProductoImagen">
                           
                           
                            <div class="carritoProductoTitulo">
                                <small>Titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>    
                                
                            <div class="carritoProductoCantidad">
                                    <small>Cantidad</small>
                                    <p>${producto.cantidad}</p>
                            </div>
                                
                            <div class="carritoProductoPrecio">
                                    <small>Precio</small>
                                    <p>$${producto.precio}</p>
                            </div>
                                
                            <div class="carritoProductoSubTotal">
                                    <small>Subtotal</small>
                                    <p>$${producto.precio + producto.cantidad}</p>
                            </div>
                                <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            
            `;
            contenedorCarritoProductos.append(div);
    
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estas seguro de vaciar?',
        icon: 'question',
        html:
        `Eliminaras ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Si',
        cancelButtonText:
          'No',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        } 
      })


    
}

function actualizarTotal() {
    
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`; 
    
}
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
