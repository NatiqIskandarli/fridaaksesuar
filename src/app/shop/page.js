import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";
import HeaderTwo from "@/components/header/HeaderTwo";

const Shop = ({searchParams}) => {
    return ( 
        <>
        <HeaderTwo />
        <Breadcrumb activeItem="Shop" title="Explore All Products" />
        <main className="main-wrapper">
            {searchParams.layout === "no-sidebar" ? <ShopNoSidebar />:<ShopWithSidebar />}       
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Shop;