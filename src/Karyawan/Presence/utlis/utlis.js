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

export function sumTotal(arr){
     const results = arr.reduce((a, b) => {
        return a+b
      }, 0);
      return results
  }

export function sumHE(name, he){
    if(name.replace(/%20/g, " ") === 'Kunut Catur'){
      return he*900
    }else{
      return he*800
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
    fixedNum = Math.round(data)
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