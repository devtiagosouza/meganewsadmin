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

   document.querySelectorAll('.wrapper').forEach(el => el.remove());
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

function AdicionaCard(obj)
{
   var cardbody = document.getElementById("CorpoCard");
   var divPai = document.createElement('div');
   divPai.id = obj.id;
   divPai.className = 'wrapper d-flex align-items-center py-2 border-bottom';
  
   var imgElement = document.createElement('img');
   imgElement.className = "img-sm rounded-circle";
   imgElement.src = "https://placehold.it/100x100";

   var InfoRegistro = (() => 
   {
       if (obj.attributes.Registrado == true)
       {
         if  ((obj.attributes.DataRegistro == undefined) || (obj.attributes.DataRegistro == null) || ( new Date(obj.attributes.DataRegistro).getFullYear() == 1969))
              return "";
         else 
         {
             return `registrado em ${new Date(obj.attributes.DataRegistro).toLocaleDateString("pt-BR")} `+
             `- ${obj.attributes.ModeloAparelho} -vers.: ${obj.attributes.VersaoAndroid}`; 
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



     var divNome = document.createElement('div');
     divNome.className = "wrapper ml-3";
     var nomeUsuario = document.createElement('h6');
     nomeUsuario.className = "mb-0";
     nomeUsuario.innerHTML = '<strong>'+obj.attributes.Usuario+'</strong>';

     var xEmail = document.createElement('medium');
     xEmail.className = "text-muted mb-0";
     xEmail.innerText = obj.attributes.Email;

     var xInfo =  document.createElement('small')
     xInfo.className = "text-muted mb-0";
     

     var divImagem = document.createElement('div');
     divImagem.className = "badge badge-pill badge-primary ml-auto px-1 py-1";
    ''
     if (InfoRegistro != "")
     {
        var iStatus = document.createElement('i');
        iStatus.className = 'mdi mdi-cellphone-arrow-down';
        divImagem.appendChild(iStatus);
      
      
        xInfo.innerHTML = " <br>"+InfoRegistro+" DeviceID:"+obj.attributes.DeviceId;    

  
          var btnResetar = document.createElement('input');
          btnResetar.type = "button";
          btnResetar.value = "Resetar";
          btnResetar.className = 'btn btn-warning btn-xs';

          btnResetar.addEventListener('click', ResetarUser);
          xInfo.appendChild(btnResetar);

     }

                var AtivarButton = document.createElement('button');
                if (obj.attributes.Ativo)
                {
                  AtivarButton.className="btn btn-outline-danger btn-xs"
                  AtivarButton.innerText = 'desativar';
                  AtivarButton.addEventListener('click', InativarUser);
                  AtivarButton.value = 'desativar';
                 }
                else  
                {
                  AtivarButton.className="btn btn-outline-primary btn-sm"
                  AtivarButton.innerText = 'ativar';
                  AtivarButton.addEventListener('click', AtivarUser);
                  AtivarButton.value = 'Ativar';
                }
               
                var btnDelete = document.createElement('input');
                btnDelete.type = "button";
                btnDelete.value = "Excluir";
                btnDelete.className = 'btn btn-danger btn-xs';
  
                              
                btnDelete.addEventListener('click', ExcluirUser);
                
  

              var divButtons =document.createElement('div');
              xInfo.appendChild(AtivarButton);
              xInfo.appendChild(btnDelete);

     
     
    /* <div class="badge badge-pill badge-primary ml-auto px-1 py-1">
       <i class="mdi mdi-check font-weight-bold"></i>
     </div>*/
    
     
     divNome.appendChild(nomeUsuario);
     divNome.appendChild(xEmail);
     divNome.appendChild(xInfo);
     divNome.appendChild(divImagem);

   

    divPai.appendChild(imgElement);
    divPai.appendChild(divNome);
    divPai.appendChild(divButtons);

    if (obj.attributes.Ativo == false) 
    {
      divPai.style.setProperty("text-decoration", "line-through");
    }

   cardbody.appendChild(divPai);
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



