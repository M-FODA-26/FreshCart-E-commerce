"use client";
import { AddWishList } from "@/Wislist.api/AddWishList.api";
import { RemoveWishList } from "@/Wislist.api/RemoveWishList.api";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export default function AddHeart({ id ,isWishList}: { id: string ,isWishList:boolean}) {
    const [wishlist,setWishlist]=useState(isWishList)
    const router=useRouter()

    useEffect(() => {
      setWishlist(isWishList)
    }, [isWishList])

  async function ToggleWishList(id: string) {
const session = await getSession()
if (!session) {
    router.push('/login')
    return
}

if (wishlist) {
    try {
        setWishlist(false)
        const response=await RemoveWishList(id)
        console.log('remove',response)
        if (response.status=='success') {
router.refresh()
             toast.warning(response.message, {
          position: "bottom-left",
          autoClose: 1500,
          closeOnClick: true,
        });
        }
    } catch (error) {
         toast.error("Failed to Remove from wishlist", {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
      });
    }
    
}else{
 try {
        setWishlist(true)

      const response = await AddWishList(id);
      console.log('addd',response);
      if (response.status == "success") {
        router.refresh()
        toast.success(response.message, {
          position: "bottom-left",
          autoClose: 1500,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.error("Failed to add to wishlist", {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
      });
    }
}



   
  }

  return (
    <>
      <div
        onClick={() => ToggleWishList(id)}
        className="ms-auto bg-gray-100 p-2 rounded-2xl"
      >
        <Heart className={wishlist ? "fill-green-500 text-green-500" : ""} />
      </div>
    </>
  );
}
