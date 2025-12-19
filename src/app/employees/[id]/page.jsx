"use client";
import "../../pages.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // Dinamička slika s picsum.photos prema id-u
  const imageUrl = `https://picsum.photos/id/${id}/600/400`;

  return (
    <div className="page">
      <h1 className="employeeName">{product.name}</h1>
      <img src={imageUrl} alt={product.name} width={600} height={400} />
    </div>
  );
}
