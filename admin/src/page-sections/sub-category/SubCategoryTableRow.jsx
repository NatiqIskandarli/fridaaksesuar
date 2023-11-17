import { useState } from "react";
import { Avatar, Box, Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, Edit, RemoveRedEye } from "@mui/icons-material";
import { format } from "date-fns"; // CUSTOM COMPONENTS

import { FlexBox } from "components/flexbox";
import { Paragraph } from "components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "components/table"; // CUSTOM DEFINED HOOK

import useNavigate from "hooks/useNavigate"; // ==============================================================

// ==============================================================
const CategoryTableRow = ({
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
        <Checkbox size="small" color="primary" checked={isSelected} onClick={event => handleSelectRow(event, product.id)} />
      </TableCell>

      <TableCell padding="normal" onClick={() => {
          navigate(`/dashboard/sub-category/sub-category-edit/${product.id}`);
          }}>
        <FlexBox alignItems="center" gap={2}>
          <Box>
            <Paragraph fontWeight={500} color="text.primary" sx={{
              ":hover": {
                textDecoration: "underline",
                cursor: "pointer"
              }
              
            }}>
              {product.title}
            </Paragraph>
          </Box>
        </FlexBox>
      </TableCell>


      <TableCell padding="normal" align="right">
        <TableMoreMenu open={openMenuEl} handleOpen={handleOpenMenu} handleClose={handleCloseOpenMenu}>         
          <TableMoreMenuItem Icon={Edit} title="Edit" handleClick={() => {
          handleCloseOpenMenu();
          navigate(`/dashboard/sub-category/sub-category-edit/${product.id}`);
          }} />
          <TableMoreMenuItem Icon={DeleteOutline} title="Delete" handleClick={() => {
          handleCloseOpenMenu();
          handleDeleteProduct(product.id);
          }} />
        </TableMoreMenu>
      </TableCell>
    </TableRow>;
};

export default CategoryTableRow;