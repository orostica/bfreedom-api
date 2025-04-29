import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(dto: CreateUserDto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (exists) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                phone: dto.phone,
            },
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
    }
    
    async updateUser(id: number, dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new ConflictException('User not found');
        }

        return this.prisma.user.update({
            where: { id: id },
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
            },
        });
    }
}

