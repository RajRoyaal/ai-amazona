"use client"

import { Carousel } from "@/components/ui/carousel"
import { ProductCard } from "@/components/product/product-card"
import { Product, Category } from "@prisma/client"

interface CarouselItem {
  id: number
  title: string
  description: string
  image: string
  link: string
}

interface ProductWithCategory extends Product {
  category: Category
}

export function CarouselWrapper({ items }: { items: CarouselItem[] }) {
  return <Carousel items={items} />
}

export function ProductGrid({ products }: { products: ProductWithCategory[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 