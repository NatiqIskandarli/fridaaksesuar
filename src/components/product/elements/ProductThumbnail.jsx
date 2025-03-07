import Link from "next/link";
import Image from "next/image";
import ProductDiscountLabel from "./ProductDiscountLabel";
import ActionButtons from "./ActionButtons";

const ProductThumbnail = (props) => {	
  return (
      <div className="thumbnail">
        <Link href={`/products/${props.productThumb.productId}`}>
          <Image
            src={
              props.attributeImg ? props.attributeImg : process.env.NEXT_PUBLIC_APP_API_IMG_URL+props.productThumb.imageURL
            }
            width={props.width ?? 300}
            height={props.height ?? 300}
            alt='frida aksesuar'
          />
          {props.productThumb.hoverThumbnail && props.isHoverThumbnail ? (
            <Image
              src={props.productThumb.hoverThumbnail}
              width={props.width ?? 300}
              height={props.height ?? 300}
              alt='frida aksesuar'
              className="hover-img"
            />
          ) : (
            ""
          )}
        </Link>
        {props.productThumb.salePrice !== props.productThumb.price && props.discountLabel && (
          <ProductDiscountLabel discount={props.productThumb} />
        )}
		{props.hoverItems &&
		<div className="product-hover-action">
			<ActionButtons 
			productAction={props.productThumb}
			wishlistBtn={props.wishlistBtn}
			cartBtn = {props.cartBtn}
			quickViewBtn={props.quickViewBtn}
			/>
		</div>
		}
      </div>
  );
};

export default ProductThumbnail;
