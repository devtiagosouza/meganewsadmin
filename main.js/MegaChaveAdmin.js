

/**************************************************************/
/* TIAGO SOUZA                                                 */
/************************************************************ */

/************  KEYS DE ACESSO ***********************************/
const cApplicationID = "0lMShoD8rKkzIpQknQxTRGElezYMQ1qXiu5aJnRZ";
const cRestAPIkey = "z5oT880eMQe9mw6PAgPUXJbXav14zSF3t7P1DOYK";
const cJavaScriptAPIKey  = "czVvVaGgG8GnEqJK3PhDHRa4b7CJp1GG66Xp056p";
const cMasterKey = "5jBIHZaUkGhmRZdtf5U4FsnbsBa0dC9kLTNA9Arh";
const cServerUrl = "https://megachaveapp.back4app.io";
var sessionToken = "";

var Logado = false;



const RestApiHeaders = function(xhr) {
                        xhr.setRequestHeader('X-Parse-Application-Id', cApplicationID);
                        xhr.setRequestHeader('X-Parse-REST-API-Key',cRestAPIkey);
};

Parse.serverURL = cServerUrl;
Parse.initialize(cApplicationID, cJavaScriptAPIKey,cMasterKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
const cUsuariosUrl = `${cServerUrl}/classes/Usuarios`;
const CFuncionName = 'userExists';

 //MÉTODO parse para chamar uma cloud function
function userExists(aEmail) {
  return new Promise((resolve, reject) => {
    const Usuarios = Parse.Object.extend('Usuarios');
    const query = new Parse.Query(Usuarios);
    query.equalTo("Email",aEmail);
    ShowLoading();
    query.find()
    .then(
      (users) => {
        CloseLoading();
        resolve(users.length > 0);
      },
      (error) => {
                CloseLoading();
                reject(error);
              }
    );
  })
                
}
 
 EmptyTable();

 function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
  }
 }



  //Ao exibir o modal login, esconder todos os elementos da página
 (
   function($) {
  'use strict';
  $('#ModalLogin').on('show.bs.modal', function(event) {
    $('.container-scroller').hide();
  })
 
})(jQuery);
 
if (sessionToken == "") 
  {
    $('#ModalLogin').modal({
        keyboard : false,
        focus : true,
        backdrop : false
    });
}


function CadastraNovoAdmin(aemail,ausername)
{
  //fecha o modal de login;
  $('#ModalLogin').modal('hide')
  $('#ModalUserName').text(ausername);
  $('#ModalEmail').text(aemail);

  $('#ModalCriarUsuario').modal({
    keyboard : false,
    focus : true,
    backdrop : false
   
   })
}

 






/*Metodo anônimo para atribuição dos dados do formulário modal */
(function($) {
  'use strict';
  $('#exampleModal-4').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
   
    
    var modal = $(this)
    modal.find('.modal-title').text('Novo Usuário ')
    modal.find('.modal-body input').val(recipient)
    
  })

 
})(jQuery);










function txtNome_change()
{
  var texto = "";
  var nomedigitado = $('#txtNome').val().toLowerCase();
  if (nomedigitado.trimLeft().trimRight() != '')
  {
      texto = nomedigitado.replace(/\s+/g,'.'); 
      texto+='@meganews.com.br';
  }

   $('#txtEmail').val(texto);
};



(function($) {

  $("#form-criarsenha").validate({
      debug: true,
      submitHandler: function(form) {
            //criar o usuário   
            const user = new Parse.User()
             
            var xUserName = $("#ModalUserName").text().toString();
            var xEmail = $("#ModalEmail").text().toString();
            var xPass = $("#txtLoginNovaSenha").val().toString();

            user.set('username', xUserName);
            user.set('email', xEmail);
            user.set('password',xPass);

            user.signUp().then((user) => {
                //depois de cadastrar, fechar o modal 
                $('#ModalCriarUsuario').modal('hide');
               
                console.log('User signed up', user);
                $('#ModalLogin').modal({
                  keyboard : false,
                  focus : true,
                  backdrop : false
                });

                 UpdateUser()

                swal('Admin Cadastrado','Novo Usuário Administrador cadastrado com sucesso!\n','success');
            }).catch(error => {
               swal('Erro!','Erro ao cadastrar usuário \n'+error,'error');
               console.error('Erro ao cadastrar usuário', error);
            });
      },
      rules :
      {
           xLoginNovaSenha : 
           {
              minlength : 6,
              required : true
           },
           xLoginConfirmaSenha :
           {
               equalTo: "#txtLoginNovaSenha"
           }
      },
      messages:
      {
            xLoginNovaSenha : {
                    required : 'Defina uma senha de acesso',
                    minlength : jQuery.validator.format("a senha deve ter pelo menos {0} caracteres!")
            },
            xLoginConfirmaSenha : {
                    equalTo : "A confirmação de senha deve ser igual a senha definida no campo acima"
            }
      },
      errorPlacement: function(label, element) {
        label.addClass('mt-2 text-danger');
        label.insertAfter(element);
      },
      highlight: function(element, errorClass) {
              $(element).parent().addClass('has-danger')
              $(element).addClass('form-control-danger')
      }
  })
})(jQuery);


