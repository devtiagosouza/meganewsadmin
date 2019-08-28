
//verifica se deu erro de invalid sessino token, neste caso deve fazer login novamente
function handleParseError(err) {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        Parse.User.logOut();
    }
}

function onLogin(form)
{
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
}


function onCriarUsuario()
{

}



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

function ShowLogin()
{
    $('#ModalLogin').modal({
        keyboard : false,
        focus : true,
        backdrop : false
    });
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
                 console.log(response); 
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

  $('#ModalCriarUsuario').modal({
    keyboard : false,
    focus : true,
    backdrop : false
   
   })
}


   