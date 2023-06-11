export function totalAtt(x,y){
    return x-y
  }

export function aktualLembur(x,y){
    const varD = x-y
    const varX = varD.toString()
    const len = varX.length
    const data1 =len-2
    const slics = varX.slice(data1, len)
    if(slics > 59){
      return varD-100+60
    }else if(len > 1){
      if(slics > 59){
        return varD-40
      }else{
        return varD
      }
    }else if(len === 2){
      return varD-40
    }else{
      return varD
    }
  }

export function leb(x,y){
    const varD = x-y
    const varX = varD.toString()
    const len = varX.length
    const data1 =len-2
    const slics = varX.slice(data1, len)
    if(slics > 59){
      return varD+40
    }else if(len > 1){
      if(slics > 59){
        return varD-40
      }else{
        return varD
      }
    }else if(len === 2){
      return varD-40
    }else{
      return varD
    }

  }

export function actualHours(x,y){
    let varD = x-y
    const varX = varD.toString()
    const len = varX.length
    const data1 =len-2
    const slics = varX.slice(data1, len)
    let slicsInt = parseInt(slics)
    console.log(slics)
    console.log(len)
    const var4 = varD+40
    console.log(var4.toString().slice(-2))
    const pars = parseInt(var4.toString().slice(-2))
    
    if(slicsInt > 59){
      if(pars < 40){
        return var4
      }else{
        return varD-40
      }
    }else{
      if(pars > 59){
        return x-y
      }else{
        if(pars < 59){
          return varD
        }else{
          return varD+40
        }
      }
    }
  }

export function formulaSumActual(x,y){
  let varD = x-y
  const varX = varD.toString()
  const len = varX.length
  const data1 =len-2
  const slics = varX.slice(data1, len)
  let slicsInt = parseInt(slics)
  console.log(slics)
  console.log(len)
  const var4 = varD+40
  console.log(var4.toString().slice(-2))
  const pars = parseInt(var4.toString().slice(-2))
  
  if(slicsInt > 59){
    if(varD < 40){
      console.log("if 1.1")
      return var4
    }else{
      console.log("else 1")
      return varD-40
    }
  }else{
    if(pars > 59){
      if(pars > 60){
        console.log("if 1")
        return varD
      }else if(pars > 40){
        return varD-40
      }else{
        console.log("if 1.2")
        return x-y
      }
    }else{
      if(pars < 59){
        if(varD < 40){
          console.log("if 2")
          return varD+40
        }else{
          console.log("if 2.2")
          return varD
        }
      }else{
        console.log("else 3")
        return varD+40
      }
    }
  }
}

export function totalKurLeb(end_from, start_from){
  var calc, tle, taw, finn, lenstart, lenend, tlestr, tleend, digstr, finnstr, digend, finnend
  var ef
  calc = (end_from - start_from)
  tle = calc.toString().length
  if(tle === 1){
    return tle
  }else if(tle > 1){
    return tle-2
  }
  finn = calc.toString(taw, tle)

  lenstart = start_from.toString().length
  lenend = end_from.toString().length
  tlestr = lenstart-2
  tleend = lenend-2

  digstr = start_from.toString()
  finnstr = digstr.slice(tlestr, lenstart)

  digend = start_from.toString()
  finnend = digend.slice(tleend, lenend)

  if(finn > 59 ){
    ef = end_from-100+60
    return (ef - start_from)
  }
  else if(tle > 1 ){
    if(finn > 59){
      return calc-100+60
      }else if(finn < 60){
        if(finnend < finnstr){
          return calc-40
        }else{
          return calc
        } 
      }else{
        return calc-40
      }
  }
  else if(tle === 2 ){
    return calc-100+60
  }
  else{
    return calc
  }
}


  // function sumTotaled(arr){
  //     let results = arr.reduce((a, b) => {
  //         return a+b;
  //     }, 0);
  //     const lent = results.toString().length 
  //     var ce = lent-2
  //     const sliced = results.toString().slice(ce, lent)
  //     const ac = results+70
  //     // if(sliced < 60 ){
  //     //   return results
  //     // }else{
  //     //   return results-100+60
  //     // }
  //     if(sliced > 59){
  //       return ac-100+60
  //     }else if(lent > 1){
  //       if(sliced > 59){
  //         return ac-40
  //       }else{
  //         const av = ac-40
  //         return av
  //       }
  //     }else if(lent === 2){
  //       return ac-40
  //     }else{
  //       return ac + 0
  //     }

  // }
// function swapl(jam1) {
//     let jam = "";
//     let menit = "";
    
//     if (jam1 >= 100) {
//       jam = Math.floor(jam1 / 100) * 100;
//       menit = ("0" + (jam1 % 100)).slice(-2);
//     }
    
//     return {
//       jam: jam,
//       menit: menit
//     };
//   }

export function sumTotal(arr){
     const results = arr.reduce((a, b) => {
        return a+b
      }, 0);
      return results
  }

