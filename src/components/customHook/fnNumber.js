export const numberFollow = (number) => {
    if (number === 0) {
        return ''
    }
    if(number > Math.pow(10,6)){
      return Math.round(number * 10/ Math.pow(10,6))/10 +'M'
    }
    if(number > 10000 && number < Math.pow(10,6))
    {
      return Math.round(number * 1000 )/1000000 +'K'
    }
    if(number < 10000){
      return Math.round(number * 10 )/1000 +'K'
    }
    if(number < 100) {
        return number
    }
   
  }