'use client';
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderTwo from "@/components/header/HeaderTwo";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";

const SingleProductLayout = ({ children }) => {
    return ( 
        <>
        <HeaderTwo/>
        <main className="main-wrapper">
           {children}            
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default SingleProductLayout;