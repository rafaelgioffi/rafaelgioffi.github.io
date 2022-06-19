interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
    clientId?: string;
}

interface Pessoa {
    nome: string;
    cpf: string;
}

interface Cliente extends Pessoa {
    veiculos: Veiculo[];
}

(function () {
    const $ = (query: string): HTMLInputElement |
     null => document.querySelector(query);

     function calcTempo(mil: number) {
         let min = Math.floor(mil / 60000);
         const sec = Math.floor((mil % 60000) / 1000);
        
        if (min <= 0) {
            return `${sec} segundo(s)`
        }
        else if(min > 59) {
            return `${Math.floor(min / 60)} hora(s) e ${Math.floor(min % 60)} minuto(s) e ${sec} segundo(s)`;
        }
        else if (min < 60) { 
            return `${min} minuto(s) e ${sec} segundo(s)` 
        };
     }

     function patio() {
         function ler(): Veiculo[] {
             return localStorage.patio ? JSON.parse(localStorage.patio) : [];
         }

         function adicionar(veiculo: Veiculo & { cupom?: string }, salva?: boolean) {
             const row = document.createElement("tr");
             
             row.innerHTML = `
             <td>${veiculo.nome.toUpperCase()}</td>
             <td>${veiculo.placa.toUpperCase()}</td>
             <td>${veiculo.entrada}</td>
             <td>
                <button class="delete" data-placa="${veiculo.placa}">>></button>
             </td>
             `;

             row.querySelector(".delete")?.addEventListener("click", function(){
                 remover(this.dataset.placa);
             });

             $("#patio")?.appendChild(row);

            if(salva) salvar([...ler(), veiculo]);
         }

         function remover(placa: string) {
             const { entrada, nome } = ler().find(
                 veiculo => veiculo.placa === placa);

             const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

             if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

             salvar(ler().filter(veiculo => veiculo.placa !== placa));
             render();
         }

         function salvar(veiculos: Veiculo[]) {
             localStorage.setItem("patio", JSON.stringify(veiculos));
         }

         function render() {
             $("#patio")!.innerHTML = "";
             const patio = ler();

             if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
                }
            }

         return { ler, adicionar, remover, salvar, render };
     }

     patio().render();

    $("#cadastrar")?.addEventListener("click", () =>  {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;
        console.log({nome, placa});

        if(!nome) {
            alert("O nome do carro é obrigatório!");
            return;
        }
        if(!placa) {
            alert("A placa do carro é obrigatória!");
            return;
        }

        patio().adicionar({nome, placa, entrada: new Date().toISOString() }, true);
    });
})();