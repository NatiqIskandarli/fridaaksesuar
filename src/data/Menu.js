const HeaderMenu = [
    {
        name: "Ana səhifə",
        url: "#",
        hasChildren: false
    },
    {
        name: "Haqqımızda",
        url: "/about",
        hasChildren: false,
        
    },
    {
        name: "Qaydalar və Şərtlər",
        url: "/privacy-policy",
        hasChildren: false
    },
    {
        name: "Çatdırılma və Ödəniş",
        url: "/privacy-policy",
        hasChildren: false,
        children: [
            {
                name: "alt menu",
                url: "/altmenu"
            }
        ]
    },
    {
        name: "Bizimlə Əlaqə",
        url: "/contact",
        hasChildren: false,
        
    },
]

const CateMenu = [
    {
        name: "Fashion",
        url: "/shop?category=fashion",
        icon: "/images/product/categories/cat-01.png",
        hasChildren: true,
        children: [
            {
                label: "Men",
                items: [
                    {
                        name: "T-shirts",
                        url: "/"
                    },
                    {
                        name: "Shirts",
                        url: "/"
                    },
                    {
                        name: "Jeans",
                        url: "/"
                    }
                ]
            },
            {
                label: "Women",
                items: [
                    {
                        name: "Jeans",
                        url: "/"
                    },
                    {
                        name: "T-shirts",
                        url: "/"
                    },
                    {
                        name: "Shirts",
                        url: "/"
                    },
                    {
                        name: "Tops",
                        url: "/"
                    },
                    {
                        name: "Jumpsuits",
                        url: "/"
                    },
                    {
                        name: "Coats",
                        url: "/"
                    },
                    {
                        name: "Sweater",
                        url: "/"
                    },
                ]
            },
            {
                label: "Accessories",
                items: [
                    {
                        name: "Handbag",
                        url: "/"
                    },
                    {
                        name: "Shoes",
                        url: "/"
                    },
                    {
                        name: "Wallets",
                        url: "/"
                    }
                ]
            },
        ],
        featured: [
            {
                thumb:"/images/product/product-feature1.png",
                url: "/"
            },
            {
                thumb:"/images/product/product-feature2.png",
                url: "/"
            },
            {
                thumb:"/images/product/product-feature3.png",
                url: "/"
            },
            {
                thumb:"/images/product/product-feature4.png",
                url: "/"
            },
            
        ]

    },
    {
        name: "Electronics",
        url: "/shop?category=electronics",
        icon: "/images/product/categories/cat-02.png",
        hasChildren: false
    },
    {
        name: "Home Decor",
        url: "/",
        icon: "/images/product/categories/cat-03.png",
        hasChildren: false
    },
    {
        name: "Medicine",
        url: "/",
        icon: "/images/product/categories/cat-04.png",
        hasChildren: false
    },
    {
        name: "Furniture",
        url: "/shop?category=furniture",
        icon: "/images/product/categories/cat-05.png",
        hasChildren: false
    },
    {
        name: "Crafts",
        url: "/",
        icon: "/images/product/categories/cat-06.png",
        hasChildren: false
    },
    {
        name: "Accessories",
        url: "/",
        icon: "/images/product/categories/cat-07.png",
        hasChildren: false
    },
    {
        name: "Camera",
        url: "/",
        icon: "/images/product/categories/cat-08.png",
        hasChildren: false
    }
]

const DashboardAsideMenu = [
    {
      icon: "fas fa-th-large",
      name: "Kabinet",
      slug: ""
    },
    {
        icon: "fas fa-th-large",
        name: "Balans",
        slug: "balans"
    },
    {
        icon: "fas fa-th-large",
        name: "Dövriyyə tarixçə",
        slug: "tarixce"
    },
    {
      icon: "fas fa-shopping-basket",
      name: "Sifarişlərim",
      slug: "orders"
    },
    {
      icon: "fas fa-home",
      name: "Ünvanım",
      slug: "addresses-edit"
    },
    {
      icon: "fas fa-user",
      name: "Şəxsi məlumatlarım",
      slug: "account-details" 
    }
]

export {HeaderMenu, CateMenu, DashboardAsideMenu};