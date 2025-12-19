"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 10)));
  }, []);

  return (
    <div className="page">
      <h1>Employees</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/employees/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
