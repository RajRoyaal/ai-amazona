"use client"

import { Product, Category } from "@prisma/client"
import { ProductCard } from "@/components/product/product-card"

interface RelatedProductsProps {
  products: (Product & {
    category: Category
  })[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 