//inicializa as keys e parse config
  configuraModalLogin();
  configuraModalNovoUsuario();
  configuraModalNovoAcesso();
  configuraModalPerfil();
 
  //Ao exibir o modal login, esconder todos os elementos da página
function  configuraModalNovoUsuario()
{
   (function($) {
    $("#form-criarsenha").validate({
        debug: true,
        submitHandler: onCriarUsuario,
        rules : RulesLoginNovaSenha,
        messages: MessagesLoginNovaSenha,
        
        errorPlacement: DefaultErrorPlacement,
        highlight: DefaultHighlight
    })
  })(jQuery);
}

function configuraModalInfoMegaChaveApp()
{
    (
      function($) {
    'use strict';
    $('#ModalInfoMegaChaveApp').on('show.bs.modal', function(event) {
        
       // $('#txtLoginUsuario').val("");
       // $('#txtLoginSenha').val("");
    })
    
    })(jQuery);
}


function configuraModalLogin()
{  
   (
    function($) {
   'use strict';
   $('#ModalLogin').on('show.bs.modal', function(event) {
       $('.container-scroller').hide();
       $('#txtLoginUsuario').val("");
       $('#txtLoginSenha').val("");
   })
  
   })(jQuery);


  (function($) {
      
    $("#form-login").validate({
      debug: true,
      submitHandler: onLogin,
      rules : RulesLogin[0],
      messages: RulesLogin[1],
      errorPlacement: DefaultErrorPlacement,
      highlight: DefaultHighlight
    });

})(jQuery);

}

function onLogin(form)
{
      var email = $('#txtLoginUsuario').val().toString(); 
      var senha = $('#txtLoginSenha').val().toString();

      ShowLoading();
      Parse.User.logIn(email,senha).then(
        (user) => {
             CloseLoading();
             doLoginOK();
        }
      ).catch(
          (error) => {
            CloseLoading();
            swal("Inválido","Login e/ou senha inválidos "+error,"error");
          }
          //verifica se existe o usuario 
      ); 

     /*
      Parse.User.logIn(email,senha).then(
        (user) => {
             CloseLoading();
             doLoginOK();
         }
      ).catch(
          
          (error) => {
            VerificaSeEhAdmin(email);
          }
          //verifica se existe o usuario 
      );    */
}

function onCriarUsuario(form)
{
      //criar o usuário   
      const user = new Parse.User()
               
      var xUserName = $("#ModalUserName").text().toString();
      var xEmail = $("#ModalEmail").text().toString();
      var xPass = $("#txtLoginNovaSenha").val().toString();

      user.set('username', xUserName);
      user.set('email', xEmail);
      user.set('password',xPass);

      user.signUp().then((user) => {
          
          PutPossuiLogin(xEmail, true);
         
          //depois de cadastrar, fechar o modal 
          $('#ModalCriarUsuario').modal('hide');
         
          CloseLoading();
          ShowLogin();

          
          swal('Admin Cadastrado','Novo Usuário Administrador cadastrado com sucesso!\n','success');
      }).catch(error => {
         CloseLoading();
         swal('Erro!','Erro ao cadastrar usuário \n'+error,'error');
      });
}

function configuraModalNovoAcesso()
{
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
}

function configuraModalPerfil()
{

  (function($) {
    'use strict';
    $('#ModalPerfil').on('show.bs.modal', function(event) {
   
   
    var modal = $(this)
    modal.find('.name').text(Parse.User.Username);
    modal.find('.designation').val(Parse.User.Email);
    
    })


   })(jQuery);
}




//verifica se deu erro de invalid sessino token, neste caso deve fazer login novamente
function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      {
        Parse.User.logOut();
        verificalogin();
      }
     
  }
}








function TemLoginCriado(objeto)
{
try
{
   var possui = objeto.PossuiLogin;
   return possui;
}
catch(e)
{
    return false;
}
}

function ShowLogin()
{

  

  $('#ModalLogin').modal({
      keyboard : false,
      focus : true,
      backdrop : false
  });
}

function ShowMenu()
{
   $('body').removeClass();
}
function CloseMenu()
{
   $('body').addMenu("sidebar-icon-only");
}


function doLoginOK()
{
try
{
    CloseLogin();
    $('.container-scroller').show();

      
   $('#spanNomeUsuario1').text(Parse.User.current().getUsername());
   $('#spanNomeUsuario2').text(Parse.User.current().getUsername()); 

   $('.name').text(Parse.User.current().getUsername());
   $('.designation').text(Parse.User.current().getEmail());
  
  //exibir o menu principal
  

  $('#logoffLateral').show();
  $('#fazerLogin').hide();
  $('#comboUsuario').show();
  $('#divSidebar').show();


   ShowMenu();

  
}
catch(e)
{
  console.log(e);
}
}
function CloseLogin()
{
   $('#ModalLogin').modal('hide');
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
          if (results.length == 0)
          {
              CloseLoading();
              swal('inválido','Usuário inválido','Error');
              console.log(results);
          }
          else 
          {
                try
                {
                    var obj = results[0].attributes;
                    var nomeUsuario = obj.Usuario;
                    
                      if (TemLoginCriado(obj))
                      {
                        CloseLoading();
                        swal('Inválido','Login ou senha inválidos','error');
                      }
                      else
                      {
                        CadastraNovoAdmin(aEmail,nomeUsuario);
                      }
                }
                catch(e)
                {
                console.log(e);
                }
          }
      },
      (error) => {
        CloseLoading();
        swal('inválido','Usuário inválido '+error,'error');
        
      }
    );

}


function PutPossuiLogin(aEmail, possuiLogin)
{
var Usuarios = Parse.Object.extend('Usuarios');
var query = new Parse.Query(Usuarios);
query.equalTo("Email", aEmail);
query.find().then((results) => {
    var objectID = results[0].id;
    var query = new Parse.Query(Usuarios);
    query.get(objectID).then((object) => {
         object.set("PossuiLogin",possuiLogin);
         object.save().then((response) => {
            
          });        
    });

}, (error) => {
    
});
}

function CadastraNovoAdmin(aemail,ausername)
{
//fecha o modal de login;
$('#ModalLogin').modal('hide')
$('#ModalUserName').text(ausername);
$('#ModalEmail').text(aemail);

CloseLoading();

$('#ModalCriarUsuario').modal({
  keyboard : false,
  focus : true,
  backdrop : false
 
 })
}




function Logoff()
{

 swal({
  title: 'Logoff',
  text: 'Confirma Logoff?',
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
)
.then(
  (isConfirm) => {
    if (isConfirm)
    {
       Parse.User.logOut();
       ShowLogin();
    }
  }

);




}

(function($) {
  showSuccessToast = function(titulo,mensagem) {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: titulo,
      text: mensagem,
      showHideTransition: 'slide',
      icon: 'success',
      loaderBg: '#f96868',
      position: 'top-right'
    })
  };
  showInfoToast = function() {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'Info',
      text: 'And these were just the basic demos! Scroll down to check further details on how to customize the output.',
      showHideTransition: 'slide',
      icon: 'info',
      loaderBg: '#46c35f',
      position: 'top-right'
    })
  };
  showWarningToast = function() {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'Warning',
      text: 'And these were just the basic demos! Scroll down to check further details on how to customize the output.',
      showHideTransition: 'slide',
      icon: 'warning',
      loaderBg: '#57c7d4',
      position: 'top-right'
    })
  };
  showDangerToast = function() {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'Danger',
      text: 'And these were just the basic demos! Scroll down to check further details on how to customize the output.',
      showHideTransition: 'slide',
      icon: 'error',
      loaderBg: '#f2a654',
      position: 'top-right'
    })
  };
  showToastPosition = function(position) {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'Positioning',
      text: 'Specify the custom position object or use one of the predefined ones',
      position: String(position),
      icon: 'info',
      stack: false,
      loaderBg: '#f96868'
    })
  }
  showToastInCustomPosition = function() {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'Custom positioning',
      text: 'Specify the custom position object or use one of the predefined ones',
      icon: 'info',
      position: {
        left: 120,
        top: 120
      },
      stack: false,
      loaderBg: '#f96868'
    })
  }
  resetToastPosition = function() {
    $('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right mid-center'); // to remove previous position class
    $(".jq-toast-wrap").css({
      "top": "",
      "left": "",
      "bottom": "",
      "right": ""
    }); //to remove previous position style
  }
})(jQuery);



function verificalogin()
{  
 
    var currentUser = Parse.User.current();
    if (currentUser) {
        ShowBody();
        doLoginOK();
        
    } else {
      
         ShowLogin();
    }
}


$('#logoffLateral').hide();
$('#fazerLogin').hide();
$('#comboUsuario').hide();
$('#divSidebar').hide();

Parse.initialize(cApplicationID, cJavaScriptAPIKey,cMasterKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
verificalogin();