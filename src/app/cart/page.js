'use client';
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch} from "react-redux";
import HeaderOne from "@/components/header/HeaderOne";
import { slugify } from "@/utils";
import { removeCartItem, cartQuantityIncrease, cartQuantityDecrease, cartClear, updateCartAmount } from "@/store/slices/productSlice";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderTwo from "@/components/header/HeaderTwo";

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.productData);

    const removeCartHandler = (data) => {
        dispatch(removeCartItem(data))
        dispatch(updateCartAmount())
    }

    const quantityIncreaseHandler = (data) => {
        dispatch(cartQuantityIncrease(data))
        dispatch(updateCartAmount())
    }
    const quantityDecreaseHandler = (data) => {
        dispatch(cartQuantityDecrease(data))
        dispatch(updateCartAmount())
    }
    const cartClearHandler = () => {
        dispatch(cartClear()) 
        dispatch(updateCartAmount())
    }
    const updateCartHandler = () => {
        dispatch(updateCartAmount())
    }

    return (
        <>
        <HeaderTwo />
        <main className="main-wrapper">
            <div className="axil-product-cart-area axil-section-gap">
                <div className="container">
                    {cartProducts.cartItems.length > 0 ? 
                    <div className="axil-product-cart-wrap">
                        <div className="product-table-heading">
                            <h4 className="title">Sizin səbətiniz</h4>
                            <button className="cart-clear" onClick={() => cartClearHandler()}>Səbəti boşalt</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table axil-product-table axil-cart-table mb--40">
                                <thead>
                                    <tr>
                                        <th scope="col" className="product-remove" />
                                        <th scope="col" className="product-thumbnail">Məhsul</th>
                                        <th scope="col" className="product-title" />
                                        <th scope="col" className="product-price">Qiymət</th>
                                        <th scope="col" className="product-quantity">Say</th>
                                        <th scope="col" className="product-subtotal">Məbləğ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts.cartItems.map((product) => (
                                        <tr key={product.productId}>
                                        <td className="product-remove">
                                            <button className="remove-wishlist" onClick={() => removeCartHandler(product)}>
                                                <i className="fal fa-times" />
                                            </button>
                                            </td>
                                        <td className="product-thumbnail">
                                            <Link href={`/products/${product.productId}`}>
                                                <Image 
                                                src={product.thumbnail}
                                                width={80}
                                                height={80}
                                                alt={product.title}
                                                
                                                />
                                            </Link>
                                        </td>
                                        <td className="product-title">
                                            <Link href={`/products/${product.productId}`}>
                                                {product.title}
                                            </Link>
                                        </td>
                                        <td className="product-price" data-title="Price">
                                            {product.salePrice ? product.salePrice : product.price}
                                            <span className="currency-symbol">AZN</span>
                                            </td>
                                        <td className="product-quantity" data-title="Qty">
                                            <div className="pro-qty">
                                                <span className="qtybtn" onClick={() => quantityDecreaseHandler(product)}>-</span>
                                                <input type="number" className="quantity-input" value={product.stockQuantity} readOnly />
                                                <span className="qtybtn" onClick={() => quantityIncreaseHandler(product)}>+</span>
                                            </div>
                                        </td>
                                        <td className="product-subtotal" data-title="Subtotal">
                                            {parseFloat(product.salePrice ? product.salePrice * product.stockQuantity : product.price * product.stockQuantity).toFixed(2)}
                                            <span className="currency-symbol">AZN</span>
                                            </td>
                                    </tr>
                                    ))}
                                
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-update-btn-area">
                            <div className="input-group product-cupon">
                                {/* <input placeholder="Enter coupon code" type="text" />
                                <div className="product-cupon-btn">
                                    <button type="submit" className="axil-btn btn-outline">Apply</button>
                                </div> */}
                            </div>
                            <div className="update-btn">
                                <button className="axil-btn btn-outline" onClick={() => updateCartHandler()}>Məlumatları yenilə</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
                                <div className="axil-order-summery mt--80">
                                <h5 className="title mb--20">Sifarişiniz</h5>
                                <div className="summery-table-wrap">
                                    <table className="table summery-table mb--30">
                                    <tbody>
                                        <tr className="order-subtotal">
                                        <td>Məbləğ</td>
                                        <td>{cartProducts.cartTotalAmount} AZN</td>
                                        </tr>
                                        <tr className="order-shipping">
                                        {/* <td>Çatdırılma</td> */}
                                        {/* <td>
                                            <div className="input-group">
                                            <input type="radio" id="radio1" name="shipping" defaultChecked />
                                            <label htmlFor="radio1">Pulsuz çatdırılma</label>
                                            </div>
                                            <div className="input-group">
                                            <input type="radio" id="radio2" name="shipping" />
                                            <label htmlFor="radio2">Ödənişli: 5 AZN</label>
                                            </div>
                                        </td> */}
                                        </tr>
                                        <tr className="order-total">
                                        <td>Cəmi məbləğ</td>
                                        <td className="order-total-amount">{cartProducts.cartTotalAmount} AZN </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>

                                {cartProducts.cartTotalAmount > 29 && (
                                <Link href="/checkout" className="axil-btn btn-bg-primary checkout-btn">
                                Ödəniş et
                                </Link>
                                )}

                                {cartProducts.cartTotalAmount <29  && (
                                    <h4>Minimum 30 azn dəyərində məhsul almaq lazımdır</h4>
                                )}



                                </div>
                            </div>
                        </div>
                    </div>:
                    <div className="text-center">
                        <h4>Səbətiniz boşdur</h4>
                        <Link className="axil-btn btn-bg-primary" href="/">Alış verişə davam et</Link>
                    </div>
                    }
                </div>
            </div>
        </main>
        <FooterTwo />
        </>
    );
}

export default Cart;