import moment from "moment";

function getItemPrice (product,configuration){
    console.log('configuration Price',configuration)
    console.log('getItemPrice product Price',product)

    let dostava_comission_perc = product.dostava_commission  && product.dostava_commission !== "" && product.dostava_commission !== null && parseFloat(product.dostava_commission) !== 0  ? parseFloat(product.dostava_commission)  : 
    parseFloat(configuration.configuration.commission_percentage);
    if(product.quantity === undefined){
        product.quantity = 1
    }
    console.log("dostava_comission_perc>>>",dostava_comission_perc);

    let dealPrice = product.vendor_pricing * product.quantity;
    let dostava_comission_amount =  (dostava_comission_perc/100)*dealPrice;
    
    let product_price = parseFloat(dealPrice) + parseFloat(dostava_comission_amount)
    return (product_price).toFixed(2)
}

function getItemPriceOrderDetails (product,configuration){
    console.log('configuration Price',configuration)
    console.log('getItemPrice product Price',product)

    let dostava_comission_perc = product.dostava_commission  && product.dostava_commission !== "" && product.dostava_commission !== null && parseFloat(product.dostava_commission) !== 0  ? parseFloat(product.dostava_commission)  : 
    parseFloat(configuration.commission_percentage);
    if(product.quantity === undefined){
        product.quantity = 1
    }
    console.log("dostava_comission_perc>>>",dostava_comission_perc);

    let dealPrice = product.vendor_pricing * product.quantity;
    let dostava_comission_amount =  (dostava_comission_perc/100)*dealPrice;
    
    let product_price = parseFloat(dealPrice) + parseFloat(dostava_comission_amount)
    return (product_price).toFixed(2)
}

// export const  getItemPrice = (product, configuration) => {
//     console.log("here inside getItem prioc", product)
//     let dostava_comission_perc = product.dostava_commission ? parseFloat(product.dostava_commission) : parseFloat(configuration.commission_percentage) ;
//     let dealPrice = product.price * product.quantity;
//     let dostava_comission_amount =  (dostava_comission_perc/100)*dealPrice;
    
//     let product_price = dealPrice + dostava_comission_amount
//     return product_price
// }

function isTimeBetween(startTime, endTime, serverTime) {


    let start = moment(startTime, "H:mm")
    let end = moment(endTime, "H:mm")
    let server = moment(serverTime, "H:mm")

    if (end < start) {
        return server >= start && server <= moment('23:59:59', "h:mm:ss") || server >= moment('0:00:00', "h:mm:ss") && server < end;
    }
    // console.log('server >= start && server < end',server >= start && server < end)
    return server >= start && server < end
  }


export { getItemPrice,getItemPriceOrderDetails ,isTimeBetween }