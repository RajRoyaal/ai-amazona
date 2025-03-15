import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create categories
  const tshirts = await prisma.category.upsert({
    where: { name: 'T-shirts' },
    update: {},
    create: {
      name: 'T-shirts',
      description: 'Comfortable and stylish t-shirts for all occasions',
      image: '/images/c-tshirts.jpg',
    },
  })

  const jeans = await prisma.category.upsert({
    where: { name: 'Jeans' },
    update: {},
    create: {
      name: 'Jeans',
      description: 'High-quality denim jeans for men and women',
      image: '/images/c-jeans.jpg',
    },
  })

  const shoes = await prisma.category.upsert({
    where: { name: 'Shoes' },
    update: {},
    create: {
      name: 'Shoes',
      description: 'Trendy and comfortable footwear for every style',
      image: '/images/c-shoes.jpg',
    },
  })

  // Create products
  // T-shirts
  await prisma.product.upsert({
    where: { sku: 'TSH001' },
    update: {},
    create: {
      name: 'Classic White T-Shirt',
      description: 'Essential white t-shirt made from premium cotton',
      price: 29.99,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
      categoryId: tshirts.id,
      stock: 100,
      sku: 'TSH001',
    },
  })

  await prisma.product.upsert({
    where: { sku: 'TSH002' },
    update: {},
    create: {
      name: 'Graphic Print T-Shirt',
      description: 'Stylish graphic t-shirt with modern design',
      price: 34.99,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
      categoryId: tshirts.id,
      stock: 75,
      sku: 'TSH002',
    },
  })

  // Jeans
  await prisma.product.upsert({
    where: { sku: 'JNS001' },
    update: {},
    create: {
      name: 'Classic Blue Jeans',
      description: 'Timeless blue jeans with perfect fit',
      price: 79.99,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
      categoryId: jeans.id,
      stock: 50,
      sku: 'JNS001',
    },
  })

  await prisma.product.upsert({
    where: { sku: 'JNS002' },
    update: {},
    create: {
      name: 'Slim Fit Black Jeans',
      description: 'Modern slim fit jeans in sleek black',
      price: 89.99,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
      categoryId: jeans.id,
      stock: 60,
      sku: 'JNS002',
    },
  })

  // Shoes
  await prisma.product.upsert({
    where: { sku: 'SHO001' },
    update: {},
    create: {
      name: 'Classic Sneakers',
      description: 'Comfortable everyday sneakers',
      price: 99.99,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
      categoryId: shoes.id,
      stock: 40,
      sku: 'SHO001',
    },
  })

  await prisma.product.upsert({
    where: { sku: 'SHO002' },
    update: {},
    create: {
      name: 'Running Shoes',
      description: 'High-performance running shoes with great comfort',
      price: 129.99,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
      categoryId: shoes.id,
      stock: 30,
      sku: 'SHO002',
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 