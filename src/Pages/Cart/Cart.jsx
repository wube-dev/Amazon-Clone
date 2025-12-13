import React, { useContext } from 'react'
import Layout from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Products/ProductCard'
import "./Cart.module.css";
function Cart()
{
  const [{basket,user},dispatch]=useContext(DataContext)
  return (
    <Layout>
      <section>
        <div>
          <h2>hello</h2>
          <h3>your shopping basket</h3>
          <hr />
          {
            basket?.lenth == 0?(<p>Opps! no item in your cart </p>):(
          basket?.map((item,i)=>{
            return (
              <ProductCard
                key={i}
                product={item}
                renderAdd={false}
                renderDesc={true}
                flex={true}
              />
            );
          })
          
          )}
            
          
        </div>
        <div></div>
      </section>
    </Layout>
  )
}

export default Cart
