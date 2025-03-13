"use server";

import { db } from "@/lib/prisma";
import { ConsumptiomMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../components/helpers/cpf";


interface CreateOrderInput {
    customerNamae: string;
    customerCpf: string;
    products: Array<{
        id: string;
        price: number;
        quantity: number;
    }>;
    consumptionMethod: ConsumptiomMethod;
    slug: string;
}

export const creatOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where:{
            slug: input.slug,
        }
    })

    if(!restaurant){
        throw new Error("Restaurant not found");
    }
    const productWithPrices = await db.product.findMany({
        where:{
            id:{
                in: input.products.map((product) => product.id)
            },
        },
    });

    const productsWithPriceandQuantities = input.products.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        price: productWithPrices.find((p) => p.id === product.id)!.price
    }));


    await db.order.create({
        data:{
            status: 'PENDING',
            customerName: input.customerNamae,
            customerCpf: removeCpfPunctuation(input.customerCpf),
            OrderProducts:{
                createMany:{
                    data: productsWithPriceandQuantities,
                },
            },
            total: productsWithPriceandQuantities.reduce((acc, product) => acc + product.price * product.quantity, 0),
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id,
        },
    });
};