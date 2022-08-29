// Validação total...
(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  
// Validar cpf/cnpj
$("#cpfcnpj").keydown(function() {
    try {
        $("#cpfcnpj").unmask();
    } catch (e) {

    }
    var tamanho = $("#cpfcnpj").val().length;
    
    if (tamanho < 11) {
        $("#cpfcnpj").mask("999.999.999-99");
    } else {
        $("#cpfcnpj").mask("99.999.999/9999-99");
    }

    var elem = this;
    setTimeout(function() {
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);

    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

// Validar Data de nascimento...
jQuery('#dataNasc').blur(function () { 
    var nasc = document.getElementById('dataNasc');
    var data = new Date(nasc.value);
    var ano = data.getFullYear() + 1;
    var data2 = new Date;
    var atual = data2.getFullYear();
    if ((atual - ano) < 18) {
        alert('É necessário possuir ao menos 18 anos para se registrar');
        nasc.value = '';
        nasc.focus();
    }
});

// validar nome
jQuery('#nome').keyup(function () { this.value = this.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,''); });

// validar senhas
$(document).ready(function() {
    $('#senha').keyup(function() {
        validaSenha();
    });
    $('#conf_senha').keyup(function() {
        confereSenha();
    });

    function confereSenha() {
        let senhaVal = $('#senha').val();
        let confSenhaVal = $('#conf_senha').val();
        if (senhaVal !== confSenhaVal) {
            $('#passcheck2').show();
            document.getElementById('passcheck2').innerHTML = 'As senhas não estão iguais';
            return false;
        } else {
            $('#passcheck2').hide();
            document.getElementById('passcheck2').innerHTML = '';
            return true;
        }
    }
    
    function validaSenha() {
        let senhaVal = $('#senha').val();
        var regex = /^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9!@#$%¨&*<>+-.=]{6,})$/;
        if (senhaVal.match(regex)) {
            document.getElementById('passcheck').innerHTML = '';
            $('#passcheck').hide();            
            $('#conf_senha').prop('disabled', false);
            return true;
        } else {
            document.getElementById('passcheck').innerHTML = 'A senha deve conter no mínimo 6 caracteres, uma letra e um número';
            $('#passcheck').show();            
            $('#conf_senha').prop('disabled', true);
            return false;
        }
    }
});

// validar cpf/cnpj2...
$("#cpfcnpj2").keydown(function() {
    try {
        $("#cpfcnpj2").unmask();
    } catch (e) {

    }
    var tamanho = $("#cpfcnpj2").val().length;
    
    if (tamanho < 11) {
        $("#cpfcnpj2").mask("999.999.999-99");
    } else {
        $("#cpfcnpj2").mask("99.999.999/9999-99");
    }

    var elem = this;
    setTimeout(function() {
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);

    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

// function copiar dados
function copyData() {
    if ($('#check-copia').is(':checked')) {
        if ($('#cpfcnpj').val().length > 11) {
            $("#cpfcnpj2").val($("#cpfcnpj").val());
            $("#cpfcnpj2").prop('disabled', true);
            $("#cpfcnpj").prop('disabled', true);
        } else {
            $('#check-copia').prop('checked', false);
        }
        if ($('#nome').val().length > 2) {
            $("#nome2").val($("#nome").val());
            $("#nome2").prop('disabled', true);
            $("#nome").prop('disabled', true);
        }
    } else {
        $("#cpfcnpj2").val('');
        $("#cpfcnpj2").prop('disabled', false);
        $("#cpfcnpj").prop('disabled', false);
        $("#nome2").val('');
        $("#nome2").prop('disabled', false);
        $("#nome").prop('disabled', false);
    }
}

function mascaraMutuario(o, f) {
    v_obj = o
    v_fun = f
    setTimeout('execmascara()', 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function cpfCnpj(v) {

    v = v.replace(/\D/g, "")

    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    } else { 
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")        
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")     
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")       
        v = v.replace(/(\d{4})(\d)/, "$1-$2")
       
    }

    return v
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
   if(cpf == '') return false; 
   // Elimina CPFs invalidos conhecidos    
   if (cpf.length != 11 || 
       cpf == "00000000000" || 
       cpf == "11111111111" || 
       cpf == "22222222222" || 
       cpf == "33333333333" || 
       cpf == "44444444444" || 
       cpf == "55555555555" || 
       cpf == "66666666666" || 
       cpf == "77777777777" || 
       cpf == "88888888888" || 
       cpf == "99999999999")
           return false;       
   // Valida 1o digito 
   add = 0;    
   for (i=0; i < 9; i ++)       
       add += parseInt(cpf.charAt(i)) * (10 - i);  
       rev = 11 - (add % 11);  
       if (rev == 10 || rev == 11)     
           rev = 0;    
       if (rev != parseInt(cpf.charAt(9)))     
           return false;       
   // Valida 2o digito 
   add = 0;    
   for (i = 0; i < 10; i ++)        
       add += parseInt(cpf.charAt(i)) * (11 - i);  
   rev = 11 - (add % 11);  
   if (rev == 10 || rev == 11) 
       rev = 0;    
   if (rev != parseInt(cpf.charAt(10)))
       return false;       
   return true;   
}

function validarCNPJ(cnpj) {

   cnpj = cnpj.replace(/[^\d]+/g,'');

   if(cnpj == '') return false;
    
   if (cnpj.length != 14)
       return false;

   // Elimina CNPJs invalidos conhecidos
   if (cnpj == "00000000000000" || 
       cnpj == "11111111111111" || 
       cnpj == "22222222222222" || 
       cnpj == "33333333333333" || 
       cnpj == "44444444444444" || 
       cnpj == "55555555555555" || 
       cnpj == "66666666666666" || 
       cnpj == "77777777777777" || 
       cnpj == "88888888888888" || 
       cnpj == "99999999999999")
       return false;
        
   // Valida DVs
   tamanho = cnpj.length - 2
   numeros = cnpj.substring(0,tamanho);
   digitos = cnpj.substring(tamanho);
   soma = 0;
   pos = tamanho - 7;
   for (i = tamanho; i >= 1; i--) {
     soma += numeros.charAt(tamanho - i) * pos--;
     if (pos < 2)
           pos = 9;
   }
   resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
   if (resultado != digitos.charAt(0))
       return false;
        
   tamanho = tamanho + 1;
   numeros = cnpj.substring(0,tamanho);
   soma = 0;
   pos = tamanho - 7;
   for (i = tamanho; i >= 1; i--) {
     soma += numeros.charAt(tamanho - i) * pos--;
     if (pos < 2)
           pos = 9;
   }
   resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
   if (resultado != digitos.charAt(1))
         return false;
          
   return true;
   
}

var aux = document.getElementById('cpfcnpj');
aux.onblur = function() {
clearTimeout();
var str = this.value;
if(str.length == 14){ 
    if( ! validarCPF(str) ){ 
        alert("CPF inválido, por favor corrija!");
        document.getElementById('cpfcnpj_msg').innerHTML = "CPF inválido, por favor corrija!";
        aux.value = '';
        aux.focus();
    } 
} else if(str.length == 18) { 
    if( !validarCNPJ(str)) {
        alert("CNPJ inválido, por favor corrija!");
        aux.value = '';
        aux.focus();
    } 
}
}
aux.maxLength = 18;