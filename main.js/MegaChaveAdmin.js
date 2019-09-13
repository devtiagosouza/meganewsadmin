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

   document.querySelectorAll('.corpoTabela').forEach(el => el.remove());
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
            btn.className = aclasse;
            btn.setAttribute('data-id',UserObj.id);
            btn.setAttribute('data-name',UserObj.attributes.Usuario);
            btn.addEventListener('click', afunction);
            adicionaIconeTexto(btn,aicone,acaption);
            
      divItem.appendChild(btn);

      return divItem;
    };

    //btn btn-light 

    var btnMenu = document.createElement('div');
    btnMenu.style
   btnMenu.className = "dropdown-toggle text-primary";
   btnMenu.id ="dropdownMenuIconButton7";
  // btnMenu.innerHTML =  '<strong><i class="mdi mdi-account"><a href="">'+UserObj.attributes.Usuario+'</a></i></strong>';
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

   // adicionaIcone(btnMenu,"account");


  /*var nomeUsuario = document.createElement('div');
            nomeUsuario.className = "text-primary";
            nomeUsuario.innerHTML = '<strong>'+UserObj.attributes.Usuario+'</strong>';
   btnMenu.appendChild(nomeUsuario);*/


   var divDropItens = document.createElement("div");
   divDropItens.className = "dropdown-menu";
   divDropItens.setAttribute("aria-labelledby","dropdownMenuIconButton7");
   divDropItens.setAttribute("x-placement","top-start");
   divDropItens.style.position = "absolute";
   divDropItens.style.transform = "translate3d(0px, -185px, 0px); top: 0px; left: 0px; will-change: transform";

   
   var tituloDrop = document.createElement("h6");
   tituloDrop.className = "dropdown-header";
   tituloDrop.innerText = `<<${UserObj.attributes.Usuario}>>`;


   //divDropItens.appendChild(tituloDrop);

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
   //var colunaAcoes = document.createElement('td');

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
   /*  divUsuario.appendChild(
        function()
        {   
            var nomeUsuario = document.createElement('div');
            nomeUsuario.className = "text-primary";
            nomeUsuario.innerHTML = '<strong>'+obj.attributes.Usuario+'</strong>';
            return nomeUsuario;
        }()
     );*/
    
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
   /* colunaAcoes.appendChild(  
       CreateMenuActions(obj)
    );*/
   

    if (obj.attributes.Ativo == false) 
    {
      colunaUsuario.style.setProperty("text-decoration", "line-through");
    }

   
   trElement.appendChild(colunaProfile);
   trElement.appendChild(colunaUsuario);
  // trElement.appendChild(colunaAcoes); 

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

