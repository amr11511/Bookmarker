
// function addToFavorites(){
//     Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",
//         footer: `<i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site name must contain at least 3 characters<br>
//         <i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site URL must be a valid one`
//       });
// }

var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var sites = [];
if(localStorage.getItem("siteDetails") != null){
    sites = JSON.parse(localStorage.getItem("siteDetails"))
    displaySites(sites)
}



function addToFavorites(){
    if(siteName.value=="" || siteUrl.value == ""){
        Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site name must contain at least 3 characters<br>
                    <i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site URL must be a valid one`
                  });

    }else if(validateSiteName()==true && validateSiteUrl()==true) {
        var site = {
            name : siteName.value,
            url : siteUrl.value
        }
        sites.push(site)
        localStorage.setItem("siteDetails" , JSON.stringify(sites))
        displaySites(sites)
        clearInputs()}
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Site name or site url went wrong!",
            footer: `<i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site name must contain at least 3 characters<br>
            <i class="fa-solid fa-circle-arrow-right text-danger me-2"></i>Site URL must be a valid one`
          });
    }

}
function displaySites(arr){
    var trs = ``
    for(var i = 0; i < arr.length; i++){
        trs += `
            <tr>
                    <td>${i}</td>
                    <td>${arr[i].name}</td>
                    <td>
                  <a href="${arr[i].url}" class="btn btn-visit"
                  target="_blank"><i class="fa-solid fa-eye"></i> Visit</a>
                    </td>
                    <td>
                    <button onclick="deleteSite(${i})" class="btn btn-delet">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                    </td>
            </tr>`
    }
    document.getElementById('favTableBody').innerHTML = trs

}
function clearInputs(){
    siteName.value=""
    siteUrl.value=""
}
function deleteSite(index){
    sites.splice(index , 1)
    localStorage.setItem("siteDetails" , JSON.stringify(sites))
    displaySites(sites)

}
function validateSiteName(){
    var regx = /^[a-zA-Z0-9]{3,}$/
    if(regx.test(siteName.value) == true){
        return true
    }else{
        return false
    }
}
function validateSiteUrl(){
    var regx = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/
    if(regx.test(siteUrl.value) == true){
        return true
    }else{
        return false
    }
}
