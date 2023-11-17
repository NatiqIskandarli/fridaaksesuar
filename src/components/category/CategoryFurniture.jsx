'use client';
import Link from "next/link";
import Section from "../elements/Section";


const CategoryFurniture = () => {


  return (
    <Section pClass="axil-categorie-area" sectionPadding="pt--30">
               
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