function AdicionaItemGrid (obj) 
{           
            function add(trElement,Texto, nomeClasse, idElement = "")
            {


              var tdElement = document.createElement('td');
              tdElement.innerText = Texto;
              if (idElement != "")
              {
                tdElement.id = idElement;
              }
              tdElement.className = nomeClasse;
              if (nomeClasse == 'ativoClass')
              {
                tdButton = document.createElement('button');
                if (Texto == 'Ativo')
                {
                  tdButton.className="btn btn-outline-danger btn-xs"
                  tdButton.innerText = 'desativar';
                  tdButton.addEventListener('click', InativarUser);
                  tdButton.value = 'desativar';
                 }
                else  
                {
                   tdButton.className="btn btn-outline-primary btn-sm"
                  tdButton.innerText = 'ativar';
                  tdButton.addEventListener('click', AtivarUser);
                  tdButton.value = 'Ativar';
                }
                tdElement.appendChild(tdButton);
              }
              else if (nomeClasse == "infoRegistroClass")
              {
                 addResetButton(tdElement);
              }
              else if (nomeClasse == "idUsuarioClass")
              {
             
                tdElement.style.display = "none";
              }

              trElement.appendChild(tdElement);
            }

            function addDeleteButton(trElement)
            {
    
               
              var btnDelete = document.createElement('input');
              btnDelete.type = "button";
              btnDelete.value = "Excluir";
              btnDelete.className = 'btn btn-danger btn-xs';

                            
              btnDelete.addEventListener('click', ExcluirUser);
              trElement.appendChild(btnDelete);
            }

            function addResetButton(trElement)
            {
              var btnResetar = document.createElement('input');
              btnResetar.type = "button";
              btnResetar.value = "Resetar";
              btnResetar.className = 'btn btn-warning btn-xs';

              btnResetar.addEventListener('click', ResetarUser);
              trElement.appendChild(btnResetar);
              
            }
           
                    var Perfil = (()=> 
                    {
                        if (obj.attributes.Admin == true)
                          return "Admin"
                        else if (obj.attributes.Desenvolvedor == true)
                          return "Desenvolvedor"
                        else return "-";
                    })();

                    var InfoRegistro = (() => 
                    {
                        if (obj.attributes.Registrado == true)
                        {
                          if  ((obj.attributes.DataRegistro == undefined) || (obj.attributes.DataRegistro == null) || ( new Date(obj.attributes.DataRegistro).getFullYear() == 1969))
                               return "Não fez registro";
                          else 
                          {
                              return `em ${new Date(obj.attributes.DataRegistro).toLocaleDateString("pt-BR")} `+
                              `- Android ${obj.attributes.ModeloAparelho} -vers.: ${obj.attributes.VersaoAndroid}`; 
                          }
                        }
                        else return "Não fez registro";
                    })();

              
                //inicia aqui 
                   var trElement = document.createElement('tr');
                   trElement.className="trElement";

                  add(trElement,obj.id,'idUsuarioClass');
                  add(trElement,obj.attributes.Usuario,'usuarioClass');
                  add(trElement,obj.attributes.Email,'emailClass');
                 
                  if  ((obj.attributes.createdAt == undefined) || (obj.attributes.createdAt == null) || ( new Date(obj.attributes.createdAt).getFullYear() == 1969))
                      add(trElement,'','dataCadastroClass')
                  else 
                      add(trElement,ToDateTime(obj.attributes.createdAt),'dataCadastroClass');
  
                  if  ((obj.attributes.updatedAt == undefined) || (obj.attributes.updatedAt == null) || ( new Date(obj.attributes.updatedAt).getFullYear() == 1969))
                      add(trElement,'','dataAtlzClass')
                  else 
                      add(trElement, ToDateTime(obj.attributes.updatedAt),'dataAtlzClass')
               
                  add(trElement,obj.attributes.DeviceId,'deviceIdClass');
               
                  //status
                  add(trElement,obj.attributes.Ativo == true ? 'Ativo' : 'Inativo','ativoClass'); //(data[index].ativo  == '1') ? 'Ativo' : 'Inativo' );
                  add(trElement, Perfil, 'perfilClass' );
                  add(trElement, InfoRegistro, 'infoRegistroClass' );
                 
   

                  //incluir os botões de acao
                 // addResetButton(trElement);
                  addDeleteButton(trElement);

                  if (obj.attributes.Ativo == false) 
                  {
                      trElement.style.setProperty("text-decoration", "line-through");
                  }
                  document.querySelector('tbody').appendChild(trElement);
          
}


function ShowBody()
{
  $('.container-scroller').show();
}
function CloseBody()
{
  $('.container-scroller').hide();
}

function AdicionaHeaders()
{
 
   document.querySelectorAll('.trHeadClass > th').forEach(el => el.remove());
   


   var theadElement = document.getElementById("trHead");
   
   var colunas = [
     'usuário',
     'e-mail de acesso',
     'cadastro',
     'última atlz',
     'device ID',
     'status',
     'perfil',
     'info registro',
     'comandos'
   ];

   colunas.forEach(c => {
      thElement = document.createElement('th');
      thElement.innerText = c;

      theadElement.appendChild(thElement);
   });

   
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
       // AdicionaHeaders();
        users.forEach(usuario => {
            AdicionaCard(usuario);
         // AdicionaItemGrid(usuario)

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



