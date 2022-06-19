(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        let min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        if (min <= 0) {
            return `${sec} segundo(s)`;
        }
        else if (min > 59) {
            return `${Math.floor(min / 60)} hora(s) e ${Math.floor(min % 60)} minuto(s) e ${sec} segundo(s)`;
        }
        else if (min < 60) {
            return `${min} minuto(s) e ${sec} segundo(s)`;
        }
        ;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
             <td>${veiculo.nome.toUpperCase()}</td>
             <td>${veiculo.placa.toUpperCase()}</td>
             <td>${veiculo.entrada}</td>
             <td>
                <button class="delete" data-placa="${veiculo.placa}">>></button>
             </td>
             `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome, placa });
        if (!nome) {
            alert("O nome do carro é obrigatório!");
            return;
        }
        if (!placa) {
            alert("A placa do carro é obrigatória!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
