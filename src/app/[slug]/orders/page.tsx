import { db } from "@/lib/prisma";
import { isValidCpf, removeCpfPunctuation } from "../menu/components/helpers/cpf";
import CpfForm from "./component/cpf-form";
import OrderList from "./component/order-list";

interface OrdersPageProps {
    searchParams: Promise<{cpf: string}>;
}

const OrdersPage = async ({searchParams}: OrdersPageProps) => {
    const { cpf } = await searchParams;

    if(!cpf){
        return <CpfForm/>;
    }

    if(!isValidCpf(cpf)){
        return <CpfForm/>;
    }

    const orders = await db.order.findMany({
        orderBy:{
            createdAt: 'desc',
        },
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        },
        include:{
            restaurant:{
                select:{
                    name: true,
                    avatarImageUrl: true,
                }
            },
            OrderProducts:{
                include:{
                    product:true
                }
            }
        }
    })
    return ( <OrderList order={orders} /> );
}
 
export default OrdersPage;