import React , {useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { fetchProducts } from "../features/products/ProductSlice";
import { useDispatch, useSelector } from 'react-redux';


export default function HomeScreen() {
 
  const {isLoading, products, error} = useSelector((state) => state.products);
    console.log(isLoading);
    console.log(products);
    console.log(error);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>
        ))}
        ;
      </Row>
    </div>
  );
}
