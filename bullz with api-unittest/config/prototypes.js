/*
*  Прототипы для своих нужд  
*
*  prototypes.js
*/

const prototypes = () => {

    /**
     * toFixed Advanced
     * @description: Если я хочу обрезать число до 2 знаков, но при этом не получить строку на выхлопе (toFixed(2))?
     */
    Number.prototype.toFixedAdv = function(numbers) {
      return Number(this.toFixed(numbers))
    }
   

}


module.exports = prototypes