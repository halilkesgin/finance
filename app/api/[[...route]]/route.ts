import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"

const app = new Hono().basePath("/api")

app.get(
  "/hello",
  clerkMiddleware(), 
  (ctx) => {
    const auth = getAuth(ctx)

    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." })
    }

    return ctx.json({
      message: "Hello next js"
    })
})

export const GET = handle(app)
export const POST = handle(app)