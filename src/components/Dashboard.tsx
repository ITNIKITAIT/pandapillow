'use client';
import { getOrders } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { formatPrice } from '@/lib/utils';
import { Progress } from './ui/progress';
import {
    TableHead,
    TableHeader,
    TableRow,
    Table,
    TableBody,
    TableCell,
} from './ui/table';
import StatusDropdown from './StatusDropdown';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
    const { data } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => await getOrders(),
    });

    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2500;

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="max-w-6xl px-3 sm:px-4 w-full mx-auto py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Last Week</CardDescription>
                            <CardTitle className="text-4xl">
                                {formatPrice(
                                    data?.lastWeekSum._sum.amount ?? 0
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatPrice(WEEKLY_GOAL)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress
                                value={
                                    ((data?.lastWeekSum._sum.amount ?? 0) *
                                        100) /
                                    WEEKLY_GOAL
                                }
                            />
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Last Mounth</CardDescription>
                            <CardTitle className="text-4xl">
                                {formatPrice(
                                    data?.lastMonthSum._sum.amount ?? 0
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatPrice(MONTHLY_GOAL)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress
                                value={
                                    ((data?.lastMonthSum._sum.amount ?? 0) *
                                        100) /
                                    MONTHLY_GOAL
                                }
                            />
                        </CardFooter>
                    </Card>
                </div>

                <h1 className="text-2xl text-center sm:text-left sm:text-4xl font-bold tracking-tight py-8 sm:py-16">
                    Incoming orders
                </h1>
                {data ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Purchase date
                                </TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.orders.map((order) => (
                                <TableRow key={order.id} className="bg-accent">
                                    <TableCell>
                                        <div className="text-sm text-muted-foreground">
                                            {order.user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <StatusDropdown
                                            id={order.id}
                                            orderStatus={order.status}
                                        />
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatPrice(order.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <>
                        <Skeleton className="h-12 w-full mb-2" />
                        <Skeleton className="h-12 w-full mb-2" />
                        <Skeleton className="h-12 w-full mb-2" />
                        <Skeleton className="h-12 w-full mb-2" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
