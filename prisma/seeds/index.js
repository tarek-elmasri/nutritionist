const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const seed = async () => {
  // await prisma.notification.deleteMany()
  // await prisma.servePlan.deleteMany()
  // await prisma.mealItem.deleteMany()
  // await prisma.food.deleteMany()
  // await prisma.meal.deleteMany()
  // await prisma.dietPlan.deleteMany()
  // await prisma.account.deleteMany()
  // await prisma.verificationToken.deleteMany()
  // await prisma.record.deleteMany()
  // await prisma.profile.deleteMany()
  // await prisma.user.deleteMany()
  // await prisma.subscriptionPlan.deleteMany()

  const salt = process.env.SALT

  // create admin user
  const adminUser = await prisma.user.findFirst({ where: { isAdmin: true } })

  if (!adminUser) {
    await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        name: process.env.ADMIN_USERNAME,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD + salt, 12),
        isAdmin: true,
      }
    })
  }

  // create food items
  // await prisma.food.createMany({
  //   data: [
  //     {
  //       label: "Banana",
  //       unit: "Piece",
  //       amount: 1,
  //       serveType: "fruit",
  //     },
  //     {
  //       label: "Lettuce",
  //       unit: "gram",
  //       amount: 10,
  //       serveType: "vegetable",
  //     },
  //     {
  //       label: "Lean Meat",
  //       unit: "gram",
  //       amount: 15,
  //       serveType: "leanMeat",
  //     },
  //     {
  //       label: "Sugar",
  //       unit: "spoon",
  //       amount: 15,
  //       serveType: "sugar",
  //     },
  //   ]
  // })

  // create subscription plans
  const subscriptionPlans = await prisma.subscriptionPlan.findMany()
  if (subscriptionPlans.length === 0) {

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


}


seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })