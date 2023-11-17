'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import SlickSlider from "../elements/SlickSlider";
import Section from "../elements/Section";
import { Category } from "@/data/ProductCategory";
import { slugify } from "@/utils";

const CategoryFurniture = () => {
  // const pathname = usePathname();
  const pathname = "/home/fashion";
  const split = pathname.split("/");
  const pageCategory = split[split.length - 1];
  
  // const findCategory = Category.filter(
  //   (data) => slugify(data.cate) === pageCategory
  //   );
    // const furniture = findCategory[0].subCate;

  return (
    <Section pClass="axil-categorie-area" sectionPadding="pt--30">
      {/* <SlickSlider
        class="slick-layout-wrapper--15 categorie-product-two"
        slidesToShow={4}
        arrows={false}
        infinite={false}
        autoplay={false}
        responsive = {[
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
        ]}
      >
        {/* {furniture.map((data, index) => (
          <div className="categrie-product-2" key={index}>
            <Link href={`/products/category/${pageCategory}/${slugify(data.name)}`}>
              <Image src={data.thumb} height={24} width={24} alt={data.name} />
              <h6 className="cat-title">{data.name}</h6>
            </Link>
          </div>
        ))} */}
          
      {/* </SlickSlider> */} 
        <div className="moduleHomePage">
          <div className="categrie-product-2">
            <Link href={`/`}>              
              <h6 className="cat-title">ƏN ÇOX SATILANLAR</h6>
            </Link>
          </div>
          <div className="categrie-product-2">
            <Link href={`/`}>              
              <h6 className="cat-title">ƏN ÇOX BƏYƏNİLƏNLƏR</h6>
            </Link>
          </div>
          <div className="categrie-product-2">
            <Link href={`/`}>              
              <h6 className="cat-title">YENİ GƏLƏNLƏR</h6>
            </Link>
          </div>
          <div className="categrie-product-2">
            <Link href={`/`}>              
              <h6 className="cat-title">ENDİRİMDƏ OLANLAR</h6>
            </Link>
          </div>
        </div>
    </Section>
  );
};

export default CategoryFurniture;
