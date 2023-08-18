import { NextResponse } from "next/server";
import * as Boom from "@hapi/boom";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { prisma } from "@/utils.server";

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

export async function POST(req: Request, res: NextResponse) {
  const body: AccountInfo = await req.json()
  try {
    const user = await validate(body.username, body.password)
    // jwt
    const token = jwt.sign(
      { username: user.username, },
      // @ts-expect-error
      process.env.JWT_SECRET,
      { expiresIn: '3 days' }
    )
    // set cookie named token
    res.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 3
    }))
    // return NextResponse.json({ message: 'success', code: 200, data: user })
    // const result = await res.json()
    // console.log({ result });
    return res.body
  } catch (err: any) {
    // throw new Error(err.output.payload.message)
    return NextResponse.json({ message: err.output.payload.message, code: 500, data: null })
  }
}
