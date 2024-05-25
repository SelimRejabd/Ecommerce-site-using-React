import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { saveOrder } from '../features/slice/OrderSlice';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, items, totalPrice } = cart;
  const itemTotalPrice = totalPrice.toFixed(2);
  const taxPrice = (0.01 * itemTotalPrice).toFixed(2);
  const shippingPrice = itemTotalPrice > 100 ? 20 : 10;
  const price = (Number(shippingPrice) + Number(taxPrice) + Number(itemTotalPrice)).toFixed(2);

  const order = useSelector((state) => state.order.order);

  const placeOrderHandler = () => {
    const orderData = {
      orderItems: items,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemTotalPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: price,
    };
    console.log(orderData); 
    dispatch(saveOrder(orderData));
      // .unwrap()
      // .then(() => {
      //   navigate(`/order/${order._id}`);
      // })
      // .catch((error) => {
      //   console.error('Order placement failed:', error);
      // });
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {items.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={6}>
                          {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemTotalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={items.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;