"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  addToQuickView,
} from "@/store/slices/productSlice";

const ActionButtons = (props) => {
  const dispatch = useDispatch();
  const getWishlist = useSelector((state) => state.productData.wishlistItems);
  const isWishlistAdded = getWishlist.filter((data) => data.productId === props.productAction.productId);

  const handleAddToCart = (product) => {
    console.log(product)
    console.log("add to cart dddddd productun uzerine gelende cixan buttondur")
    const img = process.env.NEXT_PUBLIC_APP_API_URL+product.imageURL
    product.stockQuantity = 1;
    const productWithTag = {...product, thumbnail : img}

    dispatch(addToCart(productWithTag));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const quickViewHandler = (product) => {
    dispatch(addToQuickView({
      viewItem: product,
      quickView: true
    }));
  };

  return (
    <ul className="cart-action">
      {props.wishlistBtn && props.productAction.pCate !== "NFT" && (
        <li className="wishlist">
          <button onClick={() => handleAddToWishlist(props.productAction)}>
		  <i className={isWishlistAdded.length === 1 ? "fas fa-heart" : "far fa-heart"} />
          </button>
        </li>
      )}
      {props.cartBtn && (
        <li className="select-option">
          {props.productAction.pCate === "NFT" || props.productAction.productType === "variable" ? (
            <Link href={`/products/${props.productAction.productId}`}>
              Buy Product
            </Link>
          ) : (
            <button onClick={() => handleAddToCart(props.productAction)}>
              Add to Cart
            </button>
          )}
        </li>
      )}
      {props.quickViewBtn && props.productAction.pCate !== "NFT" && (
        <li className="quickview">
          <button onClick={() => quickViewHandler(props.productAction)}>
            <i className="far fa-eye" />
          </button>
        </li>
      )}
    </ul>
  );
};

export default ActionButtons;
