/* Defina a largura da barra lateral para 250px e a margem esquerda do conteúdo da página para 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("container").style.marginLeft = "250px";
}
  
/* Defina a largura da barra lateral para 0 e a margem esquerda do conteúdo da página para 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("container").style.marginLeft = "0";
}/* Defina a largura da barra lateral para 250px e a margem esquerda do conteúdo da página para 250px */

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("container").style.marginLeft = "250px";
}

/* Defina a largura da barra lateral para 0 e a margem esquerda do conteúdo da página para 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("container").style.marginLeft = "0";
}

// ------------------------------------------ EVENTOS DE CADASTROS DE PETS
var confirmPet = () => {
  alert("Pet Cadastrado com sucesso!");
};

var confirmDelete = (event) => {
  var option = confirm('EXCLUIR');
  if (option) {
    
  }else{
    event.preventDefault();
  }
};

var editPet = () => {
  alert("Alterações Feitas com sucesso!");
}