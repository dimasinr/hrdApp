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