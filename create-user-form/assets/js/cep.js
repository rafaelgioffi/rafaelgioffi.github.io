
function limpa_cep() {
    document.getElementById('uf').value=("");
    document.getElementById('municipio').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('tipo-logradouro').value=("");
    document.getElementById('logradouro').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('municipio').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        document.getElementById('numero').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_cep();
        alert("CEP não encontrado.");
        document.getElementById('cep').value=("");
        document.getElementById('cep').focus();
    }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('municipio').value="Consultando o CEP, aguarde...";
            document.getElementById('bairro').value="Consultando o CEP, aguarde...";
            document.getElementById('logradouro').value="Consultando o CEP, aguarde...";
            document.getElementById('uf').value="Consultando o CEP, aguarde...";
            
            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_cep();
    }
};