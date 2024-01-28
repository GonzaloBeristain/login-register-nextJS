import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prisma.js";

export async function POST(request) {
    try {
        const data = await request.json();

        const userFound = await prisma.user.findUnique({
            where:  { email: data.email },
        });
    
        if (userFound) {
            return NextResponse.json({
                message: "Email already exists"
            }, {
                status: 400
            })
        };
    
        const usernameFound = await prisma.user.findUnique({
            where:  { username: data.username },
        });
    
        if (usernameFound) {
            return NextResponse.json({
                message: "Username already exists"
            }, {
                status: 400
            })
        };
    
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await prisma.user.create({
            data: {
                username:  data.username,
                email:      data.email,
                password:    hash,
            }
        });
    
        const {password: _, ... user} = newUser;
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
};