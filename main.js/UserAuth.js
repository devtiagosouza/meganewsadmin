


//verifica se deu erro de invalid sessino token, neste caso deve fazer login novamente
function handleParseError(err) {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        Parse.User.logOut();
    }
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



function doLoginOK()
{
  try
  {
      CloseLogin();
      $('.container-scroller').show();
    
     $('.name').text(Parse.User.current().getEmail());
     $('.designation').text(Parse.User.current().getUsername());
     //sessionToken = LoggedUser.attributes.sessionToken;
  }
  catch(e)
  {

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
       var obj = results[0].attributes;
       var nomeUsuario = obj.Usuario;
       
        if (TemLoginCriado(obj))
        {
          CloseLoading();
          swal('login','Login ou senha inválidos','error');
         
        }
        else
        {
          CadastraNovoAdmin(aEmail,nomeUsuario);
        }

    },
    (error) => {
       CloseLoading();
       swal('inválido','Usuário inválido '+error,'error');
       handleParseError(error);
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


function verificalogin()
{  
 
    var currentUser = Parse.User.current();
    if (currentUser) {
        ShowBody();
        $('.name').text(currentUser.getEmail());
        $('.designation').text(currentUser.getUsername());
    } else {
        ShowLogin();
    }
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
   


