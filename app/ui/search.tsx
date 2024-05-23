'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {useDebouncedCallback} from "use-debounce"
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const PathName = usePathname(); //remember we can call hooks only inside the main function component agar hum uskay andar nested fuction ma call krenga toh error ayega like agr isko direct handleSearch ma call krenga toh error ayega.
  const Route = useRouter()

    const handleSearch=useDebouncedCallback((query: string) => { //useDebouncedCallback i use this hook for "debouncing" which is an best technique for optimization must go and check mid part of chapter 11 there you will concept of "debouncing" 
      
      console.log(`Searching... ${query}`);
    const params = new URLSearchParams(searchParams) //basic yeh jo "new URLSearchParams()" instance hna yeh use hota hai query ko handle krnay kay liya yani agr ma chahta hun kay jo meri query hai wo URL mabi be show ho toh uska liya obviously muja useRouter hook ka use krna hoga jo ater on hum krenga be but before that jo humara query ka structure wobi toh "queryParamter=value" iss tarah sa hona chaiya but agr dekha jaye toh jo onChange() pa output milta hai wo srf "queryValue" hoti hai "queryParamter" nhi milta toh iss lia hum URLSearchParams ka use krka apni query ko ".set" ka method ka through queryParameter ka sth set krleta hain like below you can see.

    //acha its not compulsory ka const params=new URLSearchParams(searchParams) iss trah "searchParams" pass krein agr const params=new URLSearchParams() agr iss trah be krenga toh proper working hogi.

     params.set('page',"1") //basically iska taluq pagination say hai so when you look at pagination which last part of this chapter 11 so then you will understand it.
    if (query) {
      params.set('query', query)
    }
    else {
      params.delete('query')

    }
    Route.replace(`${PathName}?${params.toString()}`) //now here simply by using .replace() method of useRouter jo URL tha usko update krdia, basically yeh iss tarah work kr rha hai kay jo existing pathName hai wo wasa hi rahega bs uskay agay "?queryParameter=queryValue" add hoja gi URL may.when we do like this: params.toString() , so output will be like this: queryParameter=queryValue 
  },300)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value) }}
        defaultValue={searchParams.get('query')?.toString()} //wasa jab hum state variable ka use krtay hain toh "value" attribute ma pass krtay hain taka state controlled rahay but abhi kiu kay hum state variable use nahi kr rhay toh iss liya by defaultValue dedi. 
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
