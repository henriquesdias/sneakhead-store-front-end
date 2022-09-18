import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StoreContext } from '../../Contexts/storeContext.js';
import UserContext from '../../Contexts/userContext';

import CartItem from './CartItem.js'

export default function CartMenu({ showcart, setShowcart }) {

    const { products, shopcart } = useContext(StoreContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    
    const list = products.filter((product) =>
        shopcart.map((item)=>item.id).includes(product._id)
    ).map((product) => {
        return (
            {
                ...product,
                size: shopcart.find(item =>item.id === product._id).size
            }
        );
    });
    
    console.log(user);
    console.log(list);

    if(showcart) {
        return (
            <CartMenuLayer>
                <div onClick={()=>setShowcart(false)}>
                </div>
                <menu>
                    <button onClick={()=>setShowcart(false)}>X</button>
                    <h1>{user ? user?.name : 'Faça Log-In para finalizar a compra'}</h1>
                    <h2>Você possui {shopcart.length} itens no carrinho</h2>
                    
                    {list.map(product => <CartItem

                    />)}

                    { user ?
                        <button onClick={()=>console.log('inserir navigate para pagina de compra')}>Finalizar Compra</button>
                    :
                        <button onClick={()=>navigate('/sign-in')}>Fazer Log-In</button>
                    }
                </menu>
            </CartMenuLayer>
        );
    } else {
        return (
            <>
            </>
        );
    }
}

const CartMenuLayer = styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 3;
    display: flex;
    div{
        width: Calc(100vw - 320px);
        height: 100vh;
        background-color: rgba(74, 78, 105, 0.5);
    }
    menu {
        width: 320px;
        height: 100vh;
        background-color: #F2E9E4;
    }
`;