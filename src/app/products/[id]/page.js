"use client"
import ProductsData from "@/data/Products";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import SlickSlider from "@/components/elements/SlickSlider";
import SingleLayouThree from "./SingleLayouThree";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";
import { useEffect, useState } from "react";
import { getOneProduct,getOneProductImages } from "@/http/product";



const ProductDetails = ({ params }) => {
    const [singleProduct, setSingleProduct] = useState([])
    const [images, setImages] = useState([])
    // const findProduct = ProductsData.filter(product => slugify(product.id) === slugify(params.id));
    // const singleProducttest = findProduct[0];
    // const productCategory = singleProducttest.pCate;
    // const relatedProduct = ProductsData.filter(product => slugify(product.pCate) === slugify(productCategory));
    

    useEffect(()=>{
        const fetchSingleProd = async ()=>{

            const [getProductData, getImagesForProduct] = await Promise.all([
                getOneProduct(params.id),
                getOneProductImages(params.id)
              ])
              
            setSingleProduct(getProductData)
            setImages(getImagesForProduct)
        }

        fetchSingleProd()

    },[params.id])


    return (
        <>
            {/* <SingleLayoutFour singleData={singleProduct} /> */}

            <SingleLayouThree singleData={singleProduct} images={images}/>




            
            <Section pClass="pb--50 pb_sm--30">
                <SectionTitle 
                    title="Viewed Items"
                    subtitle="Your Recently"
                    subtitleIcon="far fa-shopping-basket"
                    subColor="highlighter-primary"
                />
                <SlickSlider
                class="recent-product-activation slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
                slidesToShow={4}
                infinite={false}
                responsive = {[
                    {
                      breakpoint: 1400,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                      }
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                      }
                    },
                    {
                      breakpoint: 575,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      }
                    },
                  ]}
                >
                    {/* {relatedProduct?.slice(0, 10).map((data) => (
                        <ProductOne product={data} key={data.id}/>
                    ))} */}
                </SlickSlider>
            </Section>
        </>
    );
}

export default ProductDetails;


export async function generateStaticParams() {
    const products = ProductsData;

    return products.map((post) => ({
        id: slugify(post.id),
    }));
}