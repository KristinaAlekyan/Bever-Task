function  userLogin(){
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    fetch('https://invoicesapi20210913135422.azurewebsites.net/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let users = data.value;
            for(let user in users){
                if(users[user].Name !== userName && users[user].Password !== password){
                    continue;
                } else if(users[user].Name == userName && users[user].Password == password){
                    let logedUserId = users[user]["UserId"];
                    localStorage.setItem("logedUserId", logedUserId);
                    let logedUserName = users[user]["Name"];
                    localStorage.setItem("logedUserName", logedUserName);

                    location. href = "page2.html";
                }else {
                    alert("Incorrect username or password");
                    location.reload();                 
        
                }
            }
        });
}