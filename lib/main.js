Parse.Cloud.define("userExists",
  function(request, response) {
      const xField = Object.keys(request.params)[0].toString(); 
      const xValue = Object.values(request.params)[0].toString(); 
     
      const query = new Parse.Query("Usuarios");
      query.equalTo(xField, xValue);
      query.find()
      .then((results) => {
        // The object was retrieved successfully.
        if (results.length > 0)
        {
            response.success("true");
        }
        else
        {
           response.success("false");
        }
      }, (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        response.error("Erro: " + error);
      });
   });




Parse.Cloud.define("userExistsAsync", async (request) => {
    const xField = Object.keys(request.params)[0].toString(); 
    const xValue = Object.values(request.params)[0].toString(); 
    const query = new Parse.Query("Usuarios");
    query.equalTo(xField, xValue);
    const results = await query.find();
    if (results.length > 0) 
       return true
    return false;
  });