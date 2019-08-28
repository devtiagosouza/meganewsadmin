(function($) {
    $("#form-criarsenha").validate({
        debug: true,
        submitHandler: function(form) {
              //criar o usuário   
              const user = new Parse.User()
               
              var xUserName = $("#ModalUserName").val().toString();
              var xEmail = $("#ModalEmail").val().toString();
              var xPass = $("#txtLoginNovaSenha").val().toString();
  
              user.set('username', xUserName);
              user.set('email', xEmail);
              user.set('password',xPass);
  
              user.signUp().then((user) => {
                 console.log('User signed up', user);
              }).catch(error => {
                 console.error('Error while signing up user', error);
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
  })(jQuery)
  