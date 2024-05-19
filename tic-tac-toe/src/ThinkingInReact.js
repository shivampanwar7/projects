import { useState } from "react";

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
export default function ThinkingInReact() {
    
return(
    <>
        <h1>How to think in React</h1>
        <FilterableProductTable products = {products} />
    </>
)

}


function ProductTable({isStocket,searchedProduct,products}) {
    const rows = [];
    let lastCategory = null;
    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                searchedProduct.toLowerCase()
            ) === -1
          ) {
            return;
          }
          if (isStocket && !product.stocked) {
            return;
          }
        if(product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key = {product.category}
                />
            )
        }
        rows.push(
            <ProductRow 
                product={product}
                key={product.name}
            />
        )
        lastCategory = product.category;
    })

    return(
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    )
}

function ProductRow({product}) {
    const name = product.stocked ? product.name : 
        <span style={{color: 'red'}}>
            {product.name}
        </span>
    return(
    <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>)
}
 

function ProductCategoryRow({category}) {
    return(
        <tr>
        <th colSpan="2">{category}</th>
        </tr>
    )
}


function SearchBar({searchedProduct, isStocket,setSearchedProduct,setStocked}){
    return(
        <form>
            <input type="text" placeholder="Search....." value={searchedProduct} onChange={(e)=>setSearchedProduct(e.target.value)} />
            <label>
                <input type="checkbox" value={isStocket} checked={isStocket} onChange={(e)=>setStocked(e.target.value)} />
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

function FilterableProductTable() {
    const [isStocket,setStocked] = useState(false);
    const [searchedProduct,setSearchedProduct] = useState("");
    function handleSetStocked(e) {
        setStocked(e);
    }
    function handleSetSearchedProduct(e){
        setSearchedProduct(e);
    }
    return(
        <div>
            <SearchBar searchedProduct={searchedProduct} isStocket={isStocket} setStocked={handleSetStocked} setSearchedProduct={handleSetSearchedProduct}/>
            <ProductTable searchedProduct={searchedProduct} isStocket={isStocket} products={products} />
        </div>
    )
}

