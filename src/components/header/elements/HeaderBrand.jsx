import Link from "next/link";
import Image from "next/image";
import { Logo,WebsiteAltName } from "@/data/Common";
const HeaderBrand = (props) => {
    return ( 
        <div className="header-brand">
            <Link href="/" className="logo">
            <Image
                src={Logo.dark}
                alt={WebsiteAltName}
                height={60}
                width={295}
            />
            </Link>
        </div>
     );
}
 
export default HeaderBrand;