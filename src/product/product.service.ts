import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { };

  findAll(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productRepository.find({
      skip,
      take: limit,
    });
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create({...createProductDto});
      return this.productRepository.save(newProduct);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new product')
    }
  }

  findOne(id: number): Promise<Product> {
    const product = this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not exists`)
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not exists`)
    }
    const updateProduct = {...product,...updateProductDto};
    return this.productRepository.save(updateProduct);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
  }
}
