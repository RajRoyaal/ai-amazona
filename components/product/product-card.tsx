"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { Product, Category } from "@prisma/client"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product & {
    category: Category
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const image = product.images[0] || "/placeholder.png"

  return (
    <Card className="group overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
          <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">
              {product.ratings.toFixed(1)} ({product.numReviews} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="secondary">{product.category.name}</Badge>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={product.stock === 0}
          onClick={() => addItem({ 
            id: product.id,
            name: product.name,
            price: product.price,
            image: image,
            quantity: 1 
          })}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
} 