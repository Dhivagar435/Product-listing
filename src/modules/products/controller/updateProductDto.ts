
export class UpdateProductDto {
    private readonly id: number;
    private readonly name: string;
    private readonly description: string;
    private readonly price: number;
    private readonly discountPrice?: number;
    private readonly discountPercentage?: number;
    private readonly isActive: boolean;
    private readonly images: string[];
    private readonly categoryId: number;
    private readonly brandId: number;
    private readonly updatedBy: string;


    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        isActive: boolean,
        images: string[],
        categoryId: number,
        brandId: number,
        updatedBy: string,
        discountPrice?: number,
        discountPercentage?: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.discountPercentage = discountPercentage;
        this.isActive = isActive;
        this.images = images;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.updatedBy = updatedBy;

    }


    getId(): number {
        return this.id
    }

    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }



    getPrice(): number {
        return this.price;
    }

    getDiscountPrice(): number | undefined {
        return this.discountPrice;
    }

    getDiscountPercentage(): number | undefined {
        return this.discountPercentage;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    getImages(): string[] {
        return this.images;
    }
    getCategoryId(): number {
        return this.categoryId;
    }

    getBrandId(): number {
        return this.brandId;
    }


    getUpdatedBy(): string {
        return this.updatedBy;
    }



}
