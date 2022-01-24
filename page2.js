function  userPage(){
    let userInvoices = [];
    let invoices;
    let invoiceLines;
    let products;    
    let sumArr = [];

    const urls = ['https://invoicesapi20210913135422.azurewebsites.net/products',
                'https://invoicesapi20210913135422.azurewebsites.net/invoices',
                'https://invoicesapi20210913135422.azurewebsites.net/invoicelines'
            ];
    Promise.all(urls.map(u => fetch(u))).then(responses =>
        Promise.all(responses.map(res => res.json()))
    ).then(data => { 
        products = data[0].value;
        invoices = data[1].value;        
        invoiceLines = data[2].value;        
         
        let logedUserName = localStorage.getItem("logedUserName");
        let logedUserId = localStorage.getItem("logedUserId");
        let logedUser = document.getElementById("userName");
        logedUser.innerHTML = logedUserName;

        for(let invoice in invoices){
            if(invoices[invoice]["UserId"] == logedUserId){
                userInvoices.push(invoices[invoice])
            }
        }            

        for (let i = 0; i < userInvoices.length; i++){
            let sum =0;
            for(let inv in invoiceLines){
                if(invoiceLines[inv]["InvoiceId"] == userInvoices[i]["InvoiceId"]){
                    for(let prod in products){
                        if(invoiceLines[inv]["ProductId"] == products[prod]["ProductId"]){
                            sum += invoiceLines[inv]["Quantity"] * products[prod]["Price"]
                        }                            
                    } 
                } 
            }
            sumArr.push(sum);
        }
    
        for(let i = 0; i < userInvoices.length; i++){
            let table = document.getElementsByTagName("table")[0];
            let trItem = document.createElement("tr");
            table.append(trItem);
            let tdItem = document.createElement("td");
            let radioBtn = document.createElement("input"); 
            radioBtn.setAttribute("type", "radio");
            radioBtn.setAttribute("id", userInvoices[i]["InvoiceId"]);                
            radioBtn.setAttribute("name", "radioButton");                

            tdItem.append(radioBtn);
            trItem.append(tdItem);
            let tdItemInvoiceName = document.createElement("td");
            tdItemInvoiceName.innerHTML = userInvoices[i]["Name"];
            trItem.append(tdItemInvoiceName);
            let tdItemInvoicePaidDate = document.createElement("td");

            let day = userInvoices[i]["PaidDate"].slice(8,10);
            let month = userInvoices[i]["PaidDate"].slice(5,7);                
            let year = userInvoices[i]["PaidDate"].slice(0,4);
            let dayOfBuy = `${day}.${month}.${year}`;

            tdItemInvoicePaidDate.innerHTML = dayOfBuy;
            trItem.append(tdItemInvoicePaidDate);
            let tdItemInvoiceTotalAmount = document.createElement("td");  
            tdItemInvoiceTotalAmount.innerHTML = sumArr[i];
            trItem.append(tdItemInvoiceTotalAmount);
        }
        
        if(document.querySelectorAll('input[name="radioButton"]')){
            document.querySelectorAll('input[name="radioButton"]')
                .forEach(elem => { elem.addEventListener("click", () => { clickedRadioNBtn(elem.id); })});
        }
    }) 
}

userPage();


function logOut(){
    location. href = "index.html";
}

function clickedRadioNBtn(cklickedRadioBtnId){  
    let table = document.getElementsByTagName("table")[1];
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }


    table = document.getElementsByTagName("table")[1];
    let trItem = document.createElement("tr");
    table.append(trItem);
    let thItem = document.createElement("th");
    thItem.innerHTML = "Product";
    trItem.append(thItem);

    let thItemPricePerUnit = document.createElement("th");
    thItemPricePerUnit.innerHTML = "Price Per Unit";
    trItem.append(thItemPricePerUnit);

    let thItemQuantity = document.createElement("td");
    thItemQuantity.innerHTML = "Quantity";
    trItem.append(thItemQuantity);

    let thItemTotalAmount = document.createElement("td");
    thItemTotalAmount.innerHTML = "Total Amount";
    trItem.append(thItemTotalAmount);

    let invoices;
    let invoiceLines;
    let products;

    const urls = ['https://invoicesapi20210913135422.azurewebsites.net/products',
                'https://invoicesapi20210913135422.azurewebsites.net/invoices',
                'https://invoicesapi20210913135422.azurewebsites.net/invoicelines'
                ];
    Promise.all(urls.map(u => fetch(u))).then(responses =>
        Promise.all(responses.map(res => res.json()))
    ).then(data => { 
        products = data[0].value;
        invoices = data[1].value;        
        invoiceLines = data[2].value; 
                    
        for (let i = 0; i < invoices.length; i++){               
            if(invoices[i]["InvoiceId"] == cklickedRadioBtnId){
                for(let j = 0; j < invoiceLines.length; j++){
                    if(invoices[i]["InvoiceId"] == invoiceLines[j]["InvoiceId"]){
                        for(let prod in products){
                            if(products[prod]["ProductId"] == invoiceLines[j]["ProductId"]){
                                console.log(products[prod]["Name"]);
                                let tableForList = document.getElementsByTagName("table")[1];
                                let trItem = document.createElement("tr");
                                tableForList.append(trItem);
                                let tdItem = document.createElement("td");
                                tdItem.innerHTML = products[prod]["Name"];
                                trItem.append(tdItem);

                                let tdItemPricePerUnit = document.createElement("td");
                                tdItemPricePerUnit.innerHTML = products[prod]["Price"];
                                trItem.append(tdItemPricePerUnit);

                                let tdItemQuantity = document.createElement("td");
                                tdItemQuantity.innerHTML = invoiceLines[j]["Quantity"];
                                trItem.append(tdItemQuantity);

                                let tdItemTotalAmount = document.createElement("td");
                                tdItemTotalAmount.innerHTML = products[prod]["Price"] * invoiceLines[j]["Quantity"];
                                trItem.append(tdItemTotalAmount);
                            }
                        }
                    }
                }
            }
        }         
    }) 
}
