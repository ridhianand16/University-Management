var jsonUsers = require("../jsonData/userList.json")
var jsonData = require("../jsonData/courseList.json")
const fs = require('fs');


var saveVal = function(arr) 
{    
    return new Promise((resolve, reject) => 
    {
        json['students'].push({arr})    
        fs.writeFile('userList.json', JSON.stringify(json), (err) => 
        {
            if (err) reject(err)
                resolve("File saved.")
        })
    });
}

var deleteVal = function(removeUser)
{
    var data = fs.readFileSync('../jsonData/userList.json');
    var json = JSON.parse(data);
    var students = json.students;
    json.students = students.filter((students) => { return students.user !== removeUser });
    fs.writeFileSync('../jsonData/userList.json', JSON.stringify(json, null, 2));
}




var courseList =function(username,courses)
{
    //console.log(courses)
    userData = jsonUsers['students']

    for(var i = 0; i < userData.length; i++) 
    {
        //console.log(username + " hello")
        
        if (username == userData[i].user)
        {
            //console.log(JSON.stringify(i))
            
            //console.log("hello")
            var creditTotal = 0;
            if(userData[i].courses.length > 0)
            {
                for(var j of userData[i].courses)
                {
                    //sum all current credits 
                    var obj = JSON.parse(j);   
                    creditTotal += obj.credits;
                }
            }
            console.log(creditTotal)
            //sum next set of credits
            for(var j of courses)
            {
                //console.log(j)
                var obj = JSON.parse(j);
                creditTotal += obj.credits;
            }

            //console.log(creditTotal);
            //check if its less than 15  
            if(creditTotal > 27)
            {
                //console.log(creditTotal);
                return false;
            }
            var arr;
            for(var j of courses)
            {
                //var obj = JSON.parse(j)
                arr = userData[i]
                if(userData[i].courses.indexOf(j)==-1)
                    arr.courses.push(j)
                //console.log(arr)

                //userData[i]["courses"] = arr;
                //userData[i]["courses"] = 
                //console.log(j);
                //figure out a way to append to json user courses

                //var obj = JSON.stringify(j);
                //console.log(obj);
                //console.log("\n");
                //console.log(userData[i]);
                //var user = JSON.stringify(userData[i])
                //console.log(user)
                //user["courses"].push(obj);
                //console.log(user["courses"])
                //jsonStr = JSON.stringify(obj);

                //i.courses = jsonStr;
                //
            }
            //userData[i] = JSON.stringify(arr)
            return true;
        }   
    }
    return false;
}

module.exports=courseList;