import { CarouselWrapper, ProductGrid } from "@/components/home/client-components"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const latestProducts = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  })

  const banners = [
    {
      id: 1,
      title: "Welcome to AI Amazona",
      description: "Discover amazing products at great prices",
      image: "/banners/banner-1.jpg",
      link: "/products",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products",
      image: "/banners/banner-2.jpg",
      link: "/products?sort=newest",
    },
    {
      id: 3,
      title: "Special Offers",
      description: "Get up to 50% off on selected items",
      image: "/banners/banner-3.jpg",
      link: "/products?sort=discount",
    },
  ]

  return (
    <div className="container py-8">
      <section className="mb-12">
        <CarouselWrapper items={banners} />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Latest Products</h2>
        <ProductGrid products={latestProducts} />
      </section>
    </div>
  )
} 