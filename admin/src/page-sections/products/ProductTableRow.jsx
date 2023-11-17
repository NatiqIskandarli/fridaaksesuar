import { useState } from "react";
import { Avatar, Box, Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, Edit, RemoveRedEye } from "@mui/icons-material";
import { format } from "date-fns"; // CUSTOM COMPONENTS

import { FlexBox } from "components/flexbox";
import { Paragraph } from "components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "components/table"; // CUSTOM DEFINED HOOK

import useNavigate from "hooks/useNavigate"; // ==============================================================

// ==============================================================
const ProductTableRow = ({
  product,
  isSelected,
  handleSelectRow,
  handleDeleteProduct
}) => {
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  const handleOpenMenu = event => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  return <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox size="small" color="primary" checked={isSelected} onClick={event => handleSelectRow(event, product.productId)} />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2} >
          <Avatar variant="rounded" alt={product.productName} src={product.imageURL} sx={{
          width: 50,
          height: 50
        }} />

          <Box>
            <Paragraph fontWeight={500} color="text.primary" sx={{
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer"
            }
          }} 
          onClick={() => {
            navigate(`/dashboard/products/product-edit/${product.productId}`);
          }}>
              {product.productName}
            </Paragraph>
            <Paragraph fontSize={13}>{product.subCategoryId}</Paragraph>
          </Box>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{format(new Date(product.createdAt), "dd MMM yyyy")}</TableCell>

      <TableCell padding="normal" sx={{ ...(product.stockQuantity === 0 && {
        color: "error.main"
      })
    }}>
        {product.stockQuantity}
      </TableCell>

      <TableCell padding="normal">{product.price} azn</TableCell>

      <TableCell padding="normal">
        {product.aktivlik ? <Chip label="Published" /> : <Chip label="Draft" color="secondary" />}
      </TableCell>

      <TableCell padding="normal" align="right">
        <TableMoreMenu open={openMenuEl} handleOpen={handleOpenMenu} handleClose={handleCloseOpenMenu}>        
          <TableMoreMenuItem Icon={Edit} title="Edit" handleClick={() => {
          handleCloseOpenMenu();
          navigate(`/dashboard/products/product-edit/${product.productId}`);
        }} />
          <TableMoreMenuItem Icon={DeleteOutline} title="Delete" handleClick={() => {
          handleCloseOpenMenu();
          handleDeleteProduct(product.productId);
        }} />
        </TableMoreMenu>
      </TableCell>
    </TableRow>;
};

export default ProductTableRow;