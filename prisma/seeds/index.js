const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const seed = async () => {
  await prisma.notification.deleteMany()
  await prisma.servePlan.deleteMany()
  await prisma.mealItem.deleteMany()
  await prisma.food.deleteMany()
  await prisma.meal.deleteMany()
  await prisma.dietPlan.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.record.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.subscriptionPlan.deleteMany()

  const salt = process.env.SALT

  // create admin user
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      isAdmin: true,
      name: "Tarek",
      password: await bcrypt.hash("@Nutritionist0" + salt, 12),
    }
  })

  // create food items
  await prisma.food.createMany({
    data: [
      {
        label: "Banana",
        unit: "Piece",
        amount: 1,
        serveType: "fruit",
      },
      {
        label: "Lettuce",
        unit: "gram",
        amount: 10,
        serveType: "vegetable",
      },
      {
        label: "Lean Meat",
        unit: "gram",
        amount: 15,
        serveType: "leanMeat",
      },
      {
        label: "Sugar",
        unit: "spoon",
        amount: 15,
        serveType: "sugar",
      },
    ]
  })

  // create subscription plans
  await prisma.subscriptionPlan.createMany(
    {
      data: {
        label: "1 Week",
        price: 0,
        per: "Week",
        description: "1 Week Free Trial"

      }

    },
    {
      data: {
        label: "1 Month",
        price: 25,
        per: "month",
        description: "Billed $25 monthly"

      }
    },
    {
      data: {
        label: "6 Month",
        price: 120,
        per: "6 Month",
        description: "Billed $60 querterly"
      }
    },

    {
      data: {

        label: "12 Month",
        price: 220,
        per: "12 Month",
        description: "Billed $120 semisterly"

      }
    })


}


seed()