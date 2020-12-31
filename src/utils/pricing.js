function getItemPrice (product,configuration){
    console.log('configuration Price',configuration)
    let dostava_comission_perc = product.dostava_commission  && product.dostava_commission !== "" 
    && product.dostava_commission !== null   
    && parseFloat(product.dostava_commission) !== 0  ? parseFloat(product.dostava_commission)  : 
    parseFloat(configuration.configuration.commission_percentage) ;
    if(product.quantity === undefined){
        product.quantity = 1
    }
    let dealPrice = product.vendor_pricing * product.quantity;
    let dostava_comission_amount =  (dostava_comission_perc/100)*dealPrice;
    
    let product_price = dealPrice + dostava_comission_amount
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

export { getItemPrice }