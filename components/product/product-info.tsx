"use client"

import { useState } from "react"
import { Product, Category } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface ProductInfoProps {
  product: Product & {
    category: Category
    reviews: {
      rating: number
      user: {
        name: string | null
        image: string | null
      }
    }[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock")
      return
    }

    if (quantity > product.stock) {
      toast.error("Not enough stock available")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      quantity,
    })

    toast.success("Added to cart")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary">{product.category.name}</Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">
              {averageRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

      <div className="space-y-4">
        <p className="text-muted-foreground">{product.description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {product.stock} in stock
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Product Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">SKU:</span> {product.sku || "N/A"}
          </div>
          <div>
            <span className="font-medium">Category:</span>{" "}
            {product.category.name}
          </div>
          <div>
            <span className="font-medium">Stock:</span> {product.stock}
          </div>
          <div>
            <span className="font-medium">Rating:</span>{" "}
            {averageRating.toFixed(1)} / 5
          </div>
        </div>
      </div>
    </div>
  )
} 