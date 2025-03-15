import * as z from "zod"

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Product schema
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  category: z.string(),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Order schema
export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive("Quantity must be positive"),
    price: z.number().positive("Price must be positive"),
  })),
  total: z.number().positive("Total must be positive"),
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Review schema
export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Cart schema
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive("Quantity must be positive"),
})

export const cartSchema = z.object({
  userId: z.string(),
  items: z.array(cartItemSchema),
  updatedAt: z.date(),
})

// Form input schemas
export const productFormSchema = productSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export const orderFormSchema = orderSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export const reviewFormSchema = reviewSchema.omit({ 
  id: true, 
  userId: true, 
  createdAt: true, 
  updatedAt: true 
}) 