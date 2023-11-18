'use client';
import { FashionSlider, FashionSliderProduct,FashionSliderProductSpec,FashionSliderProductIki } from "@/data/Slider";
import SlickSlider from "../elements/SlickSlider";
import Link from "next/link";
import Image from "next/image";

const BannerThree = () => {
    return (
      <div className="axil-main-slider-area main-slider-style-2">
        <div className="container">
          <div className="slider-offset-left">
            <div className="row row--20">
              <div className="col-lg-6">
                <div className="slider-box-wrap">
                  <SlickSlider
                    class="axil-slick-dots"
                    slidesToShow={1}
                    arrows={false}
                    dots={true}
                    autoplay={true}
                    autoplaySpeed={5500}
                  >
                    {FashionSlider.map((data, index) => (
                        <div key={index}>
                        <div className="single-slide">
                            <div className="main-slider-thumb">
                                <Image 
                                src={data.thumb}
                                fill={true}
                                alt="slider Image"
                                />
                            </div>
                            {/* <div className="main-slider-content">
                                <span className="subtitle">
                                <i className={data.subIcon} /> {data.subTitle}
                                </span>
                                <h1 className="title">{data.title}</h1>
                                <div className="shop-btn">
                                    <Link href="/shop" className="axil-btn">ətraflı <i className="fal fa-long-arrow-right" /></Link>
                                </div>
                            </div> */}
                            
                          </div>
                      </div>
                    ))}
                  </SlickSlider>
                </div>
              </div>
              <div className="col-lg-3" style={{paddingLeft:'0px',marginTop:'20px'}}>
                <div className="slider-product-box">
                  <div className="product-thumb product-thumb-spec">
                    <Image 
                    src={FashionSliderProductSpec.thumbnail}
                    width={300}
                    height={409}
                    alt="Product"
                    />
                  </div>
                  {/* <div className="rightBanner-spec">
                    <h6 className="title">{FashionSliderProduct.title}</h6>
                    <span className="price">{FashionSliderProduct.price}</span>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-3" style={{paddingLeft:'0px',paddingRight:'0px',marginTop:'20px'}}>
                <div className="slider-product-box">
                  <div className="product-thumb">
                    <Image 
                    src={FashionSliderProductIki.thumbnail}
                    width={351}
                    height={236}
                    alt="Product"
                    />
                  </div>
                  {/* <div className="rightBanner-spec">
                    <h6 className="title">{FashionSliderProduct.title}</h6>
                    <span className="price">{FashionSliderProduct.price}</span>
                  </div> */}
                </div>

                <div className="slider-product-box" style={{marginTop:'0px'}}>
                  <div className="product-thumb">
                    <Image 
                    src={FashionSliderProduct.thumbnail} 
                    width={351}
                    height={236}
                    alt="Product"
                    />
                  </div>
                  {/* <div className="rightBanner-spec">
                    <h6 className="title">{FashionSliderProduct.title}</h6>
                    <span className="price">{FashionSliderProduct.price}</span>
                  </div> */}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default BannerThree;