//inicializa as keys e parse config
  configuraModalLogin();
  configuraModalNovoUsuario();
  configuraModalNovoAcesso();
  //Ao exibir o modal login, esconder todos os elementos da página
 

function  configuraModalNovoUsuario()
{
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
}


function configuraModalLogin()
{  
   (
    function($) {
   'use strict';
   $('#ModalLogin').on('show.bs.modal', function(event) {
     $('.container-scroller').hide();
   })
  
   })(jQuery);


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
                    required : 'Digite a senha'
                    
                    
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

Parse.initialize(cApplicationID, cJavaScriptAPIKey,cMasterKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
 