







function ConfiguraModalLogin()
{
     //Ao exibir o modal login, esconder todos os elementos da página
    (
        function($) {
        'use strict';
        $('#ModalLogin').on('show.bs.modal', function(event) {
            $('.container-scroller').hide();
        })
    })(jQuery);


    //configura validação e ações para funcionar
    (function($) {
      
        $("#form-login").validate({
          debug: true,
    
          submitHandler: function(form) {
            //verificar se existe o email já está cadastrado
                    email = $('#txtLoginUsuario').val().toString(); 
                    senha = $('#txtLoginSenha').val().toString();
                    
                    Parse.User.logIn(email,senha).then((user) => {
                      // Do stuff after successful login
                        // console.log(user);
                    }).catch(error => {
                         //invalido usuario 
                       
                            const Usuarios = Parse.Object.extend('Usuarios');
                            const query = new Parse.Query(Usuarios);
                            query.equalTo("Email", email);
                            query.find()
                            .then
                            (
                              (results) => {
                              // You can use the "get" method to get the value of an attribute
                              // Ex: response.get("<ATTRIBUTE_NAME>")
                                var obj = results[0].attributes;
                                if (obj.Admin == true)
                                {
                                      
    
                                     if (obj.PossuiLogin == undefined)
                                     {
                                        swal('criar senha','você precisa criar sua senha','warning');
                                     }
                                     else
                                     {
                                        swal('login','Login ou senha inválidos','error');
                                     }
                                }
                                else 
                                {
                                  swal('não autorizado','Usuário não autorizado','error');
                                }
    
                            }, 
                             (error) => {
                                 swal('inválido','Usuário inválido','error');
                                     }
                            );
    
                         //verifica se existe o usuario 
                    })
    
    
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
}



function ConfiguraModalCadastrarEmail()
{
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
}
