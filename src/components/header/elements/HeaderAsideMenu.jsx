import Image from "next/image";
import Link from "next/link";
import { CateMenu } from "@/data/Menu";
import { slugify } from "@/utils";
import { useEffect, useState } from "react";
import { getListCategory, getListSubCategory} from "../../../http/category";

const HeaderAsideMenu = () => {
  const [asideMenuToggler, setAsideMenuToggler] = useState(false);
  const [asideMenuTogglerMob, setAsideMenuTogglerMob] = useState('');
  const [windowWidth, setWindowWidth] = useState();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const asideMenuHandler = () => {
    setAsideMenuToggler(!asideMenuToggler);
  }

  const openMenu = (index) => {
    setAsideMenuTogglerMob(index);
  }

  const asideMobileMenuHandler = () => {
		let windowWidthCheck = window.innerWidth;
		setWindowWidth(windowWidthCheck);
		window.addEventListener("resize", (e) => {
			let windowWidth = window.innerWidth;
			setWindowWidth(windowWidth);
		});
		let subMenuToggler = document.getElementsByClassName("has-megamenu");
		if (windowWidth < 1200) {
			for (let i = 0; i < subMenuToggler.length; i++) {
				let element = subMenuToggler[i];
				element.addEventListener("click", function (e) {
				e.preventDefault();
				if (element.offsetParent.classList.contains("open")) {
					for (let j = 0; j < subMenuToggler.length; j++) {
					const subElem = subMenuToggler[j];
					subElem.offsetParent.classList.remove("open");
					subElem.nextSibling.style.display = "none";
					}
				} else {
					for (let j = 0; j < subMenuToggler.length; j++) {
						const subElem = subMenuToggler[j];
						subElem.offsetParent.classList.remove("open");
						subElem.nextSibling.style.display = "none";
					}
					element.offsetParent.classList.add("open");
					element.nextSibling.style.display = "block";
				}
				});
			}
		}
	}



	useEffect(() => {		
    const fetchListCat = async () =>{
      try {
        const getListCat = await getListCategory()      
        setCategory(getListCat)

        await fetchSubCat(getListCat)
      } catch (error) {
        console.log(error.message)
      }
      
    }

    const fetchSubCat = async (getListCat) => {

      const getSubCatName = await getListSubCategory();
      const updatetCat = getListCat.map(cat=>{
        const findSub = getSubCatName.filter((sub)=> sub.categoryId === cat.id)
        return {
          ...cat,
          "hasChildren" : "has-megamenu",
          "children" : 
          findSub.map(alt=>{
              return {
                "id" : alt.id,
                "name" : alt.title,
              }
            })        
        }
      })

      setSubCategory(updatetCat)
    }

    fetchListCat()
    asideMobileMenuHandler();

	}, [windowWidth]);

  return (
    <div className="header-nav-department">
      <aside className="header-department">
        <button className="header-department-text department-title" onClick={asideMenuHandler}>
          <span className="icon">
            <i className="fal fa-bars" />
          </span>
          <span className="text" onClick={asideMenuHandler}>Kateqoriya</span>
        </button>
        <nav className={`department-nav-menu category-hide ${asideMenuToggler ? "open" : ""}`}>
          <button className="sidebar-close" onClick={asideMenuHandler}>
            <i className="fas fa-times" />
          </button>
          <ul className="nav-menu-list">
            {subCategory.map((menuItem, index) => (
              <li key={index}>
                <Link
                  href='#'
                  onClick={()=>openMenu(index)}
                  className={`nav-link ${
                    menuItem.hasChildren ? "has-megamenu" : ""
                  }`}
                >
                  {/* <span className="menu-icon">
                    <Image
                      src={menuItem.icon}
                      alt="icon"
                      height={25}
                      width={25}
                    />
                  </span> */}

                  <span className="menu-text">{menuItem.title}</span>
                </Link>
				        {menuItem.hasChildren && (
                <div className={`department-megamenu ${asideMenuTogglerMob == index ? "openMob" : ""}`}>
                  <div className="department-megamenu-wrap">
                    <div className="department-submenu-wrap">
                     
                        <div className="department-submenu" >
                          <ul>
                          {menuItem.children.map((item, index) => (
                              <li key={index}>
                                <Link href={`/mehsullar?alt=${item.id}`}>{item.name}</Link>
                              </li>                              
                            ))}
                          </ul>
                        </div>
                      
                    </div>		
                  </div>
                </div>
				        )}
              </li>
            ))}
          </ul>
        </nav>
        {asideMenuToggler && windowWidth < 1200 && (
        <div
          className="closeMask"
          onClick={asideMenuHandler}
        ></div>
      )}
      </aside>
    </div>
  );
};

export default HeaderAsideMenu;
