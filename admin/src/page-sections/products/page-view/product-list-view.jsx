"use client";

import { useState, useEffect } from "react";
import { Tab, Box, Tabs, Card, Table, styled, Button, TableBody, TableContainer, TablePagination } from "@mui/material";
import Add from "icons/Add"; 
import useNavigate from "hooks/useNavigate"; 

import { Scrollbar } from "components/scrollbar";
import { FlexBetween } from "components/flexbox";
import { TableDataNotFound, TableToolbar } from "components/table"; 

import useMuiTable, { getComparator, stableSort } from "hooks/useMuiTable"; 

import ProductTableRow from "../ProductTableRow";
import ProductTableHead from "../ProductTableHead";
import ProductTableActions from "../ProductTableActions"; 

import { getListProducts,deleteMultipleProduct,deleteOneProduct } from "http/product";
import { getListSubCategory } from 'http/subCategory';

const ListWrapper = styled(FlexBetween)(({
  theme
}) => ({
  gap: 16,
  [theme.breakpoints.down(440)]: {
    flexDirection: "column",
    ".MuiButton-root": {
      width: "100%"
    }
  }
}));

const ProductListPageView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState({
    stock: "",
    search: "",
    publish: ""
  });

  const handleChangeFilter = (key, value) => {
    setProductFilter(state => ({ ...state,
      [key]: value
    }));
  };

  // useEffect(()=>{
  //   const fetchListProd = async () =>{
  //     const getListProd = await getListProducts()
  //     const catArr = []
  //     getListProd.forEach(getSub =>{
  //       catArr.push({
  //         subCategoryId : getSub.subCategoryId,
  //         productId : getSub.productId
  //       })
  //     })
      
  //     await fetchSubCatName(catArr,getListProd)
  //   }


  //   const fetchSubCatName = async (catArray,getListProd)=>{

  //     const getSubCatName = await getListSubCategory()

  //     const selectedCategoryS = getSubCatName.find(cat => {
  //       catArray.map((val)=>{
  //         if(cat.id === val.subCategoryId){
  //           getListProd.find(prod=>{
  //             if(prod.subCategoryId == cat.id){
  //               prod.subCategoryId = cat.title
  //             }
  //           })           
  //         }
  //       })        
  //     })
  //     setProducts(getListProd)
  //   }

  //   fetchListProd()
    
  // },[])
  

  useEffect(() => {
    const fetchListProd = async () => {
      try {
        const getListProd = await getListProducts();
        const catArr = getListProd.map(getSub => ({
          subCategoryId: getSub.subCategoryId,
          productId: getSub.productId,
        }));
  
        await fetchSubCatName(catArr,getListProd);
      } catch (error) {
        
        console.error(error);
      }
    };
  
    const fetchSubCatName = async (catArray,getListProd) => {
      try {
        const getSubCatName = await getListSubCategory();
        
        const updatedProducts = getListProd.map(prod => {
          const category = getSubCatName.find(cat => cat.id === prod.subCategoryId);
          return {
            ...prod,
            subCategoryId: category ? category.title : prod.subCategoryId,
          };
        });
  
        setProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchListProd();
  }, []);
  
  

  const {
    page,
    order,
    orderBy,
    selected,
    isSelected,
    rowsPerPage,
    handleSelectRow,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage
  } = useMuiTable({
    defaultOrderBy: "name"
  });
  let filteredProducts = stableSort(products, getComparator(order, orderBy)).filter(item => {
    if (productFilter.aktivlik === "published") return item.published === true;else if (productFilter.aktivlik === "draft") return item.published === false;else if (productFilter.search) return item.productName.toLowerCase().includes(productFilter.search.toLowerCase());else return true;
  });

  const handleDeleteProduct = async (id) => {
    try {
      setProducts(state => state.filter(item => item.productId !== id));
      await deleteOneProduct(id)
    } catch (error) {
      console.log(error)
    }      
  };

  const handleAllProductDelete = async () => {
    try {
      await deleteMultipleProduct(selected)
      setProducts(state => state.filter(item => !selected.includes(item.productId)));
      handleSelectAllRows([])();
    } catch (error) {
      console.log(error)
    }
    
    
  };




  return <Box pt={2} pb={4}>
      <ListWrapper>
        <Tabs value={productFilter.stock} onChange={(_, value) => handleChangeFilter("stock", value)}>
          <Tab disableRipple label="All" value="" />
          <Tab disableRipple label="In Stock" value="stock" />
          <Tab disableRipple label="Out of Stock" value="out-of-stock" />
        </Tabs>

        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/dashboard/products/create-product")}>
          Add Product
        </Button>
      </ListWrapper>

      <Card sx={{
      mt: 4
    }}>
        {
        /* SEARCH AND PUBLISH FILTER SECTION */
      }
        <ProductTableActions filter={productFilter} handleChangeFilter={handleChangeFilter} />

        {
        /* TABLE ROW SELECTION HEADER  */
      }
        {selected.length > 0 && <TableToolbar selected={selected.length} handleDeleteRows={handleAllProductDelete} />}

        {
        /* TABLE HEAD AND ROW SECTION */
      }
        <TableContainer>
          <Scrollbar>
            <Table sx={{
            minWidth: 820
          }}>
              <ProductTableHead 
                order={order} 
                orderBy={orderBy} 
                numSelected={selected.length} 
                rowCount={filteredProducts.length} 
                onRequestSort={handleRequestSort} 
                onSelectAllRows={handleSelectAllRows(filteredProducts.map(row => row.productId))} />

              <TableBody>
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => 
                <ProductTableRow 
                  key={product.productId} 
                  product={product} 
                  handleSelectRow={handleSelectRow} 
                  isSelected={isSelected(product.productId)} 
                  handleDeleteProduct={handleDeleteProduct} />
                )}

                {filteredProducts.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {
        /* PAGINATION SECTION */
      }
        <TablePagination 
          page={page} 
          component="div" 
          rowsPerPage={rowsPerPage} 
          count={filteredProducts.length} 
          onPageChange={handleChangePage} 
          rowsPerPageOptions={[5, 10, 25]} 
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Card>
    </Box>;
};

export default ProductListPageView;