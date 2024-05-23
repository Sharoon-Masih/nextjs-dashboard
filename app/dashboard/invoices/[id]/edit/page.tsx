import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
 
export default async function Page({params}:{params:{id:string}}) {
 const {id}=params

 const [invoice,customers]=await Promise.all([fetchInvoiceById(id),fetchCustomers()]) //acha ab yaha pa humna yeh kia kay Promise.all ka method ka through invoices and customer ko fetch kia ab yeh jo promise.all ka method hota hna yeh ek array accept krta hai jisma hum sab promise pass krdetay hai or phr yeh basically sb promises jo array ma hotay hain unko parallely resolve krta hai mtlb ka asa nhi hota kay jo array ma pehla element hai wohi pehla solve hoga baki kay uska bd honga, yeh iss tarah sa work krta hai kay jitni be request hoti hai hain sab ko ek sth parallely solve krta hai or jab sab request solve hojati hai toh ek sth ek new Promise return krta hai jismay un sab request ka jo be promise resolve honay ka bd result hotay hain wo array ki form ma return hotay hain.

 //but iska fallback yeh hai kay agr let suppose 3 request hain likin agr unme say koi ek request be zeada time lagi ya agr reject hojayegi toh uska affect baki 2 request pa b hoga, mtlb ka agr ek zeada time legi toh tab tk dusri be uska intzar krengi or agr ek request reject hogyi toh jo final response jayega promise ka wo be rejected hi jayega.So its mean kay array ma jitni be request hongi agr sab hi resolve hongi toh final resolved array return hoga.and that is called parallel handling of request.

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}