/* Metodo anõnimo para atribuição de validação do formulario de cadastro de usuários */
(function($) {
   

  $("#form-cadastrar").validate({
      debug: true,

      submitHandler: function(form) {
         //verificar se existe o email já está cadastrado
         ShowLoading();
         $('#btn-cadastrar').disabled = true;
         
         userExists($('#txtEmail').val())
         .then(
            (exists) => {
                  if (exists==true)
                  {
                     CloseLoading();
                     swal("E-mail inválido!", `O email ${$('#txtEmail').val()} já está cadastrado`,"warning");
                     $('#btn-cadastrar').disabled = false;
                  }
                  else 
                  {
                      CadastrarUser();
                      CloseLoading();
                  }
            },
            (error) =>
            {
               swal("Erro!", 'Erro ao conectar servidor',"warning");
               $('#btn-cadastrar').disabled = false;
            }

         );

  
        },
      rules: 
      {
        xnome : {
                 required : true,
                 minlength : 5
        },
        xemail : {
                 required : true,
                 email : true
                 
        }
      },
      messages:
      {
            xnome : {
                    required : 'Digite o nome do usuário',
                    minlength : jQuery.validator.format("O nome de usuário deve ter pelo menos {0} caracteres!")
            },
            xemail : {
                    required : 'Digite o E-mail de acesso para o usuário',
                    email: "O endereço de e-mail deve estar no formado xxxx@meganews.com.br",
                    remote: jQuery.validator.format("{0} já está cadastrado.")
            }
      },
      errorPlacement: function(label, element) {
                                               label.addClass('mt-2 text-danger');
                                               label.insertAfter(element);
      },
      highlight: function(element, errorClass) {
                                               $(element).parent().addClass('has-danger')
                                               $(element).addClass('form-control-danger')
      }

  });




})(jQuery);

function TemLoginCriado(objeto)
{
  try
  {
     var possui = obj.PossuiLogin;
     return possui;
  }
  catch(e)
  {
      return false;
  }
}

function VerificaSeEhAdmin(aEmail)
{
  const Usuarios = Parse.Object.extend('Usuarios');
  const query = new Parse.Query(Usuarios);
  query.equalTo("Email", aEmail);
  query.find()
  .then(
    (results) => 
    {
       var obj = results[0].attributes;
       var nomeUsuario = obj.Usuario;
       
        if (TemLoginCriado(obj))
        {
          swal('login','Login ou senha inválidos','error');
         
        }
        else
        {
          CadastraNovoAdmin(aEmail,nomeUsuario);
        }

    },
    (error) => {
       swal('inválido','Usuário inválido '+error,'error');
       handleParseError(error);
    }
  );

}

(function($) {
      
    $("#form-login").validate({
      debug: true,

      submitHandler: function(form) {
        //verificar se existe o email já está cadastrado
                var email = $('#txtLoginUsuario').val().toString(); 
                var senha = $('#txtLoginSenha').val().toString();

                Parse.User.logIn(email,senha).then(
                  (user) => {
                  // Do stuff after successful login
                    // console.log(user);
                            $('.container-scroller').show();
                           }
                ).catch(
                    (error) => {
                        VerificaSeEhAdmin(email);
                    }
                    //verifica se existe o usuario 
                );


                //fluxo=
                
              /*  if (existeUSER)
                {
                     faz login normalmente
                     pega o token
                }
                else
                {
                   if (existeUSUARIO)
                   {
                      if (isAdmin)
                      {
                            pede pra cadastrar uma senha
                            faz cadastro em user
                            pega o token
                      }
                      else 
                      {
                          throw não tem autorização
                      }
                   }
                   else 
                   {
                      throw não existe.
                   }
                }*/
      },
      rules: 
      {
        xLoginUsuario : {
                required : true,
                minlength : 5,
                email : true
        },
        xLoginSenha : {
                required : true,
               
                
        }
      },
      messages:
      {
          xLoginUsuario : {
                    required : 'Digite o E-mail',
                    minlength : jQuery.validator.format("O E-mail deve ter pelo menos {0} caracteres!"),
                    email: "O endereço de e-mail deve estar no formado xxxx@meganews.com.br"
            },
            xLoginSenha : {
                    required : 'Digite a senha',
                    
                    
            }
      },
      errorPlacement: function(label, element) {
                                              label.addClass('mt-2 text-danger');
                                              label.insertAfter(element);
      },
      highlight: function(element, errorClass) {
                                              $(element).parent().addClass('has-danger')
                                              $(element).addClass('form-control-danger')
      }

    });

})(jQuery);


function CloseLoading()
{
  $('body').loadingModal('hide');
  $('body').loadingModal('destroy')
}

function ShowLoading(aMessage= "Aguarde...")
{
  $('body').loadingModal({text: aMessage});
  $('body').loadingModal('animation', 'rotatingPlane').loadingModal('backgroundColor', 'white');
}

function CadastrarUser()
{
    var nomeUsuario = document.querySelector('#txtNome').value;
    var EmailUsuario = document.querySelector('#txtEmail').value;
    
    var isAtivo = document.querySelector("#chkAtivo").checked;
    var isAdmin = document.querySelector("#chkAdmin").checked;
    var isDesenvolvedor = document.querySelector("#chkDesenvolvedor").checked;
   

    const Usuarios = Parse.Object.extend('Usuarios');
    const myNewObject = new Usuarios();

    myNewObject.set('Usuario', nomeUsuario);
    myNewObject.set('Ativo', isAtivo);
    myNewObject.set('Email', EmailUsuario.toLowerCase());
    myNewObject.set('Desenvolvedor', isDesenvolvedor);  
    myNewObject.set('Admin', isAdmin);
    myNewObject.set('DeviceId', '');
    myNewObject.set('Registrado', false);
    myNewObject.set('Api', 0);
    myNewObject.set('VersaoAndroid', '');
    myNewObject.set('ModeloAparelho', '');
    myNewObject.set('DataRegistro', null);
    myNewObject.set('ProductName', '');
    myNewObject.set('BuildID', '');
    myNewObject.set('Manufacturer', '');

    myNewObject.save().then(
      (result) => {
        swal("Sucesso!", "Usuário criado com sucesso!"
        , "success");
       
        ListarUsers();
        $('#btn-cancelar').click();

      },
      (error) => {
        
        swal("Erro!", "Ocorreu um erro enquanto criava usuario!\n"+
        error
        , "error");
      }
    );
}




function EmptyTable()
{ 
   document.querySelectorAll('.trHeadClass > th').forEach(el => el.remove());
   document.querySelectorAll('.trElement').forEach(el => el.remove());
}

function PutPossuiLogin(aEmail, possuiLogin)
{
  const Usuarios = Parse.Object.extend('Usuarios');
  const query = new Parse.Query(Usuarios);
  query.equalTo("Email", aEmail);
  query.find().then((results) => {
    
  }, (error) => {
       
  });
}

function UpdateUser(UserID, Nome, UserObject)
{
   Confirma('Confirmação',"Confirma Atualização de dados?\n\n"+UserID+' '+Nome+'\n'+
  ' '+JSON.stringify(UserObject).replace(/,/g, "\n")
   
   )
   .then((isConfirm) => {
    if (isConfirm == true)
    {
      ShowLoading();
      $.ajax(cUsuariosUrl+'/'+UserID, {
        contentType: 'application/json',
        format:"json",
        crossDomain: true,
        data: JSON.stringify(UserObject),
        method: 'PUT',
        beforeSend: RestApiHeaders,
        send : function( event, jqxhr, settings )
        {
           
        },
        error: function(jqXHR, textStatus, errorThrown) {
          CloseLoading();
          alert('Erro de parâmetro'+ textStatus, errorThrown);
        },
        success:  function(data) {
          ListarUsers();
          CloseLoading();
          swal({
            title: 'Sucesso!',
            text: 'Parâmetros de usuário alterados com sucesso\n\n'+
            JSON.stringify(UserObject).replace(/,/g, "\n")
            ,
            icon: 'success',
            button: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-primary"
            }
          })
    
          // alert("Parâmetros de usuário alterados com sucesso")
        }
      });
           
    }
 
});  

  
}


function Confirma(titulo, mensagem)
{
 return swal({
    title: titulo,
    text: mensagem,
    icon: 'warning',
    buttons: {
      cancel: {
        text: "Não",
        value: null,
        visible: true,
        className: "btn btn-danger",
        closeModal: true,
      },
      confirm: {
        text: "Sim",
        value: true,
        visible: true,
        className: "btn btn-primary",
      }
    }
  }
 );
  

}

function ExcluirUser()
{
   var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
   var Nome = this.closest('tr').querySelector('.usuarioClass').innerText; 


   Confirma('Confirmação',"Confirma Exclusão de Usuário?\n\n"+ID+' '+Nome  
    )
    .then((isConfirm) => {
      if (isConfirm == true)
      {
        ShowLoading();
        const Usuarios = Parse.Object.extend('Usuarios');
        const query = new Parse.Query(Usuarios);
        // here you put the objectId that you want to delete
        query.get(ID).then
        (
          (object) => {
          object.destroy().then((response) => {
                
                ListarUsers();
                CloseLoading();
                swal("Sucesso!", "Usuário Excluído com sucesso!", "success");
          }, (error) => {
            CloseLoading();
            swal("Erro!", "Erro enquanto excluia o usuário!", "error");  
          });
        });
      }

    });


}


function InativarUser()
{
  var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
  var nome = this.closest('tr').querySelector('.usuarioClass').innerText; 

        UpdateUser(ID,nome, { 
           Ativo : false
        });
  
}
function AtivarUser()
{

  var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
  var nome = this.closest('tr').querySelector('.usuarioClass').innerText; 

        UpdateUser(ID,nome, { 
           Ativo : true
        });

}

function ResetarUser()
{
   var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
   var nome = this.closest('tr').querySelector('.usuarioClass').innerText; 
                     
   UpdateUser(ID,nome,
         {
                     DeviceId : "",
                     Registrado : false,
                     DataRegistro : null,
                     ModeloAparelho : "",
                     VersaoAndroid : "",
                     Api : null,
                     BuildID : "",
                     Manufacturer : "",
                     ProductName : ""
        }
    );
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
                  tdButton.className="btn btn-outline-danger btn-sm"
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

              trElement.appendChild(tdElement);
            }

            function addDeleteButton(trElement)
            {
              var btnDelete = document.createElement('input');
              btnDelete.type = "button";
              btnDelete.value = "Excluir";
              btnDelete.className = 'btn btn-danger btn-sm';

              btnDelete.addEventListener('click', ExcluirUser);
              trElement.appendChild(btnDelete);
            }

            function addResetButton(trElement)
            {
              var btnResetar = document.createElement('input');
              btnResetar.type = "button";
              btnResetar.value = "Resetar";
              btnResetar.className = 'btn btn-warning btn-sm';

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

function AdicionaHeaders()
{
   document.querySelectorAll('.trHeadClass > th').forEach(el => el.remove());

   var theadElement = document.getElementById("trHead");
   
   var colunas = [
     'id',
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

function ListarUsers()
{
    const Usuarios = Parse.Object.extend('Usuarios');
    const query = new Parse.Query(Usuarios);
    query.ascending("Email");
    ShowLoading();
    EmptyTable();
    query.find()
    .then(
      (users) => {
        EmptyTable();
        AdicionaHeaders();
        users.forEach(usuario => {
            
          AdicionaItemGrid(usuario)

        });
        CloseLoading();
      },
     (error) => {
                CloseLoading();
                swal("Erro!", "Erro ao conectar ao servidor!\n"+errorThrown, "error");
              }
    );
}


