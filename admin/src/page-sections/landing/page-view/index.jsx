"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container"; // CUSTOM PAGE SECTIONS COMPONENTS

import Footer from "../Footer";
import Section1 from "../Section1";
import Section2 from "../Section2";
import Section3 from "../Section3";
import Section4 from "../Section4";
import HeaderDark from "../HeaderDark"; 
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import useNavigate from "hooks/useNavigate";

const LandingPageView = () => {
  const navigate = useNavigate()
  return navigate('/dashboard')
};

export default LandingPageView;