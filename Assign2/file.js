const compareButton = document.getElementById("form1");
compareButton.addEventListener("submit", compareFunction);

function compareFunction(event) {
  try {
    const Json1 = document.getElementById("json1").value;
    const Json2 = document.getElementById("json2").value;
    const obj1 = JSON.parse(Json1);
    const obj2 = JSON.parse(Json2);

    if (typeof obj1 == "object" && typeof obj2 == "object") {
      const result = isEqual(obj1, obj2);
      if(result){
        alert("Two json Objects are equal")
      }else{
        alert("Two json objects are not equal")
      }
      
    }
  } catch (err) {
    if (err.message === "Unexpected end of JSON input") {
      alert("Invalid Json format");
    } else {
      alert("Something Went Wrong Please try again");
    }
  } finally {
    event.preventDefault();
  }
}

function isEqual(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  for (let objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      if (typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
        if (!isEqual(obj1[objKey], obj2[objKey])) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
}
