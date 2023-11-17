"use client";

import { useEffect, useState } from "react";
import { Tab, Box, Tabs, Card, Table, styled, Button, TableBody, TableContainer, TablePagination } from "@mui/material";
import Add from "icons/Add"; // CUSTOM DEFINED HOOK

import useNavigate from "hooks/useNavigate"; // CUSTOM COMPONENTS

import { Scrollbar } from "components/scrollbar";
import { FlexBetween } from "components/flexbox";
import { TableDataNotFound, TableToolbar } from "components/table"; // CUSTOM DEFINED HOOK

import useMuiTable, { getComparator, stableSort } from "hooks/useMuiTable"; // CUSTOM PAGE SECTION COMPONENTS

import CategoryTableRow from "./CategoryTableRow";
import CategoryTableHead from "./CategoryTableHead";
import CategoryTableActions from "./CategoryTableActions"; // CUSTOM DUMMY DATA

import { CATEGORIES } from "__fakeData__/categories"; //  STYLED COMPONENTS
import { deleteOneCategory, getListCategory,deleteMultipleCategory } from "http/category";

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

const CategoryListPageView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState({search:""});

  const handleChangeFilter = (key, value) => {
    setProductFilter(state => ({ ...state,
      [key]: value
    }));
  };

  useEffect(()=>{
    const fetchListCat = async () =>{
      const getListCat = await getListCategory()
      setProducts(getListCat)
    }
    fetchListCat()
    
  },[])

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
    defaultOrderBy: "title"
  });
  let filteredProducts = stableSort(products, getComparator(order, orderBy)).filter(item => {
    if (productFilter.search) return item.title.toLowerCase().includes(productFilter.search.toLowerCase());else return true;
  });

  const handleDeleteProduct = async (id) => {
    try {
      setProducts(state => state.filter(item => item.id !== id));
      await deleteOneCategory(id)  
    } catch (error) {
      console.log(error)
    }
      
  };

  const handleAllProductDelete = async () => {
    try {
      await deleteMultipleCategory(selected)
      setProducts(state => state.filter(item => !selected.includes(item.id)));
      handleSelectAllRows([])();
    } catch (error) {
      console.log(error)
    }
    
    
  };

  return <Box pt={2} pb={4}>
      <ListWrapper>    
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/dashboard/category/create-category")}>
          Kateqoriya əlavə et
        </Button>
      </ListWrapper>

      <Card sx={{mt: 4 }}>
        <CategoryTableActions filter={productFilter} handleChangeFilter={handleChangeFilter} />

        {selected.length > 0 && <TableToolbar selected={selected.length} handleDeleteRows={handleAllProductDelete} />}

        <TableContainer>
          <Scrollbar>
            <Table sx={{minWidth: 820}}>
              <CategoryTableHead 
                order={order} orderBy={orderBy} 
                numSelected={selected.length} 
                rowCount={filteredProducts.length} 
                onRequestSort={handleRequestSort} 
                onSelectAllRows={handleSelectAllRows(filteredProducts.map(row => row.id))} 
              />

              <TableBody>
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => 
                <CategoryTableRow 
                    key={product.id} 
                    product={product} 
                    handleSelectRow={handleSelectRow} 
                    isSelected={isSelected(product.id)} 
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
        <TablePagination page={page} component="div" rowsPerPage={rowsPerPage} count={filteredProducts.length} onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Card>
    </Box>;
};

export default CategoryListPageView;