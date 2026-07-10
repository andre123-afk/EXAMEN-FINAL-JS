const ventasPrueba = [

    {
        fecha: "10/08/2025, 10:30:00",
        total: 300000,
        productos: [
            {
                id: "EV001",
                nombre: "Noche de Jazz",
                precio: 300000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "12/09/2025, 14:00:00",
        total: 250000,
        productos: [
            {
                id: "EV002",
                nombre: "Festival Rock",
                precio: 250000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "08/10/2025, 16:30:00",
        total: 350000,
        productos: [
            {
                id: "EV003",
                nombre: "Teatro Nacional",
                precio: 350000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "18/11/2025, 19:20:00",
        total: 280000,
        productos: [
            {
                id: "EV004",
                nombre: "Concierto Pop",
                precio: 280000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "05/12/2025, 20:00:00",
        total: 400000,
        productos: [
            {
                id: "EV005",
                nombre: "Festival Vallenato",
                precio: 400000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "11/01/2026, 09:30:00",
        total: 320000,
        productos: [
            {
                id: "EV006",
                nombre: "Festival Salsa",
                precio: 320000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "15/02/2026, 18:00:00",
        total: 500000,
        productos: [
            {
                id: "EV007",
                nombre: "Concierto Electrónico",
                precio: 500000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "20/03/2026, 11:45:00",
        total: 260000,
        productos: [
            {
                id: "EV008",
                nombre: "Obra de Teatro",
                precio: 260000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "09/04/2026, 13:15:00",
        total: 450000,
        productos: [
            {
                id: "EV009",
                nombre: "Festival de Comedia",
                precio: 450000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "22/05/2026, 17:40:00",
        total: 380000,
        productos: [
            {
                id: "EV010",
                nombre: "Concierto Tropical",
                precio: 380000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "14/06/2026, 20:30:00",
        total: 420000,
        productos: [
            {
                id: "EV011",
                nombre: "Festival Urbano",
                precio: 420000,
                cantidad: 1
            }
        ]
    },

    {
        fecha: "18/07/2026, 21:00:00",
        total: 600000,
        productos: [
            {
                id: "EV012",
                nombre: "Mega Concierto",
                precio: 300000,
                cantidad: 2
            }
        ]
    }

];

let ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];

ventasPrueba.forEach(venta => {

    const existe = ventasGuardadas.some(v =>
        v.fecha === venta.fecha && v.total === venta.total
    );

    if (!existe) {
        ventasGuardadas.push(venta);
    }

});

localStorage.setItem("ventas", JSON.stringify(ventasGuardadas));

document.getElementById("btnReporte").addEventListener("click", generarReporte);

function generarReporte() {

    const anio = document.getElementById("anioReporte").value;
    const mes = document.getElementById("mesReporte").value;

    if (anio === "") {

        alert("Ingrese un año.");

        return;

    }

    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    let reporte = {};
    let totalCantidad = 0;
    let totalVentas = 0;

    ventas.forEach(venta => {

        let fecha;

        if (venta.fecha.includes(",")) {

            const partes = venta.fecha.split(",")[0].split("/");

            fecha = {
                dia: Number(partes[0]),
                mes: Number(partes[1]),
                anio: Number(partes[2])
            };

        } else {

            const f = new Date(venta.fecha);

            fecha = {
                dia: f.getDate(),
                mes: f.getMonth() + 1,
                anio: f.getFullYear()
            };

        }

        if (fecha.anio == anio && fecha.mes == mes) {

            venta.productos.forEach(producto => {

                if (!reporte[producto.id]) {

                    reporte[producto.id] = {
                        codigo: producto.id,
                        nombre: producto.nombre,
                        cantidad: 0,
                        total: 0
                    };

                }

                const cantidad = producto.cantidad || 1;

                reporte[producto.id].cantidad += cantidad;

                reporte[producto.id].total += Number(producto.precio) * cantidad;

                totalCantidad += cantidad;

                totalVentas += Number(producto.precio) * cantidad;

            });

        }

    });

    const cuerpo = document.getElementById("cuerpoReporte");

    cuerpo.innerHTML = "";

    for (const id in reporte) {

        cuerpo.innerHTML += `
            <tr>
                <td>${reporte[id].codigo}</td>
                <td>${reporte[id].nombre}</td>
                <td>${reporte[id].cantidad}</td>
                <td>$${reporte[id].total.toLocaleString()}</td>
            </tr>
        `;

    }

    document.getElementById("totalCantidad").textContent = totalCantidad;

    document.getElementById("totalVenta").textContent =
        "$" + totalVentas.toLocaleString();

}