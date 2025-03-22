import { Injectable } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService, private pagination:PaginationService){}
}
