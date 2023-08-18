import { prisma } from "@/utils.server";
import * as Boom from "@hapi/boom";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

async function validate(username: string, password: string) {
  const user= await prisma.user.findUnique({
    where: {
      name: username
    }
  })

  if (!user) throw Boom.unauthorized('user not found')

  if (bcrypt.compareSync(password, user.password)) {
    return user
  } else {
    throw Boom.unauthorized('username or password not correct')
  }
}

export async function POST(req: Request) {
  console.log('api post...')
  const body: AccountInfo = await req.json()
  try {
    const user = await validate(body.username, body.password)
    return NextResponse.json({ message: 'success', code: 200, data: user })
  } catch (err: any) {
    return NextResponse.json({ message: err.output.payload.message, code: 500, data: null })
  }
}
