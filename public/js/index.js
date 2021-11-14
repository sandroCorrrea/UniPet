// -------------------------------- VALIDAÇÃO DE CEP POR MEIO DE API

var limpa_formulário_cep = () => {
  document.getElementById('rua').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
}


var meu_callback = (conteudo) => {
  if (!("erro" in conteudo)) {
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
  }
  else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

var pesquisacep = (valor) => {

  var cep = valor.replace(/\D/g, '');

  if (cep != "") {

    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {

      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      var script = document.createElement('script');

      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      document.body.appendChild(script);

    }
    else {
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  }
  else {
    limpa_formulário_cep();
  }
};
// -------------------------------- FIM DA VALIDAÇÃO DE CEP POR MEIO DE API
$(function() {
  $("#cpf").mask('000.000.000-00')
});
