import { OrderStatus } from '@prisma/client';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from './ui/dropdown-menu';
import { cn, normalizeOrderStatus } from '@/lib/utils';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrderStatus } from '@/app/dashboard/actions';

interface Props {
    id: string;
    orderStatus: OrderStatus;
}

const StatusDropdown = ({ id, orderStatus }: Props) => {
    const queryClient = useQueryClient();
    const { mutate: changeStatus } = useMutation({
        mutationKey: ['change-order-status'],
        mutationFn: changeOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(['all-orders']);
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-52 flex justify-between items-center">
                    {normalizeOrderStatus(orderStatus)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                {Object.keys(OrderStatus).map((status) => (
                    <DropdownMenuItem
                        key={status}
                        className={cn(
                            'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
                            {
                                'bg-zinc-100': orderStatus === status,
                            }
                        )}
                        onClick={() =>
                            changeStatus({
                                id,
                                newStatus: status as OrderStatus,
                            })
                        }>
                        <Check
                            className={cn(
                                'mr-2 h-4 w-4 text-primary',
                                orderStatus === status
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            )}
                        />
                        {normalizeOrderStatus(status as OrderStatus)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default StatusDropdown;
