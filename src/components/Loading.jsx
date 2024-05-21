import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

const Loading = () => {

    const cards = Array.from({ length: 6 }, (_, i) => i + 1);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 w-full'>
            {
                cards.map((card) => (
                    <Card key={card} className="backdrop-blur-sm flex-col h-fit">
                        <CardHeader className="flex flex-col gap-2 items-center w-full">
                            <div className='w-full'>
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='w-full'>
                                <Skeleton className="h-8 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </div>

    )
}

export default Loading