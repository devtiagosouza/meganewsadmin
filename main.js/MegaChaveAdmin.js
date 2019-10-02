EmptyTable();


function CloseLoading()
{
  $('body').loadingModal('hide');
  $('body').loadingModal('destroy')
}

function ShowLoading(aMessage= "Aguarde...")
{
  $('body').loadingModal({text: aMessage});
  $('body').loadingModal('animation', 'rotatingPlane').loadingModal('backgroundColor', 'blue');
}


function EmptyTable()
{ 
   document.querySelectorAll('.trHeadClass > th').forEach(el => el.remove());
   document.querySelectorAll('.trElement').forEach(el => el.remove());

   document.querySelectorAll('#corpoTabela > tr').forEach(el => el.remove());
}


function ToDateTime(varDate)
{
        var options = {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        };
                    
    return  new Date(varDate).toLocaleDateString("pt-BR",options);
} 

function CreateMenuActions(UserObj)
{

    var funcAdicionaAcao = function(aclasse, acaption, aicone, afunction)
    {
      var divItem = document.createElement("div");
      divItem.className = "dropdown-item";
  
            var btn = document.createElement('button');
            btn.type = "button";
            btn.style.width = "100%";
            btn.className = aclasse;
            btn.setAttribute('data-id',UserObj.id);
            btn.setAttribute('data-name',UserObj.attributes.Usuario);
            btn.addEventListener('click', afunction);
            adicionaIconeTexto(btn,aicone,acaption);
            
      divItem.appendChild(btn);

      return divItem;
    };

  

    var btnMenu = document.createElement('div');
   
   btnMenu.className = "dropdown-toggle text-primary";
   btnMenu.id ="dropdownMenuIconButton7";
   btnMenu.setAttribute("data-toggle","dropdown");
   btnMenu.setAttribute("aria-haspopup","true");
   btnMenu.setAttribute("aria-expanded","true");
   adicionaIcone(btnMenu,"account");
   
 
    var linkable = document.createElement('a');
    linkable.innerText = UserObj.attributes.Usuario;
    linkable.setAttribute("href","");
    
    var strong = document.createElement('strong');
    strong.appendChild(linkable);


    btnMenu.appendChild(strong);

   var divDropItens = document.createElement("div");
   divDropItens.className = "dropdown-menu";
   divDropItens.setAttribute("aria-labelledby","dropdownMenuIconButton7");
   divDropItens.setAttribute("x-placement","top-start");
   divDropItens.style.position = "absolute";
   divDropItens.style.transform = "translate3d(0px, -185px, 0px); top: 0px; left: 0px; will-change: transform";

   
   var tituloDrop = document.createElement("h6");
   tituloDrop.className = "dropdown-header";
   tituloDrop.innerText = `<<${UserObj.attributes.Usuario}>>`;

   if (UserObj.attributes.Registrado)
   {
      //resetar
      divDropItens.appendChild(
        funcAdicionaAcao( 'btn btn-info', 'resetar', "refresh", ResetarUser )
      );
   }
   
   
   if (UserObj.attributes.Ativo)
   {
      divDropItens.appendChild(
        funcAdicionaAcao( 'btn btn-dark', 'desativar', 'account-off-outline',InativarUser)
      );
                   
   }
   else  
   {

      divDropItens.appendChild(
        funcAdicionaAcao('btn btn-primary', 'ativar', 'account-check',AtivarUser)
      );
   }


   divDropItens.appendChild(
      funcAdicionaAcao('btn btn-danger','excluir','close-circle',ExcluirUser)
   );


   btnMenu.appendChild(divDropItens);

   return btnMenu;

}


function AdicionaCard(obj)
{
   var cardbody = document.getElementById("corpoTabela");
   
   var trElement = document.createElement('tr');

   var colunaProfile = document.createElement('td')
   var colunaUsuario = document.createElement('td');

   var imgProfile = document.createElement('i');
   imgProfile.className = "mdi mdi-account-circle icon-lg";

   /*var imgProfile = document.createElement('img');
   imgProfile.className = "img-sm rounded-circle";
   imgProfile.src = "images/ic_logouser.png"*/

   
   //"https://placehold.it/100x100";

   var InfoRegistro = (() => 
   {
       if (obj.attributes.Registrado == true)
       {
         if  ((obj.attributes.DataRegistro == undefined) || (obj.attributes.DataRegistro == null) || ( new Date(obj.attributes.DataRegistro).getFullYear() == 1969))
              return "";
         else 
         {
             return `registrado em ${new Date(obj.attributes.DataRegistro).toLocaleDateString("pt-BR")} `+
             ` em um ${obj.attributes.Manufacturer} ${obj.attributes.ModeloAparelho} - vers.: ${obj.attributes.VersaoAndroid}`; 
         }
       }
       else return "";
   })();

   var Perfil = (()=> 
                    {
                        if (obj.attributes.Admin == true)
                          return "Admin"
                        else if (obj.attributes.Desenvolvedor == true)
                          return "Desenvolvedor"
                        else return "-";
                    })();

     var divUsuario = document.createElement('div');
        

     //Adiciona o nome do usuário
     divUsuario.appendChild(CreateMenuActions(obj))

    
     //Adiciona o email
     divUsuario.appendChild(
        function()
        {
          var textoEmail = document.createElement('medium');
          textoEmail.className = "text-muted mb-0";
          textoEmail.innerText = obj.attributes.Email;
          return textoEmail;
        }()
     );


    var divInfoRegistro =
      function()
      {
        var xInfo =  document.createElement('small')
        xInfo.className = "text-success mb-0d";
        if (InfoRegistro != "")
        {
           xInfo.innerHTML = "<i class='mdi mdi-cellphone-arrow-down'></i> "+InfoRegistro+" DeviceID: "+obj.attributes.DeviceId;   
        }
        return xInfo;
      }();

     
               
    colunaProfile.appendChild(imgProfile);
    colunaUsuario.appendChild(divUsuario);
    if (InfoRegistro != "")
    {
       colunaUsuario.appendChild(divInfoRegistro);
    }
 

    if (obj.attributes.Ativo == false) 
    {
      colunaUsuario.style.setProperty("text-decoration", "line-through");
    }

   
   trElement.appendChild(colunaProfile);
   trElement.appendChild(colunaUsuario);

   cardbody.appendChild(trElement);
}

function adicionaIconeTexto(insideElement, mdiimagename, texto)
{
    var iElement = document.createElement("i");
    iElement.className = `mdi mdi-${mdiimagename}`;
    iElement.innerText = texto;
    insideElement.appendChild(iElement);
}

function adicionaIcone(insideElement, mdiimagename)
{
    var iElement = document.createElement("i");
    iElement.className = `mdi mdi-${mdiimagename}`;
    insideElement.appendChild(iElement);
}




function ShowBody()
{
  $('.container-scroller').show();
}
function CloseBody()
{
  $('.container-scroller').hide();
}



function ListarUsers(filter = "")
{
    var currentUser = Parse.User.current();
    if (currentUser) {
        
    } else {
        swal("Você não está logado","Atenção","error");
        return;
    }

   var cardbody = document.getElementById("CorpoCard");
   if (cardbody.style.display == "none") 
   {
     cardbody.style.display = "block";
   }

    const Usuarios = Parse.Object.extend('Usuarios');
    var composedQuery = new Parse.Query(Usuarios);
    if (filter != "")
    {
       var filterEmail = filter.toLowerCase();
       var filterPrimeriaMaiuscula = filter.charAt(0).toUpperCase() + filter.slice(1);
        

       var QueryEmail = new Parse.Query(Usuarios);
       QueryEmail.startsWith('Email',filterEmail);


       var QueryNome = new Parse.Query(Usuarios);
       QueryNome.startsWith('Usuario',filterPrimeriaMaiuscula);

  
       composedQuery = Parse.Query.or(QueryEmail,QueryNome)
    }

    composedQuery.ascending("Email");
    ShowLoading();
    EmptyTable();
    composedQuery.find()
    .then(
      (users) => {
        EmptyTable();
        users.forEach(usuario => {
            AdicionaCard(usuario);

        });
        CloseLoading();
      },
     (error) => {
                CloseLoading();
                swal("Erro!", "Erro ao conectar ao servidor!\n"+errorThrown, "error");
              }
    );
}



function  txtNome_change()
{
    textoDigitado = $('#txtNome').val();

    emailCalculado = textoDigitado.replace(/\s/g, '.')+"@meganews.com.br";
    emailCalculado = emailCalculado.toLowerCase();


    $('#txtEmail').val(emailCalculado);

}

function runSearch(event)
{
  if (event.which == 13 || event.keyCode == 13) {
     var digitado =  $('#txtPesquisa').val(); 
    
     ListarUsers(digitado);

    return false;
  }
   return true;
}

function FecharPerfil()
{
  $('#ModalPerfil').modal('hide');
}
function AbrirPerfil()
{
  $('#ModalPerfil').modal({
    keyboard : true,
    focus : true,
    backdrop : true
  });
  

  
}




