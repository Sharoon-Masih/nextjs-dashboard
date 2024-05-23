
# NextJS learner project

The main goal of this project is to understand the working of NextJs, not to write whole application code.

## Chapter 1

### folder structure




![App Screenshot](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Flearn-folder-structure.png&w=3840&q=75)

 * /app: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.

* /app/lib: Contains functions used in your application, such as reusable utility functions and data fetching functions.

* /app/ui: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.

* /public: Contains all the static assets for your application, such as images.

* /scripts: Contains a seeding script that you'll use to populate your database in a later chapter.

Config Files: You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.

#### Note: npm i this command will install the project's packages.


## Chapter2 (CSS styling)

### How to add a global CSS file to your application.

You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the root layout (more on this later).

Add global styles to your application by navigating to /app/layout.tsx and importing the global.css file, because of this approach we dont need to import global css file in every component because every page is rendering inside layout.tsx so when we import global.css direct into layout so it will on every component/page .

### CSS module
 it is another way for styling but right now we are not using it we are going to use global css.

### clsx
clsx (or classnames) is a utility library commonly used in React applications to conditionally apply CSS class names to elements.

Instead of directly manipulating styles in JavaScript, clsx allows you to conditionally apply CSS classes based on dynamic conditions.

It provides a convenient way to manage conditional class names without cluttering JSX code with complex ternary expressions or conditional logic.

clsx takes care of joining class names together while handling conditional and boolean values elegantly.

This approach promotes cleaner and more maintainable code by separating concerns: CSS for styling and JavaScript/JSX for logic and behavior.

clsx (or classnames) doesn't handle the actual styling; it's focused on managing class names efficiently.

### summary:
Next.js supports different ways of styling your application, including:

Global CSS: Simple to use and familiar for those experienced with traditional CSS, but can lead to larger CSS bundles and difficulty managing styles as the application grows.

CSS Modules: Create locally scoped CSS classes to avoid naming conflicts and improve maintainability.

Tailwind CSS: A utility-first CSS framework that allows for rapid custom designs by composing utility classes.

Sass: A popular CSS preprocessor that extends CSS with features like variables, nested rules, and mixins.

CSS-in-JS: Embed CSS directly in your JavaScript components, enabling dynamic and scoped styling.

## Chapter3 (Optimizing Fonts and Images)
### How to add custom fonts with next/font.
#### Why optimize Font ?
Next.js automatically optimizes fonts in the application when you use the next/font module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.
#### layout shift
![App Screenshot](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffont-layout-shift.png&w=3840&q=75)

Basically, it happens like when user initially come at page so if font, images are not optimized then browser load that font, images and at that time the layout is different which means that the font size or image size is different but the moment at which the font and images loaded so layout shift (in simple word layout shake),like its happening in above pic.

imagine you're reading a webpage and suddenly the text you're looking at moves around unexpectedly. That's what we call a layout shift.

Now, sometimes when a webpage loads, it might show the text in one basic font first, and then quickly switch to a fancier font once it's fully loaded. This font switch can cause the text to move, which can be annoying for users because it messes with the layout of the page.

Google uses a metric(unit for measurement) called Cumulative Layout Shift (CLS) to measure how much this kind of shifting happens on a webpage. It helps them understand how stable and user-friendly a site is. The lower the CLS score, the better, because it means less annoying shifting for users!

for more: [understanding Cumulative layout shift](https://web.dev/articles/cls)

### Adding a primary font (its mean adding a font directly in layout.tsx so that will apply on whole application)
1-import Roboto (it can be any fonName) from "next/font/google"

2-call the fontName, because in actual it works like a function for e.g: 

import Roboto from "next/font/google"

const myFont1= Roboto({ subsets:latin , weight:300 , ... })

#### subsets:
A font subset is like a mini version of a font. It includes only the characters that a website needs to display its text correctly. Instead of loading the entire font with all its characters.

3-then simply access className property from myFont1 in className prop of element like this className={myFont1.className}

### Adding a secondary font (its mean adding a font in specific components, but the steps will remain same)

Note: before adding any font see its documentation, it will help you to define that which arguments you have to pass to function of that specific font.

### How to add images with next/image.
Why optimize images?

Next.js can serve static assets, like images, under the top-level /public folder. Files inside /public can be referenced in your application.

#### The <Image> component

The <Image> Component is an extension of the HTML <img> tag, and comes with automatic image optimization, such as:

Preventing layout shift automatically when images are loading.
Resizing images to avoid shipping large images to devices with a smaller viewport.

Lazy loading images by default (images load as they enter the viewport).

Serving images in modern formats, like WebP and AVIF, when the browser supports it.



## Chapter4 (layouts and pages)
### Routes
* Nextjs uses file-system based routing.

* you can create a folder in root directory i.e app in App router,for e.g: app/dashboard.

* the folder created in app directory is known as route, but it should have a file named as page.tsx.

### Nested Routes 
simply, routes inside route is known as nested routes.see the below image:
![App Screenshot](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=3840&q=75)
Next.js uses file-system routing where folders are used to create nested routes. Each folder represents a route segment that maps to a URL segment.

#### page.tsx:
page.tsx is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: /app/page.tsx - this is the home page associated with the route /.

### seprate UI
you can create seprate UI for each route:

* create a route inside app directory 
* then, create layout.tsx and page.tsx inside that route which you have created.

### Colocation 
simply its means that we have the option to colocate(organizing related files or components together within the same directory or folder.) our own files like: styles,button,etc inside the folder in App directory.

Because all the folders inside the app directory are not be counted as route ,it will be counted as route if it is returning page.tsx or route.tsx. like this:


![App Screenshot](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)

### Creating the dashboard layout
#### simply create the layout.tsx in your dashboard route, and then populate your layout.tsx with the code. example code :

import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) 
{
  return (
    
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

* The <Layout /> component receives a children prop. This child can either be a page or another layout. In your case, the pages inside /dashboard will automatically be nested inside a <Layout />

* Now this layout will apply on all the routes created inside dashboard route.

* One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering:

![App Screenshot](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&w=3840&q=75)

### Root layout

* mostly the layout inside your app directory is known as root layout and it is neccessary.

* the component rendered inside root layout will be apply across all pages in your application.

* You can use the root layout to modify your <html> and <body> tags, and add metadata (you'll learn more about metadata in a later chapter).


## Chapter 5 (navigating between pages)
* <Link/> component is used to navigate between pages, it is in the replacement of anchor tag.
* it is used in the replacement of anchor tag because it does not reload whole page like anchor tag, its only load the specific page.
* it prefetches the data at build time and then, when user click the link it makes navigation within millisec to that URL without reloading whole page.  

#### Automatic code-splitting and prefetches:
To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA, where the browser loads all your application code on initial load.

Splitting code by routes means that pages become isolated(far away). If a certain page throws an error, the rest of the application will still work.

#### Pattern: Show active links:
#### usePathname hook:

* usePathname is a Client Component hook that lets you read the current URL's pathname.
* a Client Component with usePathname will be rendered into HTML on the initial page load. When navigating to a new route, this component does not need to be re-fetched. Instead, the component is downloaded once (in the client JavaScript bundle), and re-renders based on the current state.This means that at the moment when we navigate from one route segment to other, So first URL will be changed then usePathname will return you the pathName.



## Chapter 7 (fetching data)
### First we are going to see how to fetch data using API,ORM,SQL etc...

### API layer:
* In Simple words API is the bridge between your application code and Database.

#### Senerios where we need to use API for fetching Data:
* If you want to fetch data from any 3rd party service like Google, zoom etc that provide an API to interact with their Databases, So in that situation you can fetch data using API.
* If you are fetching data on the client/browser, you should use API that runs on the server and provide you with the data on client, So that your personal Database secrets/key remain hide. 

### Database Queries
* When you're creating a full-stack application, you'll also need to write logic to interact with your database. For relational databases like Postgres, you can do this with SQL, or an ORM like Prisma.
There are a few cases where you have to write database queries:
* When creating your API endpoints you need to write logic to interact with your database. or defining methods in API docs like get,post,patch so we have to write logic for these methods as well,like here we are not handling delete method so we will not define logic for delete method but we have to define logic for other method we have mentioned above.

* If you are using React Server Component, you can directly fetch data from Database without using API and your Database secrets will also be secured because Data will be fetched on Server not on client.

### Using Server Component:
By default, Next.js applications use React Server Components.
remember some keypoints before working with server component:
* Dont use any hook like useEffect, useState etc or any data fetching library while working with server component.
* Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
* As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.

### Using SQL:
There are a few reasons why we'll be using SQL:

* SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).
* Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.
* SQL is versatile, allowing you to fetch and manipulate specific data.
* The Vercel [ Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections) provides protection against SQL injections.
This function allows you to query your database:

import { sql } from '@vercel/postgres';


note: You can call sql inside any Server Component.

Q-What does SQL allow you to do in terms of fetching data? hint: answer is hidden inside the above points.

### However... there are two things you need to be aware of:

1-The data requests are unintentionally blocking each other, creating a request waterfall.

2-By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.

Let's discuss number 1 in this chapter, then look into detail at number 2 in the next chapter.

### What are request waterfall ?
* A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.
![request](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fsequential-parallel-data-fetching.png&w=3840&q=75)
* In above picture we can see that we need to wait for fetchRevenue() to execute before fetchLatestInvoices() can start running, and so on.
* we can also say that each request will execute in a sequenced way. Like: according to above pic first fetchRevenue will execute, then fetchLatestInvoices and so on.
This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request. For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might then proceed to fetch their list of friends. In this case, each request is contingent(depending on the first one happening,mtlb ka har request jo usse pehli wali request ka response hai uspa depend kregi) on the data returned from the previous request.

### Parallel data fetching
* A common way to avoid request waterfalls is using the approach of parallel data fetching.
* In parallel data fetching all requests run at the same time parallely, you can see this in above picture as well.

In JavaScript, you can use the [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)  functions to initiate all promises at the same time. 

By using this pattern, you can:

* Start executing all data fetches at the same time, which can lead to performance gains.

* Use a native JavaScript pattern that can be applied to any library or framework.

However, there is one disadvantage of relying only on this JavaScript pattern that is parallel data fetching: what happens if one data request is slower than all the others? we will discuss it in next chapter.







## Chapter 8 (Static and Dynamic rendering)
### As we discussed in previous chapter that we have to be aware of two things:
1-request waterfall, which we have discussed in previous chapter.

2-By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.

### Static rendering
* With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or during revalidation. The result can then be distributed and cached in a Content Delivery Network (CDN).
Whenever a user visits your application, the cached result is served.benefits of static rendering:
* Faster Websites - Prerendered content can be cached and globally distributed. This ensures that users around the world can access your website's content more quickly and reliably.
* Reduced Server Load - Because the content is cached, your server does not have to dynamically generate content for each user request.
* SEO - Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.
Static rendering is useful for UI with no data or data that is shared across users, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data that is regularly updated.

#### what is CDN ?
Imagine you own a bakery with delicious cookies. People from all over town come to buy them, but if someone lives far away, it takes a long time to get their cookies.

A CDN, or Content Delivery Network, is like having delivery stores for your cookies in different parts of town.  Here's how it works for websites:

* A website stores its content, like images and videos, on a main server.
* The CDN has many servers spread around the world, closer to users.
* When someone visits the website, the CDN delivers the content from the server nearest them.
* This makes the website load faster because the data doesn't have to travel as far.



### What is Dynamic Rendering?
With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page). benefits of dynamic rendering:

* Real-Time Data - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
* User-Specific Content - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
* Request Time Information - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

#### what does mean by Request Time Information ?
Imagine you run a clothing store website.  Regular (static) rendering would be like having a pre-printed catalog for everyone. It's fast, but everyone sees the same clothes, regardless of their preferences.

Dynamic rendering with request time information is more like having a super-powered salesperson in your online store. Here's how it works:

* **Cookies:** When a customer visits your site, the salesperson (the website) can check their "shopping bag cookie" to see what they looked at before.  Based on that, they can recommend similar outfits or show them items they were interested in.
* **Search Parameters:** If a customer types "summer dresses" in the search bar, the salesperson can instantly show them all the summer dresses available, just like pulling them from the back based on the customer's request.

Dynamic rendering uses things like cookies and search parameters, which are unique to each visit, to tailor the content for every visitor. It's like having a website that reacts and adjusts based on what each person is looking for.

You can use a Next.js API called **unstable_noStore** inside your Server Components or data fetching functions to disable static rendering.basically, it does not store data in cache at build time so when there is no data in cache static rendering will not take place. 

* In your file, import **unstable_noStore** from next/cache, and call it the top of your data fetching functions.

### Simulating a Slow Data Fetch
* dynamic rendering is a good first step. However... there is still one problem we mentioned in the previous chapter. What happens if one data request is slower than all the others?

Let's see a slow data fetch,e.g: In your data file, uncomment the console.log and setTimeout inside fetchRevenue():

export async function fetchRevenue(){
  
  try {
    
    // We artificially delay a response for demo purposes.

    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000)); //this will block request for 3 sec
 
    const data = await sql<Revenue>`SELECT * FROM revenue`;
 
    console.log('Data fetch completed after 3 seconds.');
 
    return data.rows;
  } catch (error) {
    
    console.error('Database Error:', error);

    throw new Error('Failed to fetch revenue data.');
  }
}

* Now open http://localhost:3000/dashboard/ in a new tab and notice how the page takes longer to load. In your terminal, you should also see the following messages:

Fetching revenue data...

Data fetch completed after 3 seconds.


* Actually in above, we've added an artificial 3-second delay to simulate a slow data fetch. The result is that now your whole page is blocked while the data is being fetched.

Which brings us to a common challenge developers have to solve:

* With dynamic rendering, your application is only as fast as your slowest data fetch.

#### basically, in dynamic rendering it happens that let suppose we have send 3 request two requests fullfil successfully within millisec but one request is taking much time so the rest two will also wait until the first one processes.

### another example
Imagine you're making a delicious pizza. Dynamic rendering with data fetching is like ordering all the ingredients at once. It's great because you get everything you need, but...

* **Slowest delivery holds everything back:** If the peppers take forever to arrive, you can't start making the pizza until they get there, even if all the other ingredients are ready.
* **Fast website, slow data = slow experience:** Dynamic websites are built to be fast, but if it takes a long time to fetch a piece of data (like user info or product details), the entire website will wait for that data before showing anything.

So, dynamic rendering with data fetching is awesome, but just like with pizza night, the slowest piece can slow everything down. 


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