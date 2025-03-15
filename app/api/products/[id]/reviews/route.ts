import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { rating, comment } = body

    if (!rating || !comment) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        productId: params.id,
        userId: session.user.id,
      },
    })

    // Update product ratings
    const reviews = await prisma.review.findMany({
      where: {
        productId: params.id,
      },
    })

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        ratings: averageRating,
        numReviews: reviews.length,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("[REVIEWS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 