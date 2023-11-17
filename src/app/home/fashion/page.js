'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SlickSlider from "@/components/elements/SlickSlider";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderTwo from "@/components/header/HeaderTwo";
import BannerThree from "@/components/hero-banner/BannerThree";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceOne from "@/components/services/ServiceOne";
import ServiceTwo from "@/components/services/ServiceTwo";
import ProductsData from "@/data/Products";
import { slugify, mapInSlices } from '@/utils';
import ProductTwo from '@/components/product/ProductTwo';
import TestimonialOne from '@/components/testimonial/TestimonialOne';
import ProductOne from '@/components/product/ProductOne';
import ProductSeven from '@/components/product/ProductSeven';
import ProductFour from '@/components/product/ProductFour';
import PosterOne from '@/components/poster/PosterOne';
import CategoryElectronics from '@/components/category/CategoryElectronics';
import PosterTwo from '@/components/poster/PosterTwo';
import CategoryFurniture from '@/components/category/CategoryFurniture';

const HomeFashion = () => {
    // const pathname = usePathname(); 
    const pathname = 'home/fashion'; 
    const split = pathname.split("/");
    const pageCategory = split[split.length - 1];
    const fashionProduct = ProductsData.filter(data => slugify(data.pCate) === pageCategory);
    const transparentProduct = ProductsData.filter(data => slugify(data.pCate) === pageCategory && data.thumbnailTransparent === true);
    const exploreProduct = mapInSlices(fashionProduct, 4);

    return ( 
        <>
        <HeaderTwo />
        <main className="main-wrapper">
          {/* slide banner */}
            <BannerThree />            
            <CategoryFurniture />
            {/* <ServiceOne /> */}            
            <ServiceTwo />
            <PosterTwo column="mb--10"/>
            <Section>
                <SectionTitle
                title="Ən çox satılanlar"
                subtitle=""
                subtitleIcon=""
                subColor="highlighter-primary"
                />
                <SlickSlider
                class="explore-product-activation slick-layout-wrapper slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
                slidesToShow={1}
                >
                     {exploreProduct.slice(0, 2).map((product, index) => (
                        <div key={index}>
                            <div className="row row--15">
                            {product.map((data) => (
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" key={data.id}>
                                    <ProductOne product={data} />
                                </div>
                            ))}
                        </div>
                        </div>
                    ))}
                </SlickSlider>        
            </Section>
            
            
            <Section>
                <SectionTitle
                title="Endirimdə olanlar"
                subtitle=""
                subtitleIcon=""
                subColor="highlighter-primary"
                />
                <SlickSlider
                class="explore-product-activation slick-layout-wrapper slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
                slidesToShow={1}
                >
                     {exploreProduct.slice(0, 2).map((product, index) => (
                        <div key={index}>
                            <div className="row row--15">
                            {product.map((data) => (
                                <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" key={data.id}>
                                    <ProductOne product={data} />
                                </div>
                            ))}
                        </div>
                        </div>
                    ))}
                </SlickSlider>        
            </Section>           
            
            
        </main>
        <FooterTwo />
        </>
    );
}
 
export default HomeFashion;