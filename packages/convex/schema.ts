import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
   users: defineTable({
    email: v.optional(v.string()),
    userId: v.optional(v.string()),
    customerId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    orgId: v.optional(v.string()),
    freeTier: v.optional(v.boolean()),
    freeTierEndsOn: v.optional(v.number()),
    subscriptionId: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_subscriptionId", ["subscriptionId"])
    .index("by_Org", ["orgId"]),
});