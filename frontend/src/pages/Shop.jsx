import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/apis/productApiSlice";
import { useFetchCategoryQuery } from "../redux/apis/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, product, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoryQuery();
  const [priceFilter, setPriceFilter] = useState("")

  const filteredProductQuery = useGetFilteredProductsQuery({checked, radio})

  return <div></div>;
};

export default Shop;