export function sumHE(name, he, tidakmasuk){
    if(name.replace(/%20/g, " ") === 'Kunut Catur'){
      return (he+tidakmasuk)*900
    }else{
      return (he+tidakmasuk)*800
    }
  }

export function asce(a){
    if(a === null ){
      a = 0
      var str = a.toString()
    }else{
      // eslint-disable-next-line no-redeclare
      var str = a.toString()
    }
    let leng = str.length
    if(leng === 1){
        var val = 1
    }else if(leng > 1){
        // eslint-disable-next-line no-redeclare
        var val = 2
    }
    const val2 = leng-val
    const slic = str.slice(val2, leng)
    const pars = parseInt(slic)
    return pars
}

export function ascr(a){
  if(a === null ){
    a = 0
    var str = a.toString()
  }else{
    // eslint-disable-next-line no-redeclare
    var str = a.toString()
  }
  let leng = str.length
  if(leng === 1 || leng === 2){
      var val = 0
  }else if(leng > 2){
        // eslint-disable-next-line no-redeclare
      var val = leng - 2
  }
  const val2 = val
  var slic = str.slice(0, val2)
  if(slic === null){
      // eslint-disable-next-line no-redeclare, no-const-assign
      slic = 0
  }else{
      slic = str.slice(0, val2)
  }
  if(slic === ''){
    return 0
  }else{
    const pars = parseInt(slic)
    return pars
  }
}

export function dividDed(x, y){
  const removedDecimal = Math.trunc(x); // 2
  const dataX = parseInt(y)
  const dataY = removedDecimal+dataX
  const minDec = x-removedDecimal // 0.93
  var data = minDec*60 // 56
  var fixedNum = Math.round(data)
  if(fixedNum === 0){
    fixedNum = '00'
  }else{
    if(fixedNum.toString().length === 1){
      fixedNum = '0'+Math.round(data)
    }else{
      fixedNum = Math.round(data)
    }
  }
  const varXY =  dataY+''+fixedNum
  return parseInt(varXY)
}

export function delta(x){
  let deltaX = x.toString()
  const data = deltaX.slice(0,5)
  const zer = deltaX.slice(0,1)
  if(zer === '0'){
    return deltaX.slice(1,5).replace(':', '')
  }else{
    return data.replace(':', '')
  }
}

export function zeta(x){
  let deltaX = x.toString()
  let lent = x.length
  const yVar = lent-5
  const data = deltaX.slice(yVar, lent)
  const zer = data.slice(0,1)
    if(zer === '0'){
      return data.slice(1,5).replace(':', '')
    }else{
      return data.replace(':', '')
    }
}

function getDayOfWeek(dayNumber) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayNumber];
}

// data tanggal weekend
export function getWeekendDates(startDate, endDate) {
  const weekendDates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      const date = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
      const day = getDayOfWeek(currentDate.getDay());
      
      weekendDates.push({ working_date: formattedDate, days: day });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekendDates;
}

export function mergedDataPresence(data1, data2) {
  const mergedData = [...data1];

  data2.forEach((item2) => {
    const index = mergedData.findIndex((item1) => item1.working_date === item2.working_date);
    if (index === -1) {
      const newItem = { ...item2 };
      newItem.employee = { ...data1[0].employee };
      mergedData.push(newItem);
    } else {
      mergedData[index].days = item2.days;
    }
  });

  mergedData.sort((a, b) => new Date(a.working_date) - new Date(b.working_date));

  return mergedData;
}

export function countDataKeterangan(data, ketValue) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].ket === ketValue) {
      count++;
    }
  }
  return count;
}



export function kurlebs(jamFaktual, jamAktual){
  let calc = (jamFaktual - jamAktual);
  let tle = calc.toString().length;
  let taw;
  if(tle === 1){
      taw = tle;
  } else if(tle > 1){
      taw = tle-2;
  }
  let slic = calc.toString().slice(taw,tle);
  let dig = calc.toString();
  let finn = dig.slice(slic);
  let lenstart = jamAktual.toString().length;
  let lenend = jamFaktual.toString().length;
  let tlestr = lenstart-2;
  let tleend = lenend-2;
  let slicstr = jamAktual.toString().slice(tlestr,lenstart);
  let digstr = jamAktual.toString();
  let finnstr = digstr.slice(slicstr);
  let slicend = jamFaktual.toString().slice(tleend,lenend);
  let digend = jamFaktual.toString();
  let finnend = digend.slice(slicend);
  let working_hour;
  if(finn > '59'){
      let ef = jamFaktual-100+60;
      working_hour = (ef - jamAktual);
  } else if(tle > 1 ){
      if(finn > '59'){
          working_hour = calc-100+60;
      } else if(finn < '60'){
          if(finnend < finnstr){
              working_hour = calc-40;
          } else { 
              working_hour = calc;
          }
      } else {
          working_hour = calc-40;
      }
  } else if(tle === 2 ){
      working_hour = calc-100+60;
  } else {
      working_hour = calc;
  }
  return working_hour;
  
}