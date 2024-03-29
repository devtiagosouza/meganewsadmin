const cApplicationID = "0lMShoD8rKkzIpQknQxTRGElezYMQ1qXiu5aJnRZ";
const cRestAPIkey = "z5oT880eMQe9mw6PAgPUXJbXav14zSF3t7P1DOYK";
const cJavaScriptAPIKey  = "czVvVaGgG8GnEqJK3PhDHRa4b7CJp1GG66Xp056p";
const cMasterKey = "5jBIHZaUkGhmRZdtf5U4FsnbsBa0dC9kLTNA9Arh";
const cServerUrl = "https://megachaveapp.back4app.io";
var sessionToken = "";

const RestApiHeaders = function(xhr) {
                        xhr.setRequestHeader('X-Parse-Application-Id', cApplicationID);
                        xhr.setRequestHeader('X-Parse-REST-API-Key',cRestAPIkey);
};

Parse.serverURL = cServerUrl;
const cUsuariosUrl = `${cServerUrl}/classes/Usuarios`;
const CFuncionName = 'userExists';


function DefaultErrorPlacement(label, element) {
    label.addClass('mt-2 text-danger');
    label.insertAfter(element);
  };
function DefaultHighlight(element, errorClass) {
          $(element).parent().addClass('has-danger')
          $(element).addClass('form-control-danger')
  };

var RulesLoginNovaSenha =
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
        };
var MessagesLoginNovaSenha =
        {
              xLoginNovaSenha : {
                      required : 'Defina uma senha de acesso',
                      minlength : jQuery.validator.format("a senha deve ter pelo menos {0} caracteres!")
              },
              xLoginConfirmaSenha : {
                      equalTo : "A confirmação de senha deve ser igual a senha definida no campo acima"
              }
        };

var RulesLogin = 
[ 
        
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
        {
            xLoginUsuario : {
                      required : 'Digite o E-mail',
                      minlength : jQuery.validator.format("O E-mail deve ter pelo menos {0} caracteres!"),
                      email: "O endereço de e-mail deve estar no formado xxxx@meganews.com.br"
              },
              xLoginSenha : {
                      required : 'Digite a senha'
                      
                      
              }
        }

]
