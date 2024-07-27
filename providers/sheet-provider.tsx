"use client"

import { useMountedState } from "react-use"

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-account-sheet"
import { EditCategorySheet } from "@/features/categories/components/edit-account-sheet"

export const SheetProvider = () => {
    const isMounted = useMountedState()

    if (!isMounted) return null

    return (
        <>
            <NewAccountSheet />
            <NewCategorySheet />
            
            <EditAccountSheet />
            <EditCategorySheet />
        </>
    )
}