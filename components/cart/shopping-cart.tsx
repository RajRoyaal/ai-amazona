import { ShoppingCart as CartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export function ShoppingCart() {
  const { items, totalPrice } = useCart()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            {items.map((item) => (
              <DropdownMenuItem key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between p-4">
              <p className="text-sm font-medium">Total</p>
              <p className="text-sm font-medium">{formatPrice(totalPrice)}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/checkout" className="w-full text-center">
                Checkout
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 