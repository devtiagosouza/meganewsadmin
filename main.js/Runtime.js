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
        submitHandler: onCriarUsuario,
        rules : RulesLoginNovaSenha,
        messages: MessagesLoginNovaSenha,
        
        errorPlacement: DefaultErrorPlacement,
        highlight: DefaultHighlight
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
      submitHandler: onLogin,
      rules : RulesLogin[0],
      messages: RulesLogin[1],
      errorPlacement: DefaultErrorPlacement,
      highlight: DefaultHighlight
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
 

ShowLogin();