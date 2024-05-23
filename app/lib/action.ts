'use server'
import { date, z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Invoice = { //now its obvious that we want to do type validation so that usse yeh hoga kay jo types humna define ki hongi yaha par wohi database mabi jaka store hongi toh waha be hum easily schema bna sktay hain bcuz we know kay yaha sa jo jo types jayengi wohi hum pa define krdeinga. But for doing this we can do manually as well but the best way is to use type validation library named as ZOD.

    id: string; // Will be created on the database
    customer_id: string;
    amount: number; // Stored in cents
    status: 'pending' | 'paid';
    date: string;
};

// In your actions.ts file, import Zod and define a schema that matches the shape of your form object. This schema will validate the formData before saving it to a database.

const FormSchema = z.object({
    id: z.string(),
    customer_id: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })
export async function createInvoice(form: FormData) { //yeh jo "FormData" hai yeh predefined type hai jo humay automatically jo form ka sumit honay pa data hota hai wo FormData ka through get krsktay hain.

    //now by using "form" parameter whose type is FormData we will extract form data.right we will use ".get(name of field that you have in form)" method for getting data  
    const rawData = {
        customer_id: form.get("customerId"),
        amount: form.get("amount"),
        status: form.get("status"),
    }
    console.log(rawData); //this i have console to check whether we are getting data or not.

    console.log(typeof rawData.amount);

    // You'll notice that amount is of type string and not number. This is because input elements with type="number" actually return a string, not a number!

    // To handle type validation, you have a few options. While you can manually validate types, using a type validation library can save you time and effort. For your example, we'll use Zod, a TypeScript-first validation library that can simplify this task for you.

    // In your actions.ts file, import Zod and define a schema that matches the shape of your form object. This schema will validate the formData before saving it to a database.

    // const rawData:Invoice={ //not follow this approach.
    //     customer_id:form.get("customerId"),
    //     amount:form.get("amount"),
    //     status:form.get("status"),
    // }

    //i will pass the rawData object to CreateInvoice, so Now it will validate the tyes before sending data to database.

    const obj = CreateInvoice.parse({
        customer_id: form.get("customerId"),
        amount: form.get("amount"),
        status: form.get("status"),
    })

    //now finally this "obj" object is the final object from which we can extract data and the type of each field is same as we have defined in our FormSchema, bcuz when we parse the all fields that we want to CreateInvoice so it will validate them for us.
    const amountInCents = obj.amount * 100 //now as we want to store out amount in Cents in database therefore we do this.

    //formatting Date in YYYY-MM-DD format
    const date = new Date().toISOString().split('T')[0] //yaha basiacally jab string ko split kia "T" say toh wo array ma convert hogyi string or phr '[0]' iska mtlb kay uss array ma jo first element hai usko accesss krdo.

    //for inserting data into Database i write a SQL query and pass the values.
    await sql`
 INSERT INTO invoices (customer_id, amount, status, date)
 VALUES (${obj.customer_id}, ${amountInCents}, ${obj.status}, ${date})
`;
    //isme jo "date" variable hna wo humna jo uper date bnai hai wo hai, but ques yeh haka humna toh schema mabi date variable define kia tha phr usko obj.date pa error kiu aa raha hai ya wo access kiu nhi hua wo asl may yeh haka humna uper "id" and "date" ko omit krdia hai uska mtlb yeh haka id and date database ma toh hongay but yaha CreateInvoice "obj" ki type ko validate krta hua unko account nhi krega.


    //now we want that kay jab be "createInvoice" ka server aaction perform ho toh jo "invoices" wala page hai wo automatically revalidate hojaye i mean waha new data show ho,so for that:

    revalidatePath("/dashboard/invoices")
    redirect('/dashboard/invoices') //this func will automatically redirect the user to given route which we passed as argument.
}
const UpdateInvoice = FormSchema.omit({ id: true, date: true })
export async function UpdateInvoiceAction(id: string, form: FormData) {

    const { customer_id, amount, status } = UpdateInvoice.parse({
        customer_id: form.get("customerId"),
        amount: form.get("amount"),
        status: form.get("status"),
    })

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0]

    await sql`
    UPDATE invoices
    SET customer_id = ${customer_id}, amount = ${amountInCents}, status = ${status}, date = ${date}
    WHERE id = ${id}`

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function DeleteInvoiceAction(id:string){

    await sql `
         DELETE FROM invoices WHERE id = ${id}

    `
   revalidatePath('/dashboard/invoices')

}