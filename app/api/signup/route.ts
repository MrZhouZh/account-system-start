import { prisma } from '@/utils.server'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { username, password }: AccountInfo = await req.json()
    const created = await prisma.user.create({
      data: {
        name: username,
        password: bcrypt.hashSync(password, 10)
      }
    })
    console.log({ created })

    // apiHandler().post(
    //   async(req, res) => {
    //     console.log('run post');
        
    //     const body = req.body as {
    //       username: string
    //       password: string
    //     }
    //     const created = await prisma.user.create({
    //       data: {
    //         name: body.username,
    //         password: bcrypt.hashSync(body.password, 10)
    //       }
    //     })
    //   }
    // )
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    return NextResponse.json({ message: 'Failed' })
  }
}
// (async (req, res) => {
//     console.log({req, res})
//     const body = req.body as {
//       username: string
//       password: string
//     }

//     const created = await prisma.user.create({
//       data: {
//         name: body.username,
//         password: bcrypt.hashSync(body.password, 10)
//       }
//     })

//     res.status(200).json({
//       message: 'success'
//     })
//   }
// )
