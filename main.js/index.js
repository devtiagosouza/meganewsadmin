var urlUsuarios = "http://localhost:5000/api/Usuarios";
var urlApp = "http://localhost:5000/api/App";


function CadastrarUser()
{
     
    var nomeUsuario = document.querySelector('#txtNome').value;
    var EmailUsuario = document.querySelector('#txtEmail').value;

    var isAtivo = document.querySelector("#chkAtivo").checked == true ? "1" : "0";
    var isAdmin = document.querySelector("#chkAdmin").checked == true ? "1" : "0";
    var isDesenvolvedor = document.querySelector("#chkDesenvolvedor").checked == true ? "1" : "0";;
    
    var objUser = {
        "Usuario" : nomeUsuario,
        "NumeroSerie" : "",
        "DataRegistro" : null,
        "Ativo" : isAtivo,
        "Email" : EmailUsuario,
        "Desenvolvedor" : isDesenvolvedor,
        "Admin" : isAdmin,
        "Imei" : "",
        "Registrado" : "0",
        "Api" : "",
        "VersaoAndroid" : "",
        "ModeloAparelho" : ""
      
    };
      

    $.ajax(urlUsuarios, {
      contentType: 'application/json',
      format:"json",
      crossDomain: true,
      data: JSON.stringify(objUser),
      method: 'POST',
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Erro de parâmetro');
        return false;
      },
      success:  function(data) {
         ListarUsers();
      }
    });
    return false;
  
}

function HabilitaCadastro()
{
  document.querySelector("#frmNovoUsuario").style.display = "inline-block";
}
function DesabilitaCadastro()
{
    document.querySelector('#frmNovoUsuario').style.display = "none";
}


function EmptyTable()
{
   DesabilitaCadastro();
   document.querySelectorAll('.trElement').forEach(el => el.remove());
}

function PatchUser(UserID, items)
{
   var objectPatch = [];

   for (item of items)
   {
      objectPatch.push(
         {
          "op": "replace",
          "path": "/"+item.campo,
          "value": item.valor
         }
       )
   }

   $.ajax(urlUsuarios+'/'+UserID, {
    contentType: 'application/json',
    format:"json",
    crossDomain: true,
    data: JSON.stringify(objectPatch),
    method: 'PATCH',
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Erro de parâmetro');
    },
    success:  function(data) {
      
       ListarUsers();
    }
  });
 

}

function ExcluirUser()
{
   var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
   if (window.confirm('Confirma exclusão?'))   
   {
        $.ajax(urlUsuarios+'/'+ID, {
          contentType: 'application/json',
          format:"json",
          crossDomain: true,
          method: 'DELETE',
          error: function(jqXHR, textStatus, errorThrown) {
            alert('Erro de parâmetro');
          },
          success:  function(data) {
            ListarUsers();
          }
        });
        
   }
}

function InativarUser()
{
  if (window.confirm('Confirma?'))   
  {
     var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
      PatchUser(ID,[
      {
         campo: "Ativo",
         valor: "0"
      }
    ]);
     
  }
}
function AtivarUser()
{
  if (window.confirm('Confirma?'))   
  {
     var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
      PatchUser(ID,[
      {
         campo: "Ativo",
         valor: "1"
      }
    ]);
     
  }
}

function ResetarUser()
{
                 if (window.confirm('Confirma?'))   
                 {
                     var ID = this.closest('tr').querySelector('.idUsuarioClass').innerText; 
                     PatchUser(ID,[
                         {
                            campo: "Imei",
                            valor: ""
                         },
                         {
                          campo: "Registrado",
                          valor: "0"
                         },
                         {
                          campo: "NumeroSerie",
                          valor: ""
                         },
                         {
                          campo: "DataRegistro",
                          valor: null
                         },
                         {
                          campo: "ModeloAparelho",
                          valor: ""
                         },
                         {
                          campo: "VersaoAndroid",
                          valor: ""
                         }

                     ]);
                 }
} 
function ListarDataVencimento()
{
  $.ajax(urlApp, {
    contentType: 'application/json',
    format:"json",
    crossDomain: true,
    method: 'GET',
    beforeSend: function(xhr) {
     
    },
    send : function( event, jqxhr, settings )
    {
       
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Erro ao conectar ao servidor');
     },
    success: function(data) {
          var datinha = new Date(data[0].dataVencimento).toLocaleDateString("pt-BR");
           
           
         document.querySelector("#edtDataVencimento").value =  '2019-08-14';
         console.log(typeof datinha);
         //new Date(data[0].dataVencimento).toDateString('yyyy-MM-dd');
    }
  }
  );
}

function ListarUsers()
{
    
       // EmptyTable();
        //Capturar Dados Usando Método AJAX do jQuery
        $.ajax(urlUsuarios, {
          contentType: 'application/json',
          format:"json",
          crossDomain: true,
          method: 'GET',
          beforeSend: function(xhr) {
             EmptyTable();
           // xhr.setRequestHeader('Cookie', 'authToken=' + Token);
          },
          send : function( event, jqxhr, settings )
          {
             
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert('Erro ao conectar ao servidor');
           },
          success: function(data) {
          
            function add(trElement,Texto, nomeClasse)
            {
              var tdElement = document.createElement('td');
              tdElement.innerText = Texto;
              tdElement.className = nomeClasse;

              if (nomeClasse == 'ativoClass')
              {
                tdButton = document.createElement('input');
                tdButton.type = "button";
                if (Texto == 'Ativo')
                {
                  tdButton.addEventListener('click', InativarUser);
                  tdButton.value = 'Inativar';
                }
                else  
                {
                  tdButton.addEventListener('click', AtivarUser);
                  tdButton.value = 'Ativar';
                }
                
                
                
                tdElement.appendChild(tdButton);
              }

              trElement.appendChild(tdElement);
            }

            function addDeleteButton(trElement)
            {
              var btnDelete = document.createElement('input');
              btnDelete.type = "button";
              btnDelete.value = "Excluir";
              btnDelete.className = 'btnExcluirClass';

              btnDelete.addEventListener('click', ExcluirUser);
              trElement.appendChild(btnDelete);
            }

            function addResetButton(trElement)
            {
              var btnResetar = document.createElement('input');
              btnResetar.type = "button";
              btnResetar.value = "Resetar";
              btnResetar.className = 'btnResetarClass';

              btnResetar.addEventListener('click', ResetarUser);
              trElement.appendChild(btnResetar);
              
            }

            $.each(data, function(index) {
              var trElement = document.createElement('tr');
              trElement.className="trElement";
              

               add(trElement,data[index].idUsuario,'idUsuarioClass');
               add(trElement,data[index].usuario,'usuarioClass');
               add(trElement,data[index].email,'emailClass');
               add(trElement, data[index].registrado  == '1' ? 'Sim' : 'Não','registradoClass' );
              
               if ( new Date(data[index].dataRegistro).getFullYear() == 1969)
               {
                   add(trElement,'','dataRegistroClass');
               }
               else 
               {
                  add(trElement,new Date(data[index].dataRegistro).toLocaleDateString("pt-BR"),'dataRegistroClass');
               }

            
               add(trElement,data[index].imei,'imeiClass');
               
               add(trElement,data[index].ativo == '1' ? 'Ativo' : 'Inativo','ativoClass'); //(data[index].ativo  == '1') ? 'Ativo' : 'Inativo' );
               

               add(trElement, data[index].desenvolvedor  == '1' ? 'Sim' : 'Não', 'desenvolvedorClass' );
               add(trElement,data[index].admin == '1' ? 'Admin': '','adminClass');
               
               add(trElement,data[index].modeloAparelho,'modeloAparelhoClass');
               add(trElement,data[index].versaoAndroid,'versaoAndroidClass');

               //incluir os botões de acao
               addResetButton(trElement);
               addDeleteButton(trElement);

               if (data[index].ativo == '0') 
               {
                  trElement.style.setProperty("text-decoration", "line-through");
               }

          

               document.querySelector('tbody').appendChild(trElement);
          });
        }, 
        });
     

   ListarDataVencimento();

}