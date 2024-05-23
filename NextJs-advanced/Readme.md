
# Chapter 9 (Streaming)

In the previous chapter, you made your dashboard page dynamic, however, we discussed how the slow data fetches can impact the performance of your application. Let's look at how you can improve the user experience when there are slow data requests.

## What is streaming?
Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
![streaming](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming.png&w=3840&q=75)

 streaming in Next.js using an easy example:

**Imagine you're ordering a delicious pizza.**

- In traditional web rendering (without streaming), it's like waiting for the entire pizza to be baked before getting any slices. This can feel slow, especially if the pizza has a lot of toppings.
- Streaming in Next.js is like getting slices as they come out of the oven. The base and sauce might be delivered first, followed by the cheese and toppings one by one. You can start enjoying the pizza sooner, even while other parts are still being prepared.

**How does this translate to Next.js?**

- A web page can be made up of many components, just like a pizza has different parts.
- Normally, Next.js would wait for all the components to be rendered on the server before sending the entire page to your browser.
- With streaming, Next.js can send the basic HTML structure (like the pizza base) right away. Then, as individual components (like the toppings) are ready, it can send those chunks of HTML separately.

### Imagine you're on YouTube, eager to watch a cat video.
Absolutely! Let's break down how streaming in Next.js works using a YouTube example:

**Imagine you're on YouTube, eager to watch a cat video.**

- **Traditional Rendering:**
    - You click on the video thumbnail.
    - YouTube waits for the entire video (including ads, comments, and recommendations) to be fetched and processed before sending anything to your browser.
    - You see a blank screen for a while, feeling impatient.
    - Finally, the entire video page loads at once.

- **Streaming with Next.js:**
    - You click on the video thumbnail.
    - YouTube immediately sends the basic HTML structure of the video page (like the player controls and title).
    - While that's happening, YouTube starts fetching the video itself.
    - As soon as the video starts buffering, it's streamed to your browser.
    - You can see the video thumbnail change to a blurry preview and potentially a loading indicator.
    - As more video data is available, the preview gets clearer, and you might be able to start playback sooner (depending on your internet speed).
    - In the background, YouTube fetches comments, recommendations, and other page elements.
    - These elements are streamed to your browser as they become available.

### Technically:

Next.js uses React's Suspense to load content asynchronously. The server sends the initial layout with placeholders, then streams HTML for each component as data becomes available. This creates a smoother user experience.

* By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.
![request](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75)
**Streaming works well with React's component model, as each component can be considered a chunk.**

There are two ways you implement streaming in Next.js:
* At the page level, with the loading.tsx file.
* For specific components, with <Suspense>.
### Streaming a whole page with loading.tsx
In the /app folder, create a new file called loading.tsx:

export default function Loading() 

{
  
  return <div>Loading...</div>;

}

**By doing this, When our page takes time to load, Next.js can quickly show a loading.tsx file. This trick, called streaming with loading.tsx, makes the user's experience better.**
![loading](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Floading-page.png&w=1920&q=75)

few things happening here:
* loading.tsx is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.
* Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
* The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

### Adding loading skeletons
Adding a loading skeleton to your Next.js app with streaming is like putting a "Coming Soon" sign on your content while it's being prepared. Here's a breakdown:

**Imagine a restaurant with a fancy open kitchen.**

- You order a dish.
- While the chefs cook, you see a metal frame shaped like the dish (the loading skeleton) on your table.
- This frame gives you an idea of the size and shape of the dish, even though the actual food isn't there yet.

**How does this translate to Next.js?**

- With streaming, your page layout loads first.
- But while the actual content (like images or text) is being fetched, you can use a loading skeleton to show a placeholder.
- This placeholder could be a rectangular block for an image, lines for text, or circles for profile pictures.

**Benefits:**

- Users see something happening, even if the content isn't ready.
- It reduces the feeling of a blank page and makes the wait feel shorter.
- It gives users a sense of the page's layout and what content to expect.

**Simple Implementation:**

- You can use CSS properties like `background-color` and `animation` to create basic loading skeletons.
- Libraries like `react-loading-skeleton` can provide pre-built components for more complex layouts.

**Remember:**

- Loading skeletons are most effective when used with streaming to give users a sense of progress as content loads.
- Once the actual content arrives, the loading skeleton is replaced seamlessly.

#### Now this Loading skeleton will automatically apply on all routes inside the **dashboard** route because it is created on higher level than other routes inside the **dashboard** route, let's suppose:
* **/dashboard/invoices** as you can see that **invoices** route is created inside the **dashboard** route, So **loading.tsx** will apply on **invoices** route as well.

#### To fix this bug:
* we can change this to **route group**.
* create a new folder called **/(overview)** in **dashboard** route.
* Now add the **page.tsx** and **loading.tsx** inside the **(overview)** route group.
![error](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Froute-group.png&w=3840&q=75)
* Now this will remove the error, beacause we moved the higher level **page.tsx** and **loading.tsx** inside **(overview)** route group and **route group** says that any layout.tsx,loading.tsx etc.. inside me will only applied to those **routes/pages** inside me, now as we have added the top level **page.tsx** and **loading.tsx** inside the **(overview)** route group so now they become independent of **invoices** route and as we know that route group will not affect the URL path, So path will remain i.e: **/dashboard** it will not become like this: **/dashboard/(overview)/page.tsx**.
* It is important to take **page.tsx** inside **(overview)**, Beacause as the route group says that it will only apply the layout.tsx or loading.tsx on those **routes/pages** which are inside route group, that's why if we don't put **page.tsx** inside route group so **loading.tsx** will not apply on anything. 
Must check this: https://nextjs.org/docs/app/building-your-application/routing/route-groups

### Streaming a component
* So far, you're streaming a whole page. But, instead, you can be more granular(specific) and stream specific components using React Suspense.

* Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component (fallback component means loading.tsx) to show while the dynamic component loads.

#### example:

import <Suspense> from React, and wrap it around <RevenueChart />. You can pass it a fallback component called <RevenueChartSkeleton>.

* import RevenueChart from '@/app/ui/dashboard/revenue-chart';

* import { Suspense } from 'react';

* import { RevenueChartSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
 
  return (
   
    <main>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
      </div>
    </main>
  );
}
![RevenueChartSkeleton](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Floading-revenue-chart.png&w=1920&q=75)
Now only the **RevenueChart** component is streamed by wrapping it inside **Suspense** component.

### Deciding where to place your Suspense boundaries
Where you place your Suspense boundaries will depend on a few things:

How you want the user to experience the page as it streams.
What content you want to prioritize.
If the components rely on data fetching.
Take a look at your dashboard page, is there anything you would've done differently?

Don't worry. There isn't a 100% right answer.

You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.
Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

Don't be afraid to experiment with Suspense and see what works best, it's a powerful API that can help you create more delightful user experiences.

# Chapter 10 (Partial Prerendering (Optional))
## Combining Static and Dynamic Content
Currently, if you call a dynamic function inside your route (e.g. noStore(), cookies(), etc), your entire route becomes dynamic.

This is how most web apps are built today. You either choose between static and dynamic rendering for your entire application or for a specific route.

However, most routes are not fully static or dynamic. You may have a route that has both static and dynamic content. For example, consider an ecommerce site. You might be able to prerender the majority of the product page, but you may want to fetch the user's cart and recommended products dynamically on-demand.

## What is Partial Prerendering?
Next.js 14 contains a preview of Partial Prerendering – an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route. For example:
![Static and dynamic](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fthinking-in-ppr.png&w=3840&q=75)

When a user visits a route:

* A static route shell is served, ensuring a fast initial load.
* The shell leaves holes where dynamic content will load in asynchronous.
* The async holes are streamed in parallel, reducing the overall load time of the page.
* This is different from how your application behaves today, where entire routes are either entirely static or dynamic.

### How does Partial Prerendering work?




