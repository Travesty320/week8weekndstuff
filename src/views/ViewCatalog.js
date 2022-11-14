
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore'

function ViewCatalog() {
    const [products, setProducts] = useState([]);
    // window.addEventListener('load', () => {
    //     Fetchdata();
    // });

    // const Fetchdata = () => {
    //     db.collection("data").get().then((querySnapshot) => {
    //         querySnapshot.forEach(element => {
    //             var data = element.data();
    //             setProducts(arr => [...arr, data]);

    //         });
    //     })
    // }
    const productsCollectionRef = collection(db, "products")
    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            console.log(data)
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }
            )));
        };
        getProducts();
    }, []);


    return (

        <div>
            {
                products.map((product) => {
                    return (
                        <div className="card" style={{ width: '18rem' }}>
                            <div key="{product.id}">
                                <img src={product.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Title: {product.title}</h5>
                                    <p className="card-text">Description: {product.description}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Category: {product.category}</li>
                                    <li className="list-group-item">Price: ${product.price.toFixed(2)}</li>
                                    <li className="list-group-item">Rating: {product.rating.toFixed(1)}</li>
                                </ul>
                                <div className="card-body">
                                    <a href="" className="card-link">Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }</div>
    )
}
export default ViewCatalog;

//we will need to display the 20 items available with an add to cart button which adds which
//ever item to the cart, we need to just keep it simple and not worry too much about choosing a specific qty,
//just make the button add 1 to the cart,