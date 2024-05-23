//for understanding why we have created this route group and put this main page.tsx inside it check the readme file which we have created of this project, check Adding loading skeleton in chp 9.

// import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from "@/app/ui/dashboard/cards"
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchRevenue } from "@/app/lib/data" ;
import { fetchLatestInvoices,fetchCardData } from "@/app/lib/data";
import { myFont } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton,CardsSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const cardData=await fetchCardData();
  const {totalPaidInvoices,totalPendingInvoices,numberOfInvoices,numberOfCustomers}=cardData;
  return (
    <main>
      <h1 className={`${myFont.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton/>}> {/*to understand this that why i comment Card component and use wrapper component check streaming chapter,or basically yeh iss lia kia hai bcuz agr hum chahtay hna kay bajye sab card ek ek krka load hon ek hi bar sab stream hoka UI pa display hojaye toh issi lia humna ek wrapper bna dia or isme jo saray card hum uper bari bari bna rahay thy na wo ek hi dafa sab isme wrap krdiya or iss poray component ko Suspense ma wrap krdia ab hoga yeh kay jab saray Card component CardWrapper ma load hojagay toh phr yeh CardWrapper ek hi dafa UI pa show hojaga.  */}
          <CardWrapper/>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton/>}> {/*now its mean that kay jab tak "RevenueChart" ma data fetch nhi hojata tab tk fallback component render hoga, or iska yeh be faida hai like agr ab RevenueChart ma data fetch daar sa be hoga na toh wo pura page ko block nhi krega iss liya ab isme sa prop be remove krdeinga ab direct RevenueChart component ma data fetch krenga.*/}
        <RevenueChart /*revenue={revenue}*/  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
        <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}