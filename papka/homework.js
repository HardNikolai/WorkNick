var mass = [6, 4, 8, -2, 6, 8, -1, 7, 8, 8, -9, 3, 5];
var mass1 = [6, 4, 8, -2, 6, 8, -1, 7, 8, 8, -9, 3, 5];
var mass2 = [6, 4, 8, -2, 6, 8, -1, 7, 8, 8, -9, 3, 5];

filterFunc1=(mass)=>{ 
    let newArr=[];
    
    mass.forEach(value=>{
        
        if (value>0) {
            newArr.push(value)
          };
    });
    
    return newArr;
}


filterFunc2=(mass, value1)=>{ 
    let newArr=[];
  
    mass.forEach(value=>{
      
        if (value>value1){
            newArr.push(value);
        }
    });
return newArr;
}


var result1 = filterFunc1(mass);
var result2 = filterFunc2(mass1,4);
var result3 = filterFunc2(mass2,4);

console.log(result1, 'Значение больше нуля')
console.log(result2, 'Сортирует, если первое значение больше второго')
