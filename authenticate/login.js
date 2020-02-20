var jsonUsers = require("../jsonData/userList.json")
var login =function(username,password)
{

    //console.log(username,password)
    if(username =="test" && password =="test123")
    {
        return true;
    }
    else
    {
        data = jsonUsers['students']
        for(var i = 0; i < data.length; i++) 
        {
            if (username == data[i].user && password == data[i].password)
            {
                return true;
            }
        }
        return false;
    }
}
module.exports=login;