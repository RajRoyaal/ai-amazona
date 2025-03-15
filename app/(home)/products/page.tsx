import { Suspense } from "react"
import { ProductGrid } from "@/components/home/client-components"
import { ProductFilters } from "@/components/product/product-filters"
import { ProductSort } from "@/components/product/product-sort"
import { Pagination } from "@/components/ui/pagination"
import { prisma } from "@/lib/prisma"
import { Skeleton } from "@/components/ui/skeleton"
import { Prisma } from "@prisma/client"

interface ProductsPageProps {
  searchParams: {
    category?: string
    sort?: string
    search?: string
    page?: string
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category, sort, search, page = "1" } = searchParams
  const currentPage = parseInt(page)
  const itemsPerPage = 12

  // Build the where clause for filtering
  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(category && { categoryId: category }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
    }),
  }

  // Build the orderBy clause for sorting
  const orderBy: Prisma.ProductOrderByWithRelationInput = sort === "price-asc"
    ? { price: Prisma.SortOrder.asc }
    : sort === "price-desc"
    ? { price: Prisma.SortOrder.desc }
    : { createdAt: Prisma.SortOrder.desc }

  // Get total count for pagination
  const totalProducts = await prisma.product.count({ where })

  // Get products with pagination
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    include: {
      category: true,
    },
  })

  // Get categories for filter
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductSort />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters categories={categories} />
        </aside>

        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ProductGrid products={products} />
          </Suspense>

          {totalProducts > itemsPerPage && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalProducts / itemsPerPage)}
                baseUrl="/products"
                searchParams={searchParams}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 