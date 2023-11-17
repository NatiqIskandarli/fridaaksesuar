import { styled, TextField, MenuItem, IconButton } from "@mui/material"; // CUSTOM DEFINED HOOK

import useNavigate from "hooks/useNavigate"; // CUSTOM COMPONENTS

import { FlexBox } from "components/flexbox"; // CUSTOM ICON COMPONENTS

import FormatBullets from "icons/FormatBullets";
import Apps from "icons/Apps"; //  STYLED COMPONENTS

const Wrapper = styled(FlexBox)(({
  theme
}) => ({
  alignItems: "center",
  ".select": {
    flex: "1 1 200px"
  },
  [theme.breakpoints.down(440)]: {
    ".navigation": {
      display: "none"
    }
  }
})); // ==============================================================

// ==============================================================
const CategoryTableActions = ({
  handleChangeFilter,
  filter
}) => {

  return <Wrapper gap={2} px={2} py={4}>  
        <TextField fullWidth 
          label="Search by product name..." 
          value={filter.search} 
          onChange={e => handleChangeFilter("search", e.target.value)} />
      </Wrapper>;
};

export default CategoryTableActions;