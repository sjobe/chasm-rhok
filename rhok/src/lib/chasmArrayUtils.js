<!-- buildProfile         -->
<!-- heightPrefix: String -->
<!-- lengthPrefix: String -->
<!-- thetaPrefix: String  -->
<!-- parentNode: DOM Node -->

<!-- Responsible for creating the profile data from fields -->
function buildProfile(heightPrefix, lengthPrefix, thetaPrefix, parentNode){
  var data;
  var heightArray = findChildValuesWithNamePrefixFromInputTypes(heightPrefix, parentNode);
  var lengthArray = findChildValuesWithNamePrefixFromInputTypes(lengthPrefix, parentNode);
  var thetaArray = findChildValuesWithNamePrefixFromInputTypes(thetaPrefix, parentNode);
  if(heightArray != null && lengthArray != null && thetaArray != null){
    if((heightArray.length == lengthArray.length) && (lengthArray.length == thetaArray.length)){    
      data = new Array(heightArray.length);
      for(var i = 0; i < data.length; i++){
        data[i] = new Array(3);
        data[i][0] = eval(heightArray[i]);
        data[i][1] = eval(lengthArray[i])
        data[i][2] = eval(thetaArray[i]);
      }
    }
  }
    
  return data;
}

function buildDepth(depthPrefix, parentNode){
  var depthArray = findChildValuesWithNamePrefixFromInputTypes(depthPrefix, parentNode);
  return depthArray;
}

function buildStratas(parentNode, size){
  var data = new Array();
  var stratas = new Array();
  stratas[0] = buildDepth("soil_strata1", parentNode);
  stratas[1] = buildDepth("soil_strata2", parentNode);
  stratas[2] = buildDepth("soil_strata3", parentNode);
  stratas[3] = buildDepth("soil_strata4", parentNode);
  for(var i = 0; i < size; i++){  
      data[i] = new Array(4);
    if(stratas[0] && stratas[0].length == size){
      data[i][0] = stratas[0][i];
    }
    if(stratas[1] && stratas[1].length == size){
      data[i][1] = stratas[1][i];
    }
    if(stratas[2] && stratas[2].length == size){
      data[i][2] = stratas[2][i];
    }
    if(stratas[3] && stratas[3].length == size){
      data[i][3] = stratas[3][i];
    }
  }
  return data;
}


<!-- findChildValueWithNamePrefix -->
<!-- prefix: String               -->
<!-- parentNode: DOM Node         -->

<!-- Responsible for finding the first value it runs into that matches a certain name prefix -->
<!-- Assumption: Children of a node with the prefix will not have a prefixed node            -->
function findChildValueWithNamePrefix(prefix, parentNode){
  if(parentNode){
    for(var i = 0; i < parentNode.childNodes.length; i++){
      var child = parentNode.childNodes[i];    
      var nameAttribute = child.name;
      if(nameAttribute){
        if(nameAttribute.indexOf(prefix) == 0){
          return child.value;
        } else {
          if(child.childNodes()){
            var val = findChildValueWithNamePrefix(prefix, child);
            if(val != null){
              return val;
            }
          }
        }
      } else {
        if(child.childNodes){
          var val = findChildValueWithNamePrefix(prefix, child);
          if(val != null){
            return val;
          }
        }
      }
    }  
  }
}

<!-- findChildValuesWithNamePrefixFromInputTypes -->
<!-- prefix: String               -->
<!-- parentNode: DOM Node         -->

<!-- Responsible for finding all the values it runs into that matches a certain name prefix -->
function findChildValuesWithNamePrefixFromInputTypes(prefix, parentNode){
  var inputNodes = parentNode.getElementsByTagName("INPUT");
  var valuesArray = new Array();
  var count = 0;
  for(var i = 0; i < inputNodes.length; i++){
    var nameAttribute = inputNodes[i].name;
    if(nameAttribute){
      if(nameAttribute.indexOf(prefix) == 0){
        if(inputNodes[i].value != ''){
          valuesArray[count] = inputNodes[i].value;
          count++;
        }
      }
    }
  }
  if(valuesArray.length > 0){
    return valuesArray;
  }else{
    return null;
  }
}