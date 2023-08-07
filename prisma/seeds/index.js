const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seed = async () => {
  await prisma.user.createMany({})
  await prisma.profile.deleteMany({})
  await prisma.subscriptionPlan.deleteMany({})



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