/************  KEYS DE ACESSO ***********************************/
const cApplicationID = "0lMShoD8rKkzIpQknQxTRGElezYMQ1qXiu5aJnRZ";
const cRestAPIkey = "z5oT880eMQe9mw6PAgPUXJbXav14zSF3t7P1DOYK";
const cJavaScriptAPIKey  = "czVvVaGgG8GnEqJK3PhDHRa4b7CJp1GG66Xp056p";
const cServerUrl = "https://megachaveapp.back4app.io";

const RestApiHeaders = function(xhr) {
    xhr.setRequestHeader('X-Parse-Application-Id', cApplicationID);
    xhr.setRequestHeader('X-Parse-REST-API-Key',cRestAPIkey);
};

const cUsuariosUrl = `${cServerUrl}/classes/Usuarios`;
const CFuncionName = 'userExists';
