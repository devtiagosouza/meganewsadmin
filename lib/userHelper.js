Parse.Cloud.define("userexists", async (request) => {
    const query = new Parse.Query("Usuarios");
    query.equalTo("Email", request.params.Email);
    const results = await query.find();
    if (results.length > 0) 
    {
        return true;
    }
    else 
    {
        return false;
    }
});