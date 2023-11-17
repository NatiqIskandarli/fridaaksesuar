import Link from "next/link";

const ProductTitle = (props) => {
  const CustomTag = props.titleTag ? props.titleTag : "h5";

  return (
    <CustomTag className="title">
      <Link href={`/products/${props.productTitle.productId}`}>
        {props.productTitle.productName}
		{props.verified && 
		<span className="verified-icon">
		<i className="fas fa-badge-check" />
		</span>
		}
      </Link>
    </CustomTag>
  );
};

export default ProductTitle;
