document.addEventListener("DOMContentLoaded", function () {
    fetch("datos.csv")
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split("\n").slice(1);
            const people = rows
                .map(row => row.trim())
                .filter(row => row.length > 0)
                .map(row => {
                    const [nombre, edad, sexo, ocupacion, estudios] = row.split(",").map(item => item?.trim());
                    return { nombre, edad, sexo, ocupacion, estudios };
                })
                .filter(person => person.nombre);

            function renderList(filter = "") {
                const nameList = document.getElementById("nameList");
                nameList.innerHTML = "";
                people.filter(p => p.nombre.toLowerCase().includes(filter.toLowerCase()))
                    .slice(0, 50)
                    .forEach(person => {
                        const col = document.createElement("div");
                        col.className = "col-6"; // Mejor distribución
                        col.innerHTML = `
                            <button class="btn btn-info w-100 shadow-sm name-button" title="${person.nombre}">
                                ${person.nombre}
                            </button>
                        `;
                        col.addEventListener("click", () => showInfo(person));
                        nameList.appendChild(col);
                    });
            }

            function showInfo(person) {
                if (!person || !person.nombre) return;
                document.getElementById("info").classList.remove("d-none");
                document.getElementById("infoTable").innerHTML = `
                    <tr>
                        <td>${person.nombre || "N/A"}</td>
                        <td>${person.edad || "N/A"}</td>
                        <td>${person.sexo || "N/A"}</td>
                        <td>${person.ocupacion || "N/A"}</td>
                        <td>${person.estudios || "N/A"}</td>
                    </tr>
                `;
            }

            document.getElementById("search").addEventListener("input", (e) => {
                renderList(e.target.value);
                document.getElementById("info").classList.add("d-none"); // Oculta la tabla al buscar
            });


            renderList();
        })
        .catch(error => console.error("Error cargando el CSV:", error));
});
