"use client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/components/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
    cpf: z.string().trim().min(1, {
        message: "O CPF é obrigatório."
    }).refine((value) => isValidCpf(value), {
        message: "CPF inválido.",
    }),
});

type FormShema = z.infer<typeof formSchema>;

const CpfForm = () => {
    const form = useForm<FormShema>({
        resolver: zodResolver(formSchema)
    })

    const router = useRouter()
    const pathname = usePathname()
    const onSubmit = (data: FormShema) => {
        router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`)
    }

    const handleCancel = () =>{
        router.back();
    }
    return ( 
        <Drawer open>
            <DrawerTrigger asChild>

            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Visualizar pedidos</DrawerTitle>
                <DrawerDescription>Isira seu CPF abaixo para visualizar seus pedidos</DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="px-4">
                                <FormLabel>Seu CPF</FormLabel>
                                <FormControl>
                                    <PatternFormat placeholder="Digite seu cpf" format="###.###.###-##" customInput={Input} {...field}/>
                                </FormControl>
                                
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <DrawerFooter>
                                <Button type="submit" variant="destructive" className="w-full rounded-full">
                                    Finalizar
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
                </DrawerContent>
        </Drawer>
    );
}
 
export default CpfForm;