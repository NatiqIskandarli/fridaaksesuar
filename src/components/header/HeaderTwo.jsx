"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Nav from "@/components/header/elements/Nav";
import LangDropdown from "@/components/header/elements/LangDropdown";
import CuurencyDropdown from "@/components/header/elements/CurrencyDropdown";
import HeaderTopNotify from "@/components/header/elements/HeaderTopNotify";
import HeaderBrand from "@/components/header/elements/HeaderBrand";
import HeaderActions from "@/components/header/elements/HeaderActions";
import HeaderAsideMenu from "./elements/HeaderAsideMenu";
import CountDown from "@/components/elements/CountDown";
import ProductSearchModal from "./elements/ProductSearchModal";
import HeaderQuickLink from "./elements/HeaderQuickLink";

const HeaderTwo = () => {
  const menuOption = useSelector((state) => state.menu);
	const [searchToggle, setSearchToggle] = useState(false);
	const searchBoxToggleHandler = () => {
		setSearchToggle((toggler) => !toggler);
	};

  return (
    <header className="header axil-header header-style-2">
      <div className="axil-header-top-spec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-9">
              <div className="header-top-dropdown ustteref"> 
                <Link href='/'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" style={{fill:'#ffffff'}}><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>  Əhməd Rəcəbli küç, Nərimanov ray, Bakı, Azərbaycan</Link>
                <Link href='/' style={{marginLeft:'10px'}}><i className="far fa-envelope"/> office@fridaaksesuar.com</Link>
              </div>
            </div>
            <div className="col-sm-3 ustteref">
              <Link href='/'>facebook </Link>
              <Link href='/'> instagram</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="axil-header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-sm-3 col-5">
              <HeaderBrand />
            </div>
            <div className="col-lg-9 col-sm-9 col-7">
              <div className="header-top-dropdown dropdown-box-style">
                <div className="axil-search" onClick={searchBoxToggleHandler}>
                  <input
                    type="search"
                    className="placeholder product-search-input"
                    name="search2"
                    placeholder="Axtardığınız məhsulu yazın"
                    autoComplete="off"
                  />
                  <button type="submit" className="icon wooc-btn-search">
                    { <i className="far fa-search" /> }
                    <span>axtar</span>
                  </button>
                </div>
                <HeaderActions />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="axil-mainmenu aside-category-menu">
        <div className="container">
          <div className="header-navbar">
            <HeaderAsideMenu />
            <div className={`header-main-nav ${menuOption.isMobileMenuOpen ? "open": ""}`}>
              <Nav />
            </div>
            
          </div>
        </div>
      </div>
	  { searchToggle && (
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
      )}
    </header>
  );
};

export default HeaderTwo;
