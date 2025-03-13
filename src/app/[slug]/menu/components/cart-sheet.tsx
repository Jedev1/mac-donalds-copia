import { Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { CartContext } from "../contexts/cart";
import { useContext, useState } from "react";
import CartProductItem from "../componetes/cart-product-item";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/app/helpers/format-number";
import FinishOrderDialog from "./finish-order-button";
import { Button } from "@/components/ui/button";

const CartSheet = () => {
    const [finishOrderDialogIsOpen, setFinishOrderDialogisOpen] = useState(false)
    const {isOpen, toggleCart, products, total} = useContext(CartContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full py-5">
                    <div className="flex-auto">
                        {products.map(product => (
                            <CartProductItem key={product.id} product={product}/>
                        ))}
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-sm font-semibold">{formatNumber(total)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogisOpen(true)}>Finalizar pedido</Button>
                    <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogisOpen}/>
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;