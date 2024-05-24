import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrder = () => {
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="row">Place Order</div>
        </div>
    );
};

export default PlaceOrder;