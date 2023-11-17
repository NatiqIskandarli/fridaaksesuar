import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "../shop/ShopNoSidebar";
import ShopWithSidebar from "../shop/ShopWithSidebar";
import HeaderTwo from "@/components/header/HeaderTwo";

const Mehsullar = ({searchParams}) => {
    return ( 
        <>
        
        <HeaderTwo />
        <Breadcrumb activeItem="Shop" title="Mehsullar" />
        <main className="main-wrapper">
            {searchParams.layout === "no-sidebar" ? <ShopNoSidebar />:<ShopWithSidebar searchParams={searchParams}/>}
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Mehsullar;