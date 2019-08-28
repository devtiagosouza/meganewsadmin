
//runtimes
(
    function($) {
   

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


