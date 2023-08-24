const countryStateInfo = {
    India: {
        Gujarat: {
            Ahmedabad: ["382480", "382481"],
            Surat: ["335009", '394104'],
            Vadodara: ["300018", "300012"]
        },
        Rajasthan: {
            Jaipur: ["302001", "302005"],
            Udaipur: ["313001", "313002"]
        },
        Maharashtra: {
            Mumbai: ["400001", "400002"],
            Pune: ["411001", "411002"]
        },
    },
    UnitedStates: {
        California: {
            oakland: ["12345", '234565'],
            ventura: ["5456", "3445"]
        },
        Colorado: {
            Denver: ["7895", "6784"],
            Aurora: ["6787", "57768"]
        },
    },
    Russia: {
        Moscow: {
            Balashikha: ["54566", "34456"],
            Dubna: ["34567", "45576"]
        },
    },

};
window.onload = function () {
    const countrySelection = document.querySelector("#country"),
        stateSelection = document.querySelector("#state")
    citySelection = document.querySelector("#city")
    zipSelection = document.querySelector("#zip")
    // console.log(countrySelection)

    stateSelection.disabled = true;
    citySelection.disabled = true;
    zipSelection.disabled = true;

    for (let country in countryStateInfo) {
        countrySelection.options[countrySelection.options.length] = new Option(country, country)
    }
    // country change

    countrySelection.onchange = (e) => {
        stateSelection.disabled = false
        citySelection.length = 1;
        stateSelection.length = 1;
        zipSelection.length = 1;
        for (let state in countryStateInfo[e.target.value]) {
            stateSelection.options[stateSelection.options.length] = new Option(state, state);
        }
    };

    // state change

    stateSelection.onchange = (e) => {
        citySelection.disabled = false
        citySelection.length = 1;
        zipSelection.length = 1;
        for (let city in countryStateInfo[countrySelection.value][e.target.value]) {
            citySelection.options[citySelection.options.length] = new Option(city, city);
        }
    };
    // city change

    citySelection.onchange = (e) => {
        zipSelection.disabled = false

        zipSelection.length = 1;
        let zips = countryStateInfo[countrySelection.value][stateSelection.value][e.target.value];
        for (let i = 0; i < zips.length; i++) {
            zipSelection.options[zipSelection.options.length] = new Option(zips[i], zips[i]);
        }
    };
};

function textValidation(id, value) {
    if (isEmpty(id, value)) {
        length = value.length;
        for (let i = 0; i < length; i++) {
            console.log("you are in for loop")
            if ((value[i].charCodeAt(0) >= 65 && value[i].charCodeAt(0) <= 90) || (value[i].charCodeAt(0) >= 97 && value[i].charCodeAt(0) <= 122)) {
                console.log("Write"+ value[i])
                takeaction=0
            }
            else {
                takeaction=1
                break
            }

        }
        if(takeaction==1){
        setError(id, `${id} must be Text`)
        return false
        }
        else{
            resetError(id)
                return true
        }
    }
    else {
        return false
    }

}


function mobileNumberValidation(id, value) {
    if (isEmpty(id, value)) {
        // console.log("inside nan")
        if (isNaN(value)) {
            setError(id, "Mobile number Must be Number")
            return false
        }
        else {
            resetError(id)
            return true
        }
    }
    else {
        return false
    }

}
function emailValidation(id, value) {
    if (isEmpty(id, value)) {
        console.log("inside not empty")
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailformat)) {
            resetError(id)
            return true
        }
        else {
            setError(id, "Email ID  must be valid")
            return false;
        }
    }
    else {
        return false
    }
}
function showtext() {
    var password1 = document.getElementById("password")
    var icon1 = document.getElementById("hide1")
    var icon2 = document.getElementById("hide2")
    
    if (password1.type === "password") {
        password1.type = "text";
        icon1.style.display = "block";
        icon2.style.display = "none";

    }
    else {
        password1.type = "password";
        icon1.style.display = "none";
        icon2.style.display = "block"
    }
    console.log(x,y,z,x.type)

}

function passwordValidation(id,value) {
    let upperCase=0
    let lowerCase=0
    let specialCharacter=0
    let number=0
    length = value.length
    for (let i = 0; i < length; i++) {
        if ((value[i].charCodeAt(0) >= 65 && value[i].charCodeAt(0) <= 90)) {
            upperCase = 1
            continue
        }
        if (value[i].charCodeAt(0) >= 97 && value[i].charCodeAt(0) <= 122) {
            lowerCase = 1
            continue
        }
        if (value[i].charCodeAt(0) >= 32 && value[i].charCodeAt(0) <= 47
            || value[i].charCodeAt(0) >= 58 && value[i].charCodeAt(0) <= 64
            || value[i].charCodeAt(0) >= 91 && value[i].charCodeAt(0) <= 96
            || value[i].charCodeAt(0) >= 123 && value[i].charCodeAt(0) <= 126) {
            specialCharacter = 1
            continue
        }
        if (!isNaN(value[i])) {
            number = 1
            continue
        }

    }
    if(length==0){
        setError(id,"**Password must be required")
        return false
    }
    if(upperCase!=1) {
        setError(id,"Password must contain at least one uppercase letter ")
        return false
    }  
    if(lowerCase!=1){
        setError(id,"Password must contain at least one lowercase letter ")
        return false
    }
    if(specialCharacter!=1){
        setError(id,"Password must contain at least one special character ")
        return false
    }
    if(number!=1){
        setError(id,"Password must contain at least one number ")
        return false
    }
    else{
        resetError(id)
        return false
    }
    
}

function isEmpty(id, value) {
    if (value == "") {
        setError(id, `**${id} must be required`)
        return false
    }
    else {
        resetError(id)
        return true
    }

}
function resetError(id) {
    let e1 = document.getElementById(id);
    let e2 = e1.getElementsByClassName('formError')[0];
    e2.innerText = "";
    console.log(id, e1, e2, e2.innerText)
}


function setError(id, error) {
    let e1 = document.getElementById(id);
    let e2 = e1.getElementsByClassName('formError')[0];
    e2.innerText = error;
    // console.log(error, id, e1, e2, e2.innerText)
}

function validateForm() {
    var returnval = false

    let firstNameValue = document.forms["myForm"]["firstName"].value;
    let middleNameValue = document.forms["myForm"]["middleName"].value;
    let lastNameValue = document.forms["myForm"]["lastName"].value;
    let emailValue = document.forms["myForm"]["email"].value;
    let mobileNumberValue = document.forms["myForm"]["mobileNumber"].value;
    let passwordValue= document.forms["myForm"]["password"].value;
    let titleValue= document.forms["myForm"]["projectTitle"].value;

    returnval = isEmpty("firstName", firstNameValue)
    returnval = isEmpty("middleName", middleNameValue)
    returnval = isEmpty("lastName", lastNameValue)
    returnval = isEmpty("email", emailValue)
    // returnval= isEmpty("password",passwordValue)


    returnval = textValidation("firstName", firstNameValue)
    returnval = textValidation("middleName", middleNameValue)
    returnval = textValidation("lastName", lastNameValue)


    returnval = emailValidation("email", emailValue)

    returnval = mobileNumberValidation("mobileNumber", mobileNumberValue)
    
    // countrySelect()
    returnval= passwordValidation("password1", passwordValue)

    if(isNaN(titleValue)){
        returnval = True
    }

    return returnval;
}