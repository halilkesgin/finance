"use client"

import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { insertTransactionSchema } from "@/db/schema"
import { useConfirm } from "@/hooks/use-confirm"

import { useOpenTransaction } from "../hooks/use-open-transaction"
import { useGetTransaction } from "../api/use-get-transaction"
import { useEditTransaction } from "../api/use-edit-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"

import { TransactionForm } from "./transaction-form"

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction()

    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    )

    const transactionQuery = useGetTransaction(id)
    const editMutation = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)

    const isPending = editMutation.isPending || deleteMutation.isPending
    const isLoading = transactionQuery.isLoading
    
    const formSchema = insertTransactionSchema.omit({
        id: true
    })
    
    type FormValues = z.input<typeof formSchema>

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const defaultValues = transactionQuery.data? {
        id: transactionQuery.data.id,
    } : {
        id: ""
    }

    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            Edit Transaction
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing transaction
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>    
                    ) : (
                        <div>

                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>

    )
}