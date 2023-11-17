
const ProductPrice = (props) => {
    return ( 
        <div className="product-price-variant">
              {props.price.salePrice ? (
                <span className="price old-price">
                  {props.price.price}
                  <span className="currency-symbol">azn</span>
                </span>
              ) : (
                ""
              )}
              <span className="price current-price">
                {props.price.salePrice
                  ? props.price.salePrice
                  : props.price.price}
                  <span className="currency-symbol">azn</span>
              </span>
            </div>
     );
}
 
export default ProductPrice;