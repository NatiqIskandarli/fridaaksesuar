'use client';
import { useEffect, useState } from "react";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SlickSlider from "@/components/elements/SlickSlider";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderTwo from "@/components/header/HeaderTwo";
import BannerThree from "@/components/hero-banner/BannerThree";
import ServiceTwo from "@/components/services/ServiceTwo";
import ProductsData from "@/data/Products";
import { slugify, mapInSlices } from '@/utils';
import ProductOne from '@/components/product/ProductOne';
import PosterTwo from '@/components/poster/PosterTwo';
import CategoryFurniture from '@/components/category/CategoryFurniture';
import { getAllProductsByImg } from "@/http/product";

const HomeFashion = () => {
    // const pathname = usePathname(); 
    const [filterProduct, setFilterProduct] = useState([]);
    const pathname = 'home/fashion'; 
    const split = pathname.split("/");
    const pageCategory = split[split.length - 1];

    useEffect(()=>{
        const fetchProd = async () =>{
            try {
                const resultProd = await getAllProductsByImg()
                setFilterProduct(resultProd)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProd()
    },[])


    const fashionProduct = filterProduct;
    const transparentProduct = ProductsData.filter(data => slugify(data.pCate) === pageCategory && data.thumbnailTransparent === true);
    const exploreProduct = mapInSlices(fashionProduct, 4);

    return (
        <>
        Texniki işlər gedir
        </>
    )

    // return ( 
    //     <>
    //     <HeaderTwo />
    //     <main className="main-wrapper">
    //       {/* slide banner */}
    //         <BannerThree />            
    //         <CategoryFurniture />
    //         {/* <ServiceOne /> */}            
    //         {/* <ServiceTwo /> */}
    //         <PosterTwo column="mb--10"/>
    //         <Section>
    //             <SectionTitle
    //             title="Ən çox satılanlar"
    //             subtitle=""
    //             subtitleIcon=""
    //             subColor="highlighter-primary"
    //             />
    //             <SlickSlider
    //             class="explore-product-activation slick-layout-wrapper slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
    //             slidesToShow={1}
    //             >
    //                  {exploreProduct.slice(0, 2).map((product, index) => (
    //                     <div key={index}>
    //                         <div className="row row--15">
    //                         {product.map((data) => (
    //                             <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" key={data.id}>
    //                                 <ProductOne product={data} />
    //                             </div>
    //                         ))}
    //                     </div>
    //                     </div>
    //                 ))}
    //             </SlickSlider>        
    //         </Section>
            
            
    //         <Section>
    //             <SectionTitle
    //             title="Endirimdə olanlar"
    //             subtitle=""
    //             subtitleIcon=""
    //             subColor="highlighter-primary"
    //             />
    //             <SlickSlider
    //             class="explore-product-activation slick-layout-wrapper slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
    //             slidesToShow={1}
    //             >
    //                  {exploreProduct.slice(0, 2).map((product, index) => (
    //                     <div key={index}>
    //                         <div className="row row--15">
    //                         {product.map((data) => (
    //                             <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" key={data.id}>
    //                                 <ProductOne product={data} />
    //                             </div>
    //                         ))}
    //                     </div>
    //                     </div>
    //                 ))}
    //             </SlickSlider>        
    //         </Section>           
            
            
    //     </main>
    //     <FooterTwo />
    //     </>
    // );
}
 
export default HomeFashion;