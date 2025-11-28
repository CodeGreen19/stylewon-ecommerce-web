// utils/seedProducts.ts
import { AddProductSchemaType } from "@/features/admin/catalog/products/schemas";
import { faker } from "@faker-js/faker";

const images = [
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1763718577/ihkxuqhrymysinn4fkjo.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1763723379/tz1lspb3up8laamw1qkk.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1763727749/lbhoa9xuvhpzxrqv84yz.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1763717943/paz6cr39b0q4dnpihh7n.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1763718811/hyggukyfqeysguawykxj.png",
] as const;
export function generateFakeProducts(count: number): AddProductSchemaType[] {
  const products: AddProductSchemaType[] = [];

  for (let i = 0; i < count; i++) {
    // random sizes
    const sizes = ["Small", "Medium", "Large", "XS", "S", "M", "L", "XL"];
    const productSizes = faker.helpers.arrayElements(sizes).map((s) => ({
      label: s,
      value: s.toLowerCase(),
    }));

    // random colors
    const colors = ["Red", "Blue", "Black", "Green", "White"];
    const productColors = faker.helpers.arrayElements(colors).map((c) => ({
      label: c,
      value: c.toLowerCase(),
      hexColor: faker.color.rgb(), // optional
    }));

    const price = Math.round(faker.number.float({ min: 11, max: 999 }));
    const costOfGoods = Math.round(
      faker.number.float({ min: 5, max: price - 1 })
    );
    const profit = price - costOfGoods;
    const margin = Math.round((profit / price) * 100);

    const product: AddProductSchemaType = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),

      price: price.toString(),
      costOfGoods: costOfGoods.toString(),
      profit: profit.toString(),
      margin: margin.toString(),

      images: faker.helpers.shuffle(images),

      sizes: productSizes,
      colors: productColors,

      stocks: Math.round(faker.number.int({ min: 1, max: 10000 })).toString(),
      shippingWeight: Math.round(
        faker.number.float({ min: 0.1, max: 10 })
      ).toString(),
    };

    products.push(product);
  }

  return products;
}
