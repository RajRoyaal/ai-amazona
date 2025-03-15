"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { Product, Category } from "@prisma/client"

interface ProductCardProps {
  product: Product & {
    category: Category
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const image = product.images[0] || "/placeholder.png"

  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {product.category && (
            <Badge
              variant="secondary"
              className="absolute left-2 top-2"
            >
              {product.category.name}
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        </Link>
        <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          {product.stock > 0 ? (
            <p className="text-sm text-green-600">In Stock</p>
          ) : (
            <p className="text-sm text-red-600">Out of Stock</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addItem({ 
            id: product.id,
            name: product.name,
            price: product.price,
            image: image,
            quantity: 1 
          })}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
} 