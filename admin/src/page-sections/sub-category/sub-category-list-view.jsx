"use client";

import { useEffect, useState } from "react";
import { Tab, Box, Tabs, Card, Table, styled, Button, TableBody, TableContainer, TablePagination } from "@mui/material";
import Add from "icons/Add"; // CUSTOM DEFINED HOOK

import useNavigate from "hooks/useNavigate"; // CUSTOM COMPONENTS

import { Scrollbar } from "components/scrollbar";
import { FlexBetween } from "components/flexbox";
import { TableDataNotFound, TableToolbar } from "components/table"; // CUSTOM DEFINED HOOK

import useMuiTable, { getComparator, stableSort } from "hooks/useMuiTable"; // CUSTOM PAGE SECTION COMPONENTS

import CategoryTableRow from "./SubCategoryTableRow";
import CategoryTableHead from "./SubCategoryTableHead";
import CategoryTableActions from "./SubCategoryTableActions"; // CUSTOM DUMMY DATA

import { deleteOneSubCategory, getListSubCategory,deleteMultipleSubCategory } from "http/subCategory";

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

const SubCategoryListPageView = () => {
  const navigate = useNavigate();
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({search:""});

  const handleChangeFilter = (key, value) => {
    setCategoryFilter(state => ({ ...state,
      [key]: value
    }));
  };

  useEffect(()=>{
    const fetchListCat = async () =>{
      const getListCat = await getListSubCategory()
      setCategoryNames(getListCat)
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
  let filteredCategoryNames = stableSort(categoryNames, getComparator(order, orderBy)).filter(item => {
    if (categoryFilter.search) return item.title.toLowerCase().includes(categoryFilter.search.toLowerCase());else return true;
  });

  const handleDeleteProduct = async (id) => {
    try {
      setCategoryNames(state => state.filter(item => item.id !== id));
      await deleteOneSubCategory(id)  
    } catch (error) {
      console.log(error)
    }      
  };

  const handleAllProductDelete = async () => {
    try {
      await deleteMultipleSubCategory(selected)
      setCategoryNames(state => state.filter(item => !selected.includes(item.id)));
      handleSelectAllRows([])();
    } catch (error) {
      console.log(error)
    }
    
    
  };

  return <Box pt={2} pb={4}>
      <ListWrapper>    
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/dashboard/sub-category/create-sub-category")}>
          Alt Kateqoriya əlavə et
        </Button>
      </ListWrapper>

      <Card sx={{mt: 4 }}>
        <CategoryTableActions filter={categoryFilter} handleChangeFilter={handleChangeFilter} />

        {selected.length > 0 && <TableToolbar selected={selected.length} handleDeleteRows={handleAllProductDelete} />}

        <TableContainer>
          <Scrollbar>
            <Table sx={{minWidth: 820}}>
              <CategoryTableHead 
                order={order} orderBy={orderBy} 
                numSelected={selected.length} 
                rowCount={filteredCategoryNames.length} 
                onRequestSort={handleRequestSort} 
                onSelectAllRows={handleSelectAllRows(filteredCategoryNames.map(row => row.id))} 
              />

              <TableBody>
                {filteredCategoryNames.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => 
                <CategoryTableRow 
                    key={product.id} 
                    product={product} 
                    handleSelectRow={handleSelectRow} 
                    isSelected={isSelected(product.id)} 
                    handleDeleteProduct={handleDeleteProduct} />
                )}

                {filteredCategoryNames.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {
        /* PAGINATION SECTION */
      }
        <TablePagination page={page} component="div" rowsPerPage={rowsPerPage} count={filteredCategoryNames.length} onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Card>
    </Box>;
};

export default SubCategoryListPageView